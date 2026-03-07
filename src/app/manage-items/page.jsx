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

  // Swal-based Delete
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

  if (loading) return <p className="p-10 text-center">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <Toaster />
      <h1 className="text-3xl font-bold mb-8">Manage Items</h1>

      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Priority</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{item.title}</td>
                  <td className="py-2 px-4 border-b">${item.price}</td>
                  <td className="py-2 px-4 border-b">{item.priority}</td>
                  <td className="py-2 px-4 border-b">{new Date(item.date).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b space-x-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() => handleView(item._id)}
                    >
                      View
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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