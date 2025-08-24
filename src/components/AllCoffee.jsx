import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import Swal from "sweetalert2";

const AllCoffee = ({ limit }) => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState({});
  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [ratingInput, setRatingInput] = useState("");
  const [feedbackInput, setFeedbackInput] = useState("");
  const [search, setSearch] = useState("");

  // Fetch products and their reviews
  const fetchProducts = async () => {
    const url = search
      ? `https://espresso-emporium-server-phi.vercel.app/products?search=${encodeURIComponent(
          search
        )}`
      : "https://espresso-emporium-server-phi.vercel.app/products";

    const res = await fetch(url);
    const data = await res.json();
    setProducts(limit ? data.slice(0, limit) : data);

    // Fetch reviews for each product
    data.forEach(async (p) => {
      const r = await fetch(
        `https://espresso-emporium-server-phi.vercel.app/reviews/${p._id}`
      );
      const rdata = await r.json();
      setReviews((prev) => ({ ...prev, [p._id]: rdata }));
    });
  };

  useEffect(() => {
    fetchProducts();
  }, [search, limit]);

  // Add to wishlist
  const handleAddToCart = async (coffee) => {
    if (!user)
      return Swal.fire(
        "Login required",
        "Please login to add to wishlist",
        "info"
      );

    const cartItem = {
      buyerId: user._id,
      coffeeId: coffee._id,
      name: coffee.name,
      price: coffee.price,
      image: coffee.image,
    };

    const res = await fetch(
      "https://espresso-emporium-server-phi.vercel.app/cart",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartItem),
      }
    );

    if (res.ok)
      Swal.fire("Added!", "Coffee added to wishlist", "success");
    else Swal.fire("Error", "Failed to add coffee", "error");
  };

  // Submit review
  const submitReview = async () => {
    if (!ratingInput || !feedbackInput)
      return Swal.fire("Error", "Please enter rating and feedback", "warning");

    const review = {
      coffeeId: selectedCoffee._id,
      buyerId: user._id,
      buyerName: user.name,
      rating: Number(ratingInput),
      feedback: feedbackInput,
    };

    const res = await fetch(
      "https://espresso-emporium-server-phi.vercel.app/reviews",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      }
    );

    if (res.ok) {
      Swal.fire("Thank you!", "Review submitted successfully", "success");
      setRatingInput("");
      setFeedbackInput("");
      setSelectedCoffee(null);

      // refresh reviews for that coffee
      const r = await fetch(
        `https://espresso-emporium-server-phi.vercel.app/reviews/${review.coffeeId}`
      );
      const rdata = await r.json();
      setReviews((prev) => ({ ...prev, [review.coffeeId]: rdata }));
    } else Swal.fire("Error", "Failed to submit review", "error");
  };

  return (
    <div
      className="p-6 min-h-screen space-y-6"
      style={{
        backgroundImage: "url('/more/13.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-3xl font-bold text-[#331A15] text-center drop-shadow-md">
        All Coffee Products
      </h1>

      {/* Products List */}
      <div className="space-y-6 mt-6">
        {products.map((p) => {
          const productReviews = reviews[p._id] || [];
          return (
            <div
              key={p._id}
              className="flex flex-col border rounded-2xl bg-white shadow hover:shadow-lg overflow-hidden transition"
            >
              <div className="flex flex-col md:flex-row">
                <img
                  src={p.image || "./more/coffee-splash.jpg"}
                  alt={p.name}
                  className="w-full md:w-48 h-48 md:h-48 object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
                />

                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h2 className="font-bold text-xl text-gray-900">{p.name}</h2>
                    <div className="text-sm text-gray-900">💲 {p.price}</div>
                    <div className="text-sm text-gray-700">
                      Availability: {p.availability || "N/A"}
                    </div>
                    <div className="text-sm text-gray-700">{p.description || ""}</div>
                  </div>

                  {user && (
                    <div className="flex gap-2 mt-4 flex-col md:flex-row">
                      <button
                        onClick={() => handleAddToCart(p)}
                        className="flex-1 px-4 py-2 rounded-lg bg-amber-700 text-white font-semibold hover:bg-amber-800 transition"
                      >
                        Add to Wishlist
                      </button>
                      <button
                        onClick={() => setSelectedCoffee(p)}
                        className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white font-semibold hover:bg-gray-900 transition"
                      >
                        Add Review
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Reviews Section */}
              <div className="p-4 border-t bg-gray-50">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Reviews ({productReviews.length})
                </h3>
                {productReviews.length > 0 ? (
                  <ul className="space-y-2">
                    {productReviews.map((rev, idx) => (
                      <li
                        key={idx}
                        className="border rounded p-2 bg-white shadow-sm"
                      >
                        <div className="flex justify-between text-sm">
                          <span className="font-bold text-gray-900">
                            {rev.buyerName || "Anonymous"}
                          </span>
                          <span className="text-yellow-600">
                            ⭐ {rev.rating}/5
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm mt-1">{rev.feedback}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No reviews yet. Be the first!</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {!products.length && (
        <p className="text-center text-gray-700 font-medium mt-4">
          No products found.
        </p>
      )}

      {/* Review Modal */}
      {selectedCoffee && (
        <div
          className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
          onClick={() => setSelectedCoffee(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-md relative text-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">
              Review: {selectedCoffee.name}
            </h2>
            <input
              type="number"
              min="1"
              max="5"
              placeholder="Rating 1-5"
              value={ratingInput}
              onChange={(e) => setRatingInput(e.target.value)}
              className="border px-2 py-1 rounded w-20 mb-3 text-gray-900"
            />
            <textarea
              placeholder="Your feedback"
              value={feedbackInput}
              onChange={(e) => setFeedbackInput(e.target.value)}
              className="border rounded p-2 w-full mb-3 text-gray-900"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedCoffee(null)}
                className="px-4 py-2 rounded-lg bg-gray-400 text-white hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                onClick={submitReview}
                className="px-4 py-2 rounded-lg bg-amber-700 text-white hover:bg-amber-800 transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCoffee;
