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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-8 text-center">
          Get in Touch
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white/70 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-amber-100">
          
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-4 rounded-lg bg-white border border-amber-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
            required
          />

          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full p-4 rounded-lg bg-white border border-amber-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
            required
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="w-full p-4 rounded-lg bg-white border border-amber-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
            rows={5}
            required
          />

          <button 
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-4 rounded-lg transition duration-300 shadow-md"
          >
            Send Message
          </button>

          {msg && (
            <p 
              className={`text-center font-medium ${msg.includes("success") ? "text-green-600" : "text-red-600"}`}
            >
              {msg}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;