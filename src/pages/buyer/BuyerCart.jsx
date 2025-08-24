import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import Swal from "sweetalert2";

const BuyerCart = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [reviews, setReviews] = useState({});

  const fetchCart = async () => {
    if (!user?._id) return;
    const res = await fetch(`https://espresso-emporium-server-phi.vercel.app/cart/${encodeURIComponent(user._id)}`);
    const data = await res.json();
    setItems(data);

    // Fetch reviews for each cart item
    data.forEach(async (it) => {
      const r = await fetch(`https://espresso-emporium-server-phi.vercel.app/reviews/${it.coffeeId}`);
      const rdata = await r.json();
      setReviews((prev) => ({ ...prev, [it.coffeeId]: rdata }));
    });
  };

  useEffect(() => {
    fetchCart();
  }, [user?._id]);

  const removeItem = async (id) => {
    await fetch(`https://espresso-emporium-server-phi.vercel.app/cart/${id}`, { method: "DELETE" });
    Swal.fire("Removed", "Item removed from cart", "success");
    fetchCart();
  };

  return (
    <div className="space-y-6 p-4 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-900">
        My <span className="text-amber-700">Wishlist</span>
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((it) => {
          const productReviews = reviews[it.coffeeId] || [];
          return (
            <div
              key={it._id}
              className="bg-white shadow-md rounded-2xl overflow-hidden flex flex-col transition hover:shadow-lg"
            >
              <img
                src={it.image}
                alt={it.name}
                className="w-full h-40 object-cover"
              />

              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-lg text-gray-900">{it.name}</h3>
                <p className="text-sm text-gray-700 mt-1">
                  Price: <span className="font-medium text-amber-700">${it.price}</span>
                </p>

                {/* Reviews */}
                <div className="mt-2 border-t pt-2">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Reviews ({productReviews.length})
                  </h4>
                  {productReviews.length > 0 ? (
                    <div className="space-y-1 max-h-40 overflow-y-auto text-sm text-gray-700">
                      {productReviews.map((r) => (
                        <div key={r._id} className="border-b pb-1">
                          <span className="font-bold">{r.buyerName}</span> ⭐ {r.rating} <br />
                          {r.feedback}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No reviews yet.</p>
                  )}
                </div>

                <button
                  onClick={() => removeItem(it._id)}
                  className="mt-auto px-4 py-2 rounded-lg bg-rose-600 text-white hover:bg-rose-800 transition text-sm font-semibold"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {!items.length && (
        <p className="text-center text-gray-500 font-medium">
          Your wishlist is empty.
        </p>
      )}
    </div>
  );
};

export default BuyerCart;
