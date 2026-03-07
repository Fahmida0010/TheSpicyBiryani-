"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const AddItemForm = () => {

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    price: "",
    priority: "",
    date: "",
    image: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const res = await fetch("/api/additems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (data.success) {

      toast.success("Item added successfully!");

      setFormData({
        title: "",
        shortDescription: "",
        fullDescription: "",
        price: "",
        priority: "",
        date: "",
        image: ""
      });

    } else {

      toast.error("Failed to add item");

    }

  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Item Title"
        className="w-full p-3 border rounded"
        required
      />

      <input
        name="shortDescription"
        value={formData.shortDescription}
        onChange={handleChange}
        placeholder="Short Description"
        className="w-full p-3 border rounded"
        required
      />

      <textarea
        name="fullDescription"
        value={formData.fullDescription}
        onChange={handleChange}
        placeholder="Full Description"
        className="w-full p-3 border rounded"
        rows="4"
        required
      />

      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        className="w-full p-3 border rounded"
        required
      />

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full p-3 border rounded"
      />

      <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        className="w-full p-3 border rounded"
      >
        <option value="">Select Priority</option>
        <option value="popular">Popular</option>
        <option value="new">New</option>
        <option value="sale">Sale</option>
      </select>

      <input
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="Image URL (optional)"
        className="w-full p-3 border rounded"
      />

      <button
        className="bg-yellow-400 px-6 py-3 rounded font-semibold"
      >
        Add Item
      </button>

    </form>
  );

};

export default AddItemForm;