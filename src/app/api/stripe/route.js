import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {

  const body = await req.json();

  const session = await stripe.checkout.sessions.create({

    payment_method_types: ["card"],
    mode: "payment",

    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: body.title
          },
   unit_amount: Math.round(body.price * 100)
        },
        quantity: 1
      }
    ],

    metadata: {
      name: body.name,
      email: body.email,
      title: body.title,
      category: body.category,
      price: body.price
    },

    success_url: `${req.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.get("origin")}`
  });

  return NextResponse.json({ url: session.url });

}