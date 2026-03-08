"use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

export default function ManageItemsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalItem, setModalItem] = useState(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/items");
      const data = await res.json();

      const fixedData = data.map(item => ({
        ...item,
        _id: item._id?.$oid || item._id,
        shortDescription: item.short_description || "",
        fullDescription: item.full_description || "",
      }));

      setItems(fixedData || []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch items");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/items/${id}`, { method: "DELETE" });
        const data = await res.json();

        if (data.success) {
          toast.success("Item deleted successfully");
          fetchItems();
        } else {
          toast.error(data.message || "Failed to delete item");
        }
      } catch (err) {
        console.log(err);
        toast.error("Failed to delete item");
      }
    }
  };

  const handleView = async (id) => {
    try {
      const res = await fetch(`/api/items/${id}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch");

      setModalItem({
        ...data,
        shortDescription: data.short_description || "",
        fullDescription: data.full_description || "",
      });
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch item details");
    }
  };

  const closeModal = () => setModalItem(null);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <Toaster />
      <h1 className="text-3xl font-bold mb-8 text-center">Manage Items</h1>

      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 border border-gray-200 rounded p-4">
              <div className="h-10 bg-gray-300 rounded w-full sm:w-1/4"></div>
              <div className="h-10 bg-gray-300 rounded w-full sm:w-1/6"></div>
              <div className="h-10 bg-gray-300 rounded w-full sm:w-1/6"></div>
              <div className="h-10 bg-gray-300 rounded w-full sm:w-1/6"></div>
              <div className="h-10 bg-gray-300 rounded w-full sm:w-1/6"></div>
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <p className="text-gray-500 text-center">No items found.</p>
      ) : (
        <div className="grid gap-6">
          {items.map(item => (
            <div key={item._id} className="bg-white border border-gray-200 rounded-lg shadow p-4 flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
              
              <div className="flex-1">
                <h2 className="text-lg font-bold">{item.title}</h2>
                <p className="text-gray-600 mt-1">{item.shortDescription}</p>
                <p className="text-gray-500 text-sm mt-1">Date: {new Date(item.date).toLocaleDateString()}</p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-2 sm:mt-0">
                <span className="font-semibold text-green-700">${item.price}</span>
                <span className="text-gray-600">{item.priority}</span>
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                  onClick={() => handleView(item._id)}
                >
                  View
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded max-w-lg w-full relative overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
              onClick={closeModal}
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-2">{modalItem.title}</h2>
            <p className="mb-2"><strong>Price:</strong> ${modalItem.price}</p>
            <p className="mb-2"><strong>Priority:</strong> {modalItem.priority}</p>
            <p className="mb-2"><strong>Date:</strong> {new Date(modalItem.date).toLocaleDateString()}</p>
            <p className="mb-2"><strong>Short Description:</strong> {modalItem.shortDescription}</p>
            <p className="mb-2"><strong>Full Description:</strong> {modalItem.fullDescription}</p>
            {modalItem.image && (
              <img src={modalItem.image} alt={modalItem.title} className="mt-4 rounded w-full object-cover" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}