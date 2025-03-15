import "server-only";
import prisma from "@/lib/primsa";

export async function getCustomerId(userId: string) {
  if (!userId) {
    return null;
  }
  const user = await prisma.userPurchase.findFirst({
    where: {
      userId,
      customerId: {
        not: null
      }
    }
  });

  return user?.customerId;
}
