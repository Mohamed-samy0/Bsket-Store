import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcrypt-ts-edge";
import { NextResponse } from "next/server";
import { PROTECTED_ROUTES } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { signInSchema } from "@/lib/validators";
import { Role } from "./types/next-auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  pages: { signIn: "/sign-in" },
  providers: [
    Credentials({
      credentials: { email: { type: "email" }, password: { type: "password" } },
      async authorize(credentials) {
        const parsed = signInSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email.toLowerCase() },
        });
        if (!user?.password) return null;

        const valid = await compare(parsed.data.password, user.password);
        if (!valid) return null;

        return { id: user.id, name: user.name, email: user.email, role: user.role };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (token.id) session.user.id = token.id as Role;

      if (token.role === "USER" || token.role === "ADMIN") {
        session.user.role = token.role;
      }

      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const { pathname, search } = nextUrl;
      const isProtected = PROTECTED_ROUTES.some(
        (p) => pathname === p || pathname.startsWith(`${p}/`),
      );

      if (isProtected && !auth) {
        const callbackUrl = encodeURIComponent(pathname + search);
        return NextResponse.redirect(
          new URL(`/sign-in?callbackUrl=${callbackUrl}`, nextUrl),
        );
      }
      return true;
    },
  },
});
