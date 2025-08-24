import React from "react";

const QandA = () => {
  return (
    <div
     style={{
        backgroundImage: "url('/more/13.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",}}>
      <div className="p-6 bg-white rounded-2xl shadow space-y-4 my-6 max-w-5xl mx-auto"
   
    >
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">Questions & Answers</h2>

      <div className="collapse collapse-arrow bg-white border border-gray-300"
      style={{
        backgroundImage: "url('/more/13.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",}}>
        <input type="radio" name="platform-qa" defaultChecked />
        <div className="collapse-title font-semibold text-gray-900">
          How can businesses add their products?
        </div>
        <div className="collapse-content text-gray-700 text-sm">
          Businesses can register on Espresso Emporium and add their coffee products to reach users.
        </div>
      </div>

      <div className="collapse collapse-arrow bg-white border border-gray-300">
        <input type="radio" name="platform-qa" />
        <div className="collapse-title font-semibold text-gray-900">
          Can users save products they like?
        </div>
        <div className="collapse-content text-gray-700 text-sm">
          Yes! Users can browse coffee products from multiple businesses and add their favorites to a wishlist.
        </div>
      </div>

      <div className="collapse collapse-arrow bg-white border border-gray-300">
        <input type="radio" name="platform-qa" />
        <div className="collapse-title font-semibold text-gray-900">
          Is there a fee for listing products?
        </div>
        <div className="collapse-content text-gray-700 text-sm">
          Users can browse for free. Businesses may select a subscription plan to list their products.
        </div>
      </div>
    </div>
    </div>
  );
};

export default QandA;
