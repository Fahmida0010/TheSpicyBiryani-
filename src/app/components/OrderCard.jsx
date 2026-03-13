export default function OrderCard({ order }) {
  return (
    <div className="rounded-lg p-4 shadow-md bg-white w-full hover:shadow-lg transition">
      <h2 className="text-xl font-semibold mb-2 text-green-700">{order.title}</h2>

      <div className="space-y-1">
        <p>
          <span className="font-bold text-purple-600">Category:</span>{" "}
          <span className="text-gray-800">{order.category}</span>
        </p>

        <p>
          <span className="font-bold text-purple-600">Price:</span>{" "}
          <span className="text-gray-800">${order.price}</span>
        </p>

        <p>
          <span className="font-bold text-purple-600">Ordered on:
            </span>{" "}
          <span className="text-yellow-500 text-sm">
            {new Date(order.date).toLocaleString()}
          </span>
        </p>

        <p>
          <span className="font-bold text-purple-600">Status:</span>{" "}
          <span className="text-gray-700">{order.status || "Processing"}</span>
        </p>
      </div>
    </div>
  );
}