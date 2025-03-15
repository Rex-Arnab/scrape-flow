"use server";

import { getAppUrl } from "@/lib/helper/appUrl";
import { getCustomerId } from "@/lib/stripe/getCustomerId";
import { stripe } from "@/lib/stripe/stripe";
import { getCreditsPack, PackId } from "@/types/billing";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

type StipeCheckoutConfig = {
  mode: string;
  customer?: string;
  invoice_creation: {
    enabled: boolean;
  };
  success_url: string;
  cancel_url: string;
  metadata: any;
  line_items: any;
};

export async function PurchaseCredits(packId: PackId) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("unauthenticated");
  }

  const selectPack = getCreditsPack(packId);
  if (!selectPack) {
    throw new Error("invalid pack");
  }
  const priceId = selectPack?.priceId;

  const customerId = await getCustomerId(userId);

  let stripeCheckoutConfig: StipeCheckoutConfig = {
    mode: "payment",
    invoice_creation: {
      enabled: true
    },
    success_url: getAppUrl("billing"),
    cancel_url: getAppUrl("billing"),
    metadata: {
      userId,
      packId
    },
    line_items: [
      {
        quantity: 1,
        price: priceId
      }
    ]
  };

  if (customerId) {
    stripeCheckoutConfig.customer = customerId;
  }
  const session = await stripe.checkout.sessions.create(
    stripeCheckoutConfig as any
  );

  if (!session.url) {
    throw new Error("cannot create stripe session");
  }

  redirect(session.url);
}
