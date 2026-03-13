import nodemailer from "nodemailer";

export async function sendOrderEmail({ email, name, item, price }) {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({

    from: `"The Spicy Biryani" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Order Confirmation - Payment Received",

    html: `
      <h2>Hello ${name},</h2>

      <p>Thank you for your order. We have successfully received your payment.</p>

      <h3>Order Details</h3>

      <p><b>Item:</b> ${item}</p>
      <p><b>Price:</b> $${price}</p>

      <p>Your order will be processed soon. Delivery usually takes <b>1-2 hours</b>.</p>

      <p>Thank you for choosing <b>The Spicy Biryani</b>.</p>
    `
  });

}