import Stripe from "stripe";
import { handler } from "./util/handler";
import { calculateCost } from "./util/cost";

export const main = handler(async (event) => {
  const { storage, source } = JSON.parse(event.body);

  const amount = calculateCost(storage);
  const description = "Scratch charge";

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  await stripe.charges.create({
    source,
    amount,
    description,
    currency: "usd",
    shipping: {
      name: "Jenny Rosen",
      address: {
        line1: "510 Townsend St",
        postal_code: "98140",
        city: "San Francisco",
        state: "CA",
        country: "US",
      },
    },
  });

  return { status: true };
});
