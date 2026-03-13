import clientPromise from "@/lib/mongodb";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {

  try {

    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    // MongoDB connection
    const client = await clientPromise;
    const db = client.db("TheSpicyBiryani");

    // Save message to database
    await db.collection("contacts").insertOne({
      name,
      email,
      message,
      date: new Date()
    });

    // Email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email notification to admin
    await transporter.sendMail({
      from: `"The Spicy Biryani Website" <${process.env.EMAIL_USER}>`,
      to: "fahmidaakter0010@gmail.com",
      subject: "📩 New Contact Message Received",
      html: `
        <h2>New Contact Message</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>

        <h3>Message</h3>
        <p>${message}</p>

        <hr/>
        <p>This message was sent from your website contact form.</p>
      `
    });

    // Auto reply to customer
    await transporter.sendMail({
      from: `"The Spicy Biryani" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "✅ We Received Your Message - The Spicy Biryani",
      html: `
        <h2>Hello ${name},</h2>

        <p>Thank you for contacting <strong>The Spicy Biryani</strong>.  
        We have successfully received your message.</p>

        <h3>Your Submitted Details</h3>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Your Message:</strong></p>
        <p>${message}</p>

        <br/>

        <p>Our team will review your message and get back to you shortly.</p>

        <p>Best Regards,<br/>
        <strong>The Spicy Biryani Team</strong></p>
      `
    });

    return NextResponse.json({ success: true });

  } catch (error) {

    console.error("Contact API Error:", error);

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}