import React, { useEffect, useState, useCallback } from "react";
import { Search, Edit2, Trash2, Box, MapPin, Tag, Plus, X, Image as ImageIcon, User, Filter } from "lucide-react";
import Pagination from "../../components/dashboard/Pagination";
import { API_URL } from "../../utils/utils";
import Swal from "sweetalert2";

const ManageProducts = () => {
  useEffect(() => {
    document.title = "Manage Products | Espresso Admin";
  }, []);

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updateData, setUpdateData] = useState({
    name: "",
    price: "",
    image: "",
    sellerName: "",
    sellerLocation: "",
  });

  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      let url = `${API_URL}/products`;
      if (search) {
        url += `?search=${encodeURIComponent(search)}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      setTotalItems(data.length);
      
      const normalized = data.map((p) => ({
        ...p,
        _id: p._id?.$oid || p._id,
        price: p.price?.$numberInt ? Number(p.price.$numberInt) : p.price,
      }));

      
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      setProducts(normalized.slice(start, end));
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [search, currentPage, itemsPerPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const deleteProduct = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This blend will be removed from the store permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#331A15",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await fetch(`${API_URL}/products/${id}`, {
          method: "DELETE",
        });
        Swal.fire("Deleted!", "Product has been removed.", "success");
        fetchProducts();
      } catch (error) {
        console.error("Failed to delete product:", error);
        Swal.fire("Error", "Failed to delete product", "error");
      }
    }
  };

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

  const submitUpdate = async () => {
    try {
      const res = await fetch(
        `${API_URL}/products/${selectedProduct._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateData),
        }
      );

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'The blend details have been refined.',
          confirmButtonColor: '#331A15',
        });
        setSelectedProduct(null);
        fetchProducts();
      } else {
        Swal.fire("Error", "Failed to update product", "error");
      }
    } catch (error) {
      console.error("Failed to update product:", error);
      Swal.fire("Error", "Failed to update product", "error");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-amber-950 tracking-tight">Product Management</h1>
          <p className="text-amber-900/60 font-bold mt-1 uppercase tracking-widest text-xs">Total Catalog: {totalItems}</p>
        </div>
        
        <div className="relative group max-w-md w-full">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={18} className="text-amber-900/30 group-focus-within:text-amber-700 transition-colors" />
          </div>
          <input
            type="text"
            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-amber-900/10 rounded-3xl shadow-sm focus:border-amber-700/20 focus:ring-4 focus:ring-amber-500/5 transition-all outline-none font-medium text-amber-950 placeholder:text-amber-900/20"
            placeholder="Search our catalog..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {}
      <div className="bg-white rounded-[3rem] shadow-xl shadow-amber-900/5 overflow-hidden border border-amber-900/10">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="min-w-full">
            <thead>
              <tr className="bg-amber-100/20 border-b border-amber-900/10 uppercase tracking-[0.2em] text-[10px] font-black text-amber-900/60">
                <th className="px-8 py-6 text-left">The Blend</th>
                <th className="px-8 py-6 text-left whitespace-nowrap">Price / Market</th>
                <th className="px-8 py-6 text-left">Artisan info</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-900/10">
              {loading ? (
                Array.from({ length: itemsPerPage }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-8 py-6"><div className="h-16 w-16 bg-amber-50 rounded-2xl"></div></td>
                    <td className="px-8 py-6"><div className="h-4 w-24 bg-amber-50 rounded-lg"></div></td>
                    <td className="px-8 py-6"><div className="h-4 w-48 bg-amber-50 rounded-lg"></div></td>
                    <td className="px-8 py-6"><div className="h-8 w-32 bg-amber-50 rounded-xl ml-auto"></div></td>
                  </tr>
                ))
              ) : products.length > 0 ? (
                products.map((p) => (
                  <tr key={p._id} className="hover:bg-amber-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-5">
                        <img 
                          src={p.image || "/more/coffee-splash.jpg"} 
                          alt={p.name} 
                          className="w-16 h-16 rounded-2xl object-cover shadow-lg group-hover:scale-110 transition-transform"
                        />
                        <div>
                          <p className="font-extrabold text-amber-950 text-xl leading-tight">{p.name}</p>
                          <p className="text-[10px] text-amber-900/60 font-black tracking-widest mt-1 uppercase">Serial: {p._id.slice(-8).toUpperCase()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-100/10 text-amber-600 font-black text-lg border border-amber-500/10">
                        <Tag size={16} className="text-amber-700" />
                        ${p.price}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-amber-950 font-bold text-sm">
                          <User size={14} className="text-amber-700" />
                          {p.sellerName || "Artisan"}
                        </div>
                        <div className="flex items-center gap-2 text-amber-900/60 font-bold text-[10px] uppercase tracking-wider">
                          <MapPin size={12} />
                          {p.sellerLocation || "Global Origin"}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => openUpdateModal(p)}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-950 text-white text-xs font-black uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-xl shadow-amber-950/20"
                        >
                          <Edit2 size={14} />
                          Refine
                        </button>
                        <button
                          onClick={() => deleteProduct(p._id)}
                          className="p-3 rounded-2xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all active:scale-90"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-8 py-32 text-center">
                    <Box size={64} strokeWidth={1} className="mx-auto text-amber-900/10 mb-6" />
                    <p className="text-2xl font-black text-amber-900/40 uppercase tracking-[0.2em]">The Vault is Empty</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-amber-100/20 border-t border-amber-900/10 px-8 py-4">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalItems / itemsPerPage)}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={(val) => {
              setItemsPerPage(val);
              setCurrentPage(1);
            }}
            totalItems={totalItems}
          />
        </div>
      </div>

      {}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-[110] p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white border border-amber-900/10 rounded-[3rem] p-10 md:p-14 w-full max-w-2xl relative text-amber-950 shadow-2xl animate-in zoom-in-95 duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-50/5 rounded-bl-full -z-10"></div>
            
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-8 right-8 p-3 hover:bg-amber-50 rounded-2xl transition-all text-amber-900/20 hover:text-amber-900"
            >
              <X size={24} />
            </button>

            <h2 className="text-4xl font-black tracking-tight mb-2 text-amber-950">Refine Blend</h2>
            <p className="text-amber-900/60 font-bold uppercase tracking-widest text-[10px] mb-10">Updating: {selectedProduct.name}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="group">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-amber-900/60 mb-2 ml-1">Blend Name</label>
                  <div className="relative">
                    <Box className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-900/20" size={18} />
                    <input
                      type="text"
                      value={updateData.name}
                      onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-amber-50/50 border border-amber-900/10 rounded-2xl focus:ring-4 focus:ring-amber-500/10 outline-none font-bold text-amber-950 transition-all"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-amber-900/60 mb-2 ml-1">Price (USD)</label>
                  <div className="relative">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-900/20" size={18} />
                    <input
                      type="number"
                      value={updateData.price}
                      onChange={(e) => setUpdateData({ ...updateData, price: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-amber-50/50 border border-amber-900/10 rounded-2xl focus:ring-4 focus:ring-amber-500/10 outline-none font-bold text-amber-950 transition-all"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-amber-900/60 mb-2 ml-1">Artisan Image URL</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-900/20" size={18} />
                    <input
                      type="text"
                      value={updateData.image}
                      onChange={(e) => setUpdateData({ ...updateData, image: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-amber-50/50 border border-amber-900/10 rounded-2xl focus:ring-4 focus:ring-amber-500/10 outline-none font-bold text-amber-950 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="group">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-amber-900/60 mb-2 ml-1">Artisan Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-900/20" size={18} />
                    <input
                      type="text"
                      value={updateData.sellerName}
                      onChange={(e) => setUpdateData({ ...updateData, sellerName: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-amber-50/50 border border-amber-900/10 rounded-2xl focus:ring-4 focus:ring-amber-500/10 outline-none font-bold text-amber-950 transition-all"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-amber-900/60 mb-2 ml-1">Roasting Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-900/20" size={18} />
                    <input
                      type="text"
                      value={updateData.sellerLocation}
                      onChange={(e) => setUpdateData({ ...updateData, sellerLocation: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-amber-50/50 border border-amber-900/10 rounded-2xl focus:ring-4 focus:ring-amber-500/10 outline-none font-bold text-amber-950 transition-all"
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={submitUpdate}
                    className="w-full py-5 bg-amber-950 text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-amber-950/40 hover:bg-black transition-all active:scale-95"
                  >
                    Save Refinements
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
