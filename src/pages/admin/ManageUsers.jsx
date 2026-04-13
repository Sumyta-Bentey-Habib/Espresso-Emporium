import React, { useEffect, useState } from "react";
import { Search, Edit2, Trash2, Mail, Shield, User as UserIcon } from "lucide-react";
import Pagination from "../../components/dashboard/Pagination";
import StartChatButton from "../../components/chat/StartChatButton";
import Swal from "sweetalert2";
import { API_URL } from "../../utils/utils";
import { useUsers } from "../../hooks/useUsers";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

const ManageUsers = () => {
  useEffect(() => {
    document.title = "Manage Users | Espresso Admin";
  }, []);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { users, loading, totalItems, fetchUsers } = useUsers(search, currentPage, itemsPerPage);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'De-authorize User?',
      text: "This artisan will be removed from the emporium registry permanently.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#451a03',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, Delete',
      customClass: { popup: 'rounded-[2.5rem]' }
    });

    if (result.isConfirmed) {
      try {
        await fetch(`${API_URL}/users/${id}`, { method: "DELETE" });
        Swal.fire({
            icon: 'success',
            title: 'Registry Updated',
            text: 'Artisan has been removed.',
            confirmButtonColor: '#451a03'
        });
        fetchUsers();
      } catch (error) {
        Swal.fire('Error', 'Registry update failed.', 'error');
      }
    }
  };

  const handleRoleChange = async (id, currentRole) => {
    const { value: nextRole } = await Swal.fire({
      title: 'Modify Privilege',
      input: 'select',
      inputOptions: {
        'admin': 'Administrator',
        'buyer': 'Standard Artisan',
        'seller': 'Wholesale Merchant'
      },
      inputValue: currentRole?.toLowerCase() || 'buyer',
      inputPlaceholder: 'Select Authority Level',
      showCancelButton: true,
      confirmButtonColor: '#451a03',
      customClass: { popup: 'rounded-[2.5rem]' }
    });

    if (nextRole) {
      try {
        await fetch(`${API_URL}/users/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: nextRole }),
        });
        Swal.fire({
            icon: 'success',
            title: 'Status Modified',
            text: `Authority updated to ${nextRole}.`,
            confirmButtonColor: '#451a03'
        });
        fetchUsers();
      } catch (error) {
        Swal.fire('Error', 'Update failed.', 'error');
      }
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Search & Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-black text-amber-950 tracking-tighter">Registry Management</h1>
          <p className="text-amber-700/60 font-black mt-1 uppercase tracking-[0.2em] text-[10px]">Total Authenticated Artisans: {totalItems}</p>
        </div>
        
        <div className="relative group max-w-md w-full">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <Search size={18} className="text-amber-900/30 group-focus-within:text-amber-700 transition-colors" />
          </div>
          <input
            type="text"
            className="w-full pl-14 pr-6 py-5 bg-white border border-amber-950/10 rounded-[2rem] shadow-sm focus:border-amber-700/20 focus:ring-8 focus:ring-amber-500/5 transition-all outline-none font-bold text-amber-950 placeholder:text-amber-900/20"
            placeholder="Identify artisan by name or email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Main Registry Table */}
      <Card className="shadow-2xl shadow-amber-900/5 overflow-hidden border border-amber-950/5" padding="p-0">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="min-w-full">
            <thead>
              <tr className="bg-amber-50/30 border-b border-amber-950/5">
                <th className="px-8 py-7 text-left text-[9px] font-black text-amber-900/30 uppercase tracking-[0.3em]">Artisan Identity</th>
                <th className="px-8 py-7 text-left text-[9px] font-black text-amber-900/30 uppercase tracking-[0.3em]">Artifact Info</th>
                <th className="px-8 py-7 text-left text-[9px] font-black text-amber-900/30 uppercase tracking-[0.3em]">Authority Rank</th>
                <th className="px-8 py-7 text-right text-[9px] font-black text-amber-900/30 uppercase tracking-[0.3em]">Control Hub</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-950/5">
              {loading ? (
                Array.from({ length: itemsPerPage }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-8 py-8"><div className="h-12 w-12 bg-amber-50 rounded-2xl"></div></td>
                    <td className="px-8 py-8"><div className="h-4 w-48 bg-amber-50 rounded-full"></div></td>
                    <td className="px-8 py-8"><div className="h-7 w-24 bg-amber-50 rounded-full"></div></td>
                    <td className="px-8 py-8"><div className="h-10 w-32 bg-amber-50 rounded-xl ml-auto"></div></td>
                  </tr>
                ))
              ) : users.length > 0 ? (
                users.map((u) => (
                  <tr key={u._id} className="hover:bg-amber-50/30 transition-all group">
                    <td className="px-8 py-8">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-white text-amber-950 flex items-center justify-center font-black text-xl shadow-lg border border-amber-950/5 group-hover:scale-110 transition-transform">
                          {u.photoURL ? (
                            <img src={u.photoURL} alt={u.name} className="w-full h-full object-cover rounded-2xl" />
                          ) : (
                             u.name?.[0].toUpperCase() || "A"
                          )}
                        </div>
                        <div>
                          <p className="font-black text-amber-950 text-xl tracking-tight leading-tight">{u.name}</p>
                          <p className="text-[10px] text-amber-900/40 font-black tracking-widest mt-1.5 uppercase">ID: {u._id.slice(-8).toUpperCase()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <div className="flex items-center gap-3 text-amber-900/60 font-bold tracking-tight text-sm">
                        <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                            <Mail size={14} className="opacity-40" />
                        </div>
                        {u.email}
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <div className={`inline-flex items-center gap-2.5 px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest ${
                        u.role?.toLowerCase() === 'admin' 
                        ? 'bg-purple-50 text-purple-700 border border-purple-100' 
                        : u.role?.toLowerCase() === 'seller'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                        : 'bg-amber-50 text-amber-700 border border-amber-100'
                      }`}>
                        <Shield size={12} />
                        {u.role || "Buyer"}
                      </div>
                    </td>
                    <td className="px-8 py-8 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRoleChange(u._id, u.role)}
                          icon={Edit2}
                          className="!px-4 !py-3 !rounded-xl !bg-amber-950 !text-white hover:!bg-black active:!scale-95 shadow-xl"
                        >
                          Modify
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(u._id)}
                          icon={Trash2}
                          className="!p-3 !rounded-xl !text-rose-500 hover:!bg-rose-50 border border-rose-100/50"
                        />
                        <StartChatButton 
                          targetUser={{ ...u, uid: u.uid || u._id }} 
                          className="!p-3 !rounded-xl !bg-amber-50 !text-amber-800 hover:!bg-amber-950 hover:!text-white shadow-none border border-amber-100"
                          buttonText=""
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-8 py-32 text-center">
                    <div className="relative inline-block">
                        <UserIcon size={80} className="mx-auto text-amber-950/5 mb-6" />
                        <div className="absolute inset-0 bg-amber-500/5 blur-3xl rounded-full -z-10"></div>
                    </div>
                    <p className="text-3xl font-black text-amber-950/20 tracking-tighter uppercase italic">No Artisans Found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Dynamic Pagination Hub */}
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
    </div>
  );
};

export default ManageUsers;
