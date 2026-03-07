import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";



export async function GET() {
  const client = await clientPromise;
  const db = client.db("TheSpicyBiryani");

  const reviews = await db.collection("reviews").find({}).toArray();

  return NextResponse.json(reviews);
}