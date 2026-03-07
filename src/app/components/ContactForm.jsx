"use client";

import { useState } from "react";

const ContactForm = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (data.success) {
      setMsg("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setMsg("Something went wrong!");
      console.log(data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your Name"
        className="w-full p-3 rounded bg-gray-900 border"
        required
      />

      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Your Email"
        className="w-full p-3 rounded bg-gray-900 border"
        required
      />

      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Your Message"
        className="w-full p-3 rounded bg-gray-900 border"
        rows="4"
        required
      />

      <button className="bg-yellow-400 text-black px-6 py-3 rounded">
        Send Message
      </button>

      {msg && <p className="text-green-400">{msg}</p>}

    </form>
  );
};

export default ContactForm;