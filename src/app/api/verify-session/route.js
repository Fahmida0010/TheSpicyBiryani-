import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {

  const { session_id } = await req.json();

  const session = await stripe.checkout.sessions.retrieve(session_id);

  return NextResponse.json({

    name: session.metadata.name,
    email: session.metadata.email,
    title: session.metadata.title,
    category: session.metadata.category,
    price: session.metadata.price,
    paymentStatus: "paid",
    date: new Date()

  });

}