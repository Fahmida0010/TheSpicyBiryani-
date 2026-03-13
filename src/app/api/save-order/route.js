import clientPromise from "@/lib/mongodb";
import { sendOrderEmail } from "@/lib/sendEmail";
import { NextResponse } from "next/server";

export async function POST(req) {

  const body = await req.json();

  const client = await clientPromise;
  const db = client.db("TheSpicyBiryani");

  await db.collection("orders").insertOne(body);

   // SEND EMAIL
  await sendOrderEmail({
    email: body.email,
    name: body.name,
    item: body.title,
    price: body.price
  });

  return NextResponse.json({ success: true });

}