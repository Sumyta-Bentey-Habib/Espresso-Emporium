import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";

const BuyerCart = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);

  const fetchCart = async () => {
    if (!user?.email) return;
    const res = await fetch(
      `http://localhost:3000/cart/${encodeURIComponent(user.email)}`
    );
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchCart();
  }, [user?.email]);

  const removeItem = async (id) => {
    await fetch(`http://localhost:3000/cart/${id}`, { method: "DELETE" });
    fetchCart();
  };

  return (
    <div className="space-y-6 p-4 bg-gray-50 min-h-screen">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900">
        My <span className="text-amber-700">Cart</span>
      </h2>

      {/* Cart Items */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((it) => (
          <div
            key={it._id}
            className="bg-white shadow-md rounded-2xl overflow-hidden flex flex-col transition hover:shadow-lg"
          >
            {/* Image */}
            <img
              src={it.image}
              alt={it.name}
              className="w-full h-40 object-cover"
            />

            {/* Info */}
            <div className="p-4 flex flex-col flex-1">
              <h3 className="font-semibold text-lg text-gray-900">{it.name}</h3>
              <p className="text-sm text-gray-700 mt-1">
                Price:{" "}
                <span className="font-medium text-amber-700">${it.price}</span>
              </p>

              {/* Remove Button */}
              <button
                onClick={() => removeItem(it._id)}
                className="mt-auto px-4 py-2 rounded-lg bg-rose-600 text-white hover:bg-rose-800 transition text-sm font-semibold"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty Cart */}
      {!items.length && (
        <p className="text-center text-gray-500 font-medium">
          Your cart is empty.
        </p>
      )}
    </div>
  );
};

export default BuyerCart;
