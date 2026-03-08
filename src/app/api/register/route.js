import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { fullName, email, password } = body;

    if (!fullName || !email || !password) {
      return Response.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("TheSpicyBiryani");

    // check existing user
    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
      return Response.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert user
    await db.collection("users").insertOne({
      fullName,
      email,
      password: hashedPassword,
    });

    return Response.json(
      { message: "User registered successfully" },
      { status: 201 }
    );

  } catch (error) {
    console.error(error);

    return Response.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}