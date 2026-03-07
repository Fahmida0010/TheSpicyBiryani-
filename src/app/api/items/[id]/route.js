import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req) {
  try {
    // params id get from URL
    const { pathname } = new URL(req.url);
    const id = pathname.split("/").pop(); // last part is the id

    const client = await clientPromise;
    const db = client.db("TheSpicyBiryani");

    if (!ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ message: "Invalid ID" }), { status: 400 });
    }

    const item = await db.collection("items").findOne({ _id: new ObjectId(id) });

    if (!item) {
      return new Response(JSON.stringify({ message: "Item not found" }), { status: 404 });
    }

    item._id = item._id.toString();

    return new Response(JSON.stringify(item), { status: 200 });

  } catch (error) {
    console.error("Failed to fetch item:", error);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}