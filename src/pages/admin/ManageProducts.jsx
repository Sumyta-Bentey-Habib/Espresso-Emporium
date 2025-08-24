import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updateData, setUpdateData] = useState({
    name: "",
    price: "",
    image: "",
    sellerName: "",
    sellerLocation: "",
  });

  useEffect(() => {
    document.title = "Manage Products";
  }, []);

  // Fetch products
  const fetchProducts = async () => {
    try {
      let url = `https://espresso-emporium-server-phi.vercel.app/products`;
      if (search) {
        url += `?search=${encodeURIComponent(search)}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      // Normalize data if needed (handle MongoDB objectId and price formats)
      const normalized = data.map((p) => ({
        ...p,
        _id: p._id?.$oid || p._id,
        price: p.price?.$numberInt ? Number(p.price.$numberInt) : p.price,
      }));

      setProducts(normalized);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search]);

  // Delete product
  const deleteProduct = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the product permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await fetch(`https://espresso-emporium-server-phi.vercel.app/products/${id}`, {
          method: "DELETE",
        });
        Swal.fire("Deleted!", "Product has been deleted.", "success");
        fetchProducts();
      } catch (error) {
        Swal.fire("Error", "Failed to delete product", "error");
      }
    }
  };

  // Open update modal
  const openUpdateModal = (product) => {
    setSelectedProduct(product);
    setUpdateData({
      name: product.name,
      price: product.price,
      image: product.image,
      sellerName: product.sellerName,
      sellerLocation: product.sellerLocation,
    });
  };

  // Handle update input change
  const handleChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  // Submit update
  const submitUpdate = async () => {
    try {
      const res = await fetch(
        `https://espresso-emporium-server-phi.vercel.app/products/${selectedProduct._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateData),
        }
      );

      if (res.ok) {
        Swal.fire("Updated!", "Product has been updated.", "success");
        setSelectedProduct(null);
        fetchProducts();
      } else {
        Swal.fire("Error", "Failed to update product", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update product", "error");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Products</h1>

      {/* Search bar */}
      <div className="flex mb-6">
        <input
          type="text"
          placeholder="Search by product name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-amber-700"
        />
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white p-4 shadow rounded flex flex-col">
            <img
              src={product.image || "/default-coffee.jpg"}
              alt={product.name}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-600">
              Seller: {product.sellerName || "Unknown"} ({product.sellerLocation || "No location"})
            </p>
            <p className="text-gray-800 mt-1">Price: ${product.price}</p>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => openUpdateModal(product)}
                className="flex-1 px-4 py-2 rounded-lg bg-amber-700 text-white hover:bg-amber-800 transition"
              >
                Update
              </button>
              <button
                onClick={() => deleteProduct(product._id)}
                className="flex-1 px-4 py-2 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <p className="col-span-full text-center text-gray-500">No products found.</p>
        )}
      </div>

      {/* Update Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-md relative text-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Update Product: {selectedProduct.name}</h2>

            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={updateData.name}
              onChange={handleChange}
              className="border px-2 py-1 rounded w-full mb-3"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={updateData.price}
              onChange={handleChange}
              className="border px-2 py-1 rounded w-full mb-3"
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={updateData.image}
              onChange={handleChange}
              className="border px-2 py-1 rounded w-full mb-3"
            />
            <input
              type="text"
              name="sellerName"
              placeholder="Seller Name"
              value={updateData.sellerName}
              onChange={handleChange}
              className="border px-2 py-1 rounded w-full mb-3"
            />
            <input
              type="text"
              name="sellerLocation"
              placeholder="Seller Location"
              value={updateData.sellerLocation}
              onChange={handleChange}
              className="border px-2 py-1 rounded w-full mb-3"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-2 rounded-lg bg-gray-400 text-white hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                onClick={submitUpdate}
                className="px-4 py-2 rounded-lg bg-amber-700 text-white hover:bg-amber-800 transition"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
