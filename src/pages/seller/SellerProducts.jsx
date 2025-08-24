import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import Swal from "sweetalert2";
import Loader from "../../components/Loader";

const SellerProducts = () => {
  useEffect(() => {
    document.title = "Seller";
  }, []);
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMine = async () => {
    setLoading(true);
    const res = await fetch(
      "https://espresso-emporium-server-phi.vercel.app/products"
    );
    const data = await res.json();

    // Fetch reviews for each product
    const productsWithReviews = await Promise.all(
      data
        .filter((p) => p.sellerEmail === user?.email)
        .map(async (p) => {
          const revRes = await fetch(
            `https://espresso-emporium-server-phi.vercel.app/reviews/${p._id}`
          );
          const reviews = await revRes.json();
          return { ...p, reviews };
        })
    );

    setProducts(productsWithReviews);
    setLoading(false);
  };

  useEffect(() => {
    fetchMine();
  }, [user?.email]);

  const handleDeleteProduct = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#331A15",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (!confirm.isConfirmed) return;

    await fetch(
      `https://espresso-emporium-server-phi.vercel.app/products/${id}`,
      { method: "DELETE" }
    );
    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Product has been deleted.",
      confirmButtonColor: "#331A15",
    });
    fetchMine();
  };

  const handleDeleteReview = async (reviewId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#331A15",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (!confirm.isConfirmed) return;

    const res = await fetch(
      `https://espresso-emporium-server-phi.vercel.app/reviews/${reviewId}?requesterId=${user._id}`,
      { method: "DELETE" }
    );
    const result = await res.json();

    if (res.ok) {
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: result.message || "Review deleted",
        confirmButtonColor: "#331A15",
      });
      fetchMine();
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: result.message || "Could not delete review",
        confirmButtonColor: "#331A15",
      });
    }
  };

  return (
    <div className="space-y-6 p-4  min-h-screen">
      <h2 className="text-2xl font-bold text-[#331A15]">My Products</h2>

      {loading ? (
        <p className="text-center text-gray-500">
          <Loader></Loader>
        </p>
      ) : products.length ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col transition hover:shadow-lg"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-4 flex flex-col gap-2">
                <h2 className="text-lg font-semibold text-gray-900">
                  {p.name}
                </h2>
                <p className="text-sm text-gray-700">💲 {p.price}</p>
                <p className="text-sm text-gray-600">
                  Availability: {p.availability || "N/A"}
                </p>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleDeleteProduct(p._id)}
                    className="px-4 py-1.5 bg-rose-600 text-white rounded-lg text-sm font-semibold hover:bg-rose-700 transition"
                  >
                    Delete Product
                  </button>
                </div>

                {/* Reviews */}
                <div className="mt-4">
                  <h3 className="font-semibold text-sm text-gray-800 mb-2">
                    Reviews:
                  </h3>
                  <div className="max-h-64 overflow-y-auto space-y-2">
                    {p.reviews && p.reviews.length ? (
                      p.reviews.map((r) => (
                        <div
                          key={r._id}
                          className="bg-gray-50 rounded-lg p-3 shadow-sm flex justify-between items-start gap-2"
                        >
                          <div className="flex flex-col gap-1">
                            <div className="font-medium text-gray-900 text-sm">
                              {r.buyerName || r.buyerEmail}
                            </div>
                            <div className="text-gray-700 text-sm">
                              {r.feedback}
                            </div>
                            <div className="text-[10px] text-gray-500">
                              {new Date(r.createdAt).toLocaleString()}
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteReview(r._id)}
                            className="px-2 py-0.5 text-xs rounded bg-rose-600 hover:bg-rose-700 text-white"
                          >
                            Delete
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-xs">No reviews yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products yet.</p>
      )}
    </div>
  );
};

export default SellerProducts;
