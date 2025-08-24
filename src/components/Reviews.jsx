import React from "react";

const Reviews = () => {
  const reviews = [
    {
      title: "Café Aroma",
      feedback: "Listing our products here gave us so much visibility! We reached more coffee lovers than ever.",
    },
    {
      title: "David M.",
      feedback: "I love being able to browse different roasters and save my favorites to my wishlist.",
    },
    {
      title: "Latte House",
      feedback: "The platform is simple and effective. Managing our products has never been easier.",
    },
  ];

  return (
    <div
    style={{
        backgroundImage: "url('/more/13.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",}}>
      <div className="p-6 bg-white rounded-2xl shadow space-y-6 my-6 max-w-5xl mx-auto"
     style={{
        backgroundImage: "url('/more/13.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",}}>
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">Customer & Business Reviews</h2>

      <div className="flex flex-wrap gap-4 justify-center">
        {reviews.map((r, index) => (
          <div key={index} className="card bg-white w-80 shadow-sm border border-gray-200">
            <div className="card-body">
              <h2 className="card-title text-gray-900">{r.title}</h2>
              <p className="text-gray-700">{r.feedback}</p>
            
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Reviews;
