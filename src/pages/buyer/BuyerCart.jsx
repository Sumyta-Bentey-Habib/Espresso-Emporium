import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import Swal from "sweetalert2";

const BuyerCart = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [reviews, setReviews] = useState({});

  // Fetch cart items and reviews
  const fetchCart = async () => {
    if (!user?._id) return;

    try {
      const res = await fetch(
        `https://espresso-emporium-server-phi.vercel.app/cart/${encodeURIComponent(user._id)}`
      );
      const data = await res.json();
      setItems(data);

      // Fetch all reviews in parallel
      const reviewsData = await Promise.all(
        data.map(async (item) => {
          const r = await fetch(
            `https://espresso-emporium-server-phi.vercel.app/reviews/${item.coffeeId}`
          );
          const rdata = await r.json();
          return [item.coffeeId, rdata];
        })
      );

      setReviews(Object.fromEntries(reviewsData));
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  // Remove item from cart
  const removeItem = async (id) => {
    try {
      await fetch(`https://espresso-emporium-server-phi.vercel.app/cart/${id}`, {
        method: "DELETE",
      });
      Swal.fire("Removed", "Item removed from cart", "success");
      fetchCart();
    } catch (error) {
      Swal.fire("Error", "Failed to remove item", "error");
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchCart();
    }
  }, [user]);

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
              key={it._id.$oid || it._id}
              className="bg-white shadow-md rounded-2xl overflow-hidden flex flex-col transition hover:shadow-lg"
            >
              <img
                src={it.image || "./more/coffee-splash.jpg"}
                alt={it.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-lg text-gray-900">{it.name}</h3>
                <p className="text-sm text-gray-700 mt-1">
                  Price: <span className="font-medium text-amber-700">${it.price}</span>
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  Seller: <span className="font-medium text-gray-900">{it.sellerName || "Unknown"}</span>
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  Location: <span className="font-medium text-gray-900">{it.sellerLocation || "N/A"}</span>
                </p>

               

                <button
                  onClick={() => removeItem(it._id.$oid || it._id)}
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
