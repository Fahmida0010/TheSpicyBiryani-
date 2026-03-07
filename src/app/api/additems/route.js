import clientPromise from "@/lib/mongodb";

export async function POST(req) {

  try {

    const body = await req.json();

    const {
      title,
      shortDescription,
      fullDescription,
      price,
      priority,
      date,
      image
    } = body;

    const client = await clientPromise;
    const db = client.db("TheSpicyBiryani");

    const result = await db.collection("items").insertOne({
      title,
      shortDescription,
      fullDescription,
      price: Number(price),
      priority,
      date,
      image,
      createdAt: new Date()
    });

    return Response.json({
      success: true,
      insertedId: result.insertedId
    });

  } catch (error) {

    console.log(error);

    return Response.json({
      success: false,
      error: error.message
    });

  }
}