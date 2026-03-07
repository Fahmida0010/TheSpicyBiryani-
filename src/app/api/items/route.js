import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("TheSpicyBiryani");

    const items = await db.collection("items").find({}).toArray();

    // Convert MongoDB _id to string
    const fixedItems = items.map(item => ({
      ...item,
      _id: item._id.toString()
    }))

    return new Response(JSON.stringify(fixedItems), { status: 200 })
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 })
  }
}