"use server";

import { hash } from "bcrypt-ts-edge";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { safeCallbackUrl } from "@/lib/auth-redirect";
import { prisma } from "@/lib/prisma";
import {
  signInSchema,
  signUpSchema,
  type SignInInput,
  type SignUpInput,
} from "@/lib/validators";

export type ActionResult = {
  success: boolean;
  message: string;
  fieldErrors?: Partial<Record<keyof SignUpInput, string>>;
};

const emailTaken: ActionResult = {
  success: false,
  message: "Please fix the highlighted fields.",
  fieldErrors: { email: "An account with this email already exists." },
};

export async function signInAction(
  input: SignInInput,
  callbackUrl?: string,
): Promise<ActionResult> {
  const parsed = signInSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: "Check your email and password and try again." };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email.toLowerCase(),
      password: parsed.data.password,
      redirectTo: safeCallbackUrl(callbackUrl),
    });
    return { success: true, message: "" };
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, message: "Invalid email or password." };
    }
    throw error;
  }
}

export async function signUpAction(
  input: SignUpInput,
  callbackUrl?: string,
): Promise<ActionResult> {
  const parsed = signUpSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: NonNullable<ActionResult["fieldErrors"]> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof SignUpInput;
      fieldErrors[key] ??= issue.message;
    }
    return { success: false, message: "Please fix the highlighted fields.", fieldErrors };
  }

  const { name, password } = parsed.data;
  const email = parsed.data.email.toLowerCase();

  const existing = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });
  if (existing) return emailTaken;

  try {
    await prisma.user.create({
      data: { name, email, password: await hash(password, 10) },
    });
  } catch (error) {
    if ((error as { code?: string }).code === "P2002") return emailTaken;
    return { success: false, message: "Something went wrong. Please try again." };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: safeCallbackUrl(callbackUrl),
    });
    return { success: true, message: "" };
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, message: "Your account was created. Please sign in." };
    }
    throw error;
  }
}
