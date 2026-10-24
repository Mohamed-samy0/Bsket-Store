import { loadEnvConfig } from "@next/env";

async function main() {
  loadEnvConfig(process.cwd());

  let prisma: typeof import("../src/lib/prisma").prisma | undefined;

  try {
    ({ prisma } = await import("../src/lib/prisma"));
    const { syncProducts } = await import("../src/lib/sync/sync-products");
    const count = await syncProducts();
    console.log(`Synced ${count} products`);
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  } finally {
    if (prisma) await prisma.$disconnect();
  }
}

void main();
