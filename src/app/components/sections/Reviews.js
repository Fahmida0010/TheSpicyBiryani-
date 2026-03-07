"use client";

import { useEffect, useState } from "react";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    // API থেকে fetch
    fetch("/api/reviews")
      .then(res => res.json())
      .then(data => setReviews(data));
  }, []);

  // auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % reviews.length);
    }, 4000); // প্রতি 4 সেকেন্ডে change
    return () => clearInterval(interval);
  }, [reviews]);

  if (!reviews.length) return null;

  const review = reviews[current];

  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 text-center">

        <h2 className="text-3xl font-bold mb-12">
          Customer <span className="text-yellow-400">Reviews</span>
        </h2>

        <div className="bg-[#1f2937] p-8 rounded-xl shadow-lg transition-all duration-500">

          <div className="flex flex-col items-center gap-4 mb-4">
            <img
              src={review.image}
              alt={review.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <h4 className="font-semibold text-lg">{review.name}</h4>
          </div>

          <p className="text-gray-300 text-sm">{review.comment}</p>
        </div>

      </div>
    </section>
  );
};

export default Reviews;