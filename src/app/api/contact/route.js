import clientPromise from "@/lib/mongodb";
import nodemailer from "nodemailer";
// import clientPromise from "@/lib/mongodb";

export async function POST(req) {

  try {

    const { name, email, message } = await req.json();

    const client = await clientPromise;
    const db = client.db("TheSpicyBiryani");

    // Save to MongoDB
    await db.collection("contacts").insertOne({
      name,
      email,
      message,
      date: new Date()
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email to you
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "fahmidaakter0010@gmail.com",
      subject: "New Contact Message",
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
`
    });

    // Auto reply to customer
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thanks for contacting The Spicy Biryani 🍛",
      text: `
Hello ${name},

Thank you for contacting The Spicy Biryani.
We received your message and our team will reply soon.

Best Regards
The Spicy Biryani
`
    });

    return Response.json({ success: true });

  } catch (error) {

    console.log(error);

    return Response.json({
      success: false,
      error: error.message
    });
  }
}