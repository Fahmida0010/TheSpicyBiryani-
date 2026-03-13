import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, error: "Not logged in" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("TheSpicyBiryani");

    // Fetch orders for logged-in user
    const orders = await db
      .collection("orders")
      .find({ email: session.user.email })
      .sort({ date: -1 }) 
      .toArray();

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}