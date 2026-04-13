import React, { useEffect, useState } from "react";
import { Search, Edit2, Trash2, Box, MapPin, Tag, Plus, X, Image as ImageIcon, User } from "lucide-react";
import Pagination from "../../components/dashboard/Pagination";
import { API_URL } from "../../utils/utils";
import { useAdminProducts } from "../../hooks/useAdminProducts";
import Swal from "sweetalert2";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";

const ManageProducts = () => {
  useEffect(() => {
    document.title = "Manage Products | Espresso Admin";
  }, []);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updateData, setUpdateData] = useState({
    name: "",
    price: "",
    image: "",
    sellerName: "",
    sellerLocation: "",
  });

  const { products, loading, totalItems, fetchProducts } = useAdminProducts(search, currentPage, itemsPerPage);

  const deleteProduct = async (id) => {
    const result = await Swal.fire({
      title: "Remove this Blend?",
      text: "This masterpiece will be vanished from the emporium archives.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#451a03",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Delete It",
      customClass: { popup: 'rounded-[2.5rem]' }
    });

    if (result.isConfirmed) {
      try {
        await fetch(`${API_URL}/products/${id}`, { method: "DELETE" });
        Swal.fire({
            icon: 'success',
            title: 'Blend Removed',
            text: 'Catalog updated successfully.',
            confirmButtonColor: '#451a03'
        });
        fetchProducts();
      } catch (error) {
        Swal.fire("Error", "Removal failed.", "error");
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
      const res = await fetch(`${API_URL}/products/${selectedProduct._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Blend Refined',
          text: 'The characteristics have been updated.',
          confirmButtonColor: '#451a03',
          customClass: { popup: 'rounded-[1.5rem]' }
        });
        setSelectedProduct(null);
        fetchProducts();
      } else {
        Swal.fire("Error", "Update failed.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Search & Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-black text-amber-950 tracking-tighter">Catalog Core</h1>
          <p className="text-amber-700/60 font-black mt-1 uppercase tracking-[0.2em] text-[10px]">Active Master Blends: {totalItems}</p>
        </div>
        
        <div className="relative group max-w-md w-full">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <Search size={18} className="text-amber-900/30 group-focus-within:text-amber-700 transition-colors" />
          </div>
          <input
            type="text"
            className="w-full pl-14 pr-6 py-5 bg-white border border-amber-950/10 rounded-[2rem] shadow-sm focus:border-amber-700/20 focus:ring-8 focus:ring-amber-500/5 transition-all outline-none font-bold text-amber-950 placeholder:text-amber-900/20"
            placeholder="Search catalog by blend name..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Product Registry Table */}
      <Card className="shadow-2xl shadow-amber-900/5 overflow-hidden border border-amber-950/5" padding="p-0">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="min-w-full">
            <thead>
              <tr className="bg-amber-50/30 border-b border-amber-950/5 text-[9px] font-black text-amber-900/30 uppercase tracking-[0.3em]">
                <th className="px-8 py-7 text-left">The Master Blend</th>
                <th className="px-8 py-7 text-left">Market Valuation</th>
                <th className="px-8 py-7 text-left">Source Origin</th>
                <th className="px-8 py-7 text-right">Inventory Logic</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-950/5">
              {loading ? (
                Array.from({ length: itemsPerPage }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-8 py-8"><div className="h-20 w-20 bg-amber-50 rounded-2xl"></div></td>
                    <td className="px-8 py-8"><div className="h-6 w-24 bg-amber-50 rounded-full"></div></td>
                    <td className="px-8 py-8"><div className="h-4 w-48 bg-amber-50 rounded-full"></div></td>
                    <td className="px-8 py-8"><div className="h-10 w-32 bg-amber-50 rounded-xl ml-auto"></div></td>
                  </tr>
                ))
              ) : products.length > 0 ? (
                products.map((p) => (
                  <tr key={p._id} className="hover:bg-amber-50/30 transition-all group font-georama">
                    <td className="px-8 py-8">
                      <div className="flex items-center gap-6">
                        <div className="relative w-20 h-20 shrink-0">
                            <img 
                              src={p.image || "/more/coffee-splash.jpg"} 
                              alt={p.name} 
                              className="w-full h-full rounded-2xl object-cover shadow-xl border border-white group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute -bottom-2 -right-2 bg-amber-950 text-white w-8 h-8 rounded-lg flex items-center justify-center shadow-lg">
                                <Box size={14} />
                            </div>
                        </div>
                        <div>
                          <p className="font-black text-amber-950 text-2xl tracking-tighter leading-tight">{p.name}</p>
                          <p className="text-[10px] text-amber-900/40 font-black tracking-widest mt-2 uppercase">Serial: {p._id.slice(-8).toUpperCase()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-white text-amber-950 font-black text-xl shadow-lg border border-amber-950/5">
                        <Tag size={16} className="text-amber-700" />
                        ${p.price}
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 text-amber-950 font-black text-sm tracking-tight">
                          <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                            <User size={14} className="text-amber-950/20" />
                          </div>
                          {p.sellerName || "Artisan"}
                        </div>
                        <div className="flex items-center gap-3 text-amber-900/40 font-black text-[9px] uppercase tracking-[0.2em] pl-1">
                          <MapPin size={10} />
                          {p.sellerLocation || "Global Origin"}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-8 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openUpdateModal(p)}
                          icon={Edit2}
                          className="!px-5 !py-3 !rounded-xl !bg-amber-950 !text-white hover:!bg-black active:!scale-95 shadow-xl"
                        >
                          Refine
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteProduct(p._id)}
                          icon={Trash2}
                          className="!p-3 !rounded-xl !text-rose-500 hover:!bg-rose-50 border border-rose-100/50"
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-8 py-40 text-center">
                    <div className="relative inline-block">
                        <Box size={80} className="mx-auto text-amber-950/5 mb-6" />
                        <div className="absolute inset-0 bg-amber-500/5 blur-3xl rounded-full -z-10"></div>
                    </div>
                    <p className="text-3xl font-black text-amber-950/20 tracking-tighter uppercase italic">The Vault is Silent</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-amber-50/30 border-t border-amber-950/5 px-10 py-6">
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
      </Card>

      {/* Refinement Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-[110] p-4 animate-in fade-in duration-500"
          onClick={() => setSelectedProduct(null)}
        >
          <Card
            className="w-full max-w-2xl relative text-amber-950 shadow-2xl animate-in zoom-in-95 duration-500 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            padding="p-10 md:p-14"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-bl-full -z-10 opacity-50"></div>
            
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-8 right-8 p-3 hover:bg-amber-950/5 rounded-2xl transition-all text-amber-950/10 hover:text-amber-950"
            >
              <X size={24} />
            </button>

            <h2 className="text-4xl font-black tracking-tight mb-2 text-amber-950">Refine Characteristics</h2>
            <p className="text-amber-900/40 font-black uppercase tracking-[0.3em] text-[10px] mb-12">Updating Catalog Artifact: <span className="text-amber-700">{selectedProduct.name}</span></p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <Input 
                   label="Blend Designation"
                   icon={Box}
                   value={updateData.name}
                   onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
                />
                
                <Input 
                   label="Market Valuation (USD)"
                   icon={Tag}
                   type="number"
                   value={updateData.price}
                   onChange={(e) => setUpdateData({ ...updateData, price: e.target.value })}
                />

                <Input 
                   label="Artifact Visual (URL)"
                   icon={ImageIcon}
                   value={updateData.image}
                   onChange={(e) => setUpdateData({ ...updateData, image: e.target.value })}
                />
              </div>

              <div className="space-y-6">
                <Input 
                   label="Artisan Source"
                   icon={User}
                   value={updateData.sellerName}
                   onChange={(e) => setUpdateData({ ...updateData, sellerName: e.target.value })}
                />

                <Input 
                   label="Roasting Province"
                   icon={MapPin}
                   value={updateData.sellerLocation}
                   onChange={(e) => setUpdateData({ ...updateData, sellerLocation: e.target.value })}
                />

                <div className="pt-8">
                  <Button
                    variant="primary"
                    onClick={submitUpdate}
                    className="w-full py-5 text-sm"
                  >
                    Commit Refinement
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
