import React, { useEffect, useState, useCallback } from "react";
import { Search, Edit2, Trash2, UserCheck, ShieldAlert, Mail, Calendar, Shield } from "lucide-react";
import Pagination from "../../components/dashboard/Pagination";
import StartChatButton from "../../components/chat/StartChatButton";
import Swal from "sweetalert2";
import { API_URL } from "../../utils/utils";

const ManageUsers = () => {
  useEffect(() => {
    document.title = "Manage Users | Espresso Admin";
  }, []);

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      // The current backend doesn't seem to support pagination with limit/offset
      // so we fetch all and paginate on frontend for now, or assume many for demo
      const url = search
        ? `${API_URL}/users?search=${encodeURIComponent(search)}`
        : `${API_URL}/users`;
      
      const res = await fetch(url);
      const data = await res.json();
      
      setTotalItems(data.length);
      
      // Calculate start and end for manual pagination since API doesn't support it yet
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      setUsers(data.slice(start, end));
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  }, [search, currentPage, itemsPerPage]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#331A15',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await fetch(`${API_URL}/users/${id}`, { method: "DELETE" });
        Swal.fire('Deleted!', 'User has been removed.', 'success');
        fetchUsers();
      } catch (error) {
        console.error("Failed to delete user:", error);
        Swal.fire('Error', 'Failed to delete user', 'error');
      }
    }
  };

  const handleRoleChange = async (id, currentRole) => {
    const { value: nextRole } = await Swal.fire({
      title: 'Update User Role',
      input: 'select',
      inputOptions: {
        'admin': 'Admin',
        'buyer': 'Buyer',
        'seller': 'Seller'
      },
      inputValue: currentRole?.toLowerCase() || 'buyer',
      inputPlaceholder: 'Select a role',
      showCancelButton: true,
      confirmButtonColor: '#331A15',
    });

    if (nextRole) {
      try {
        await fetch(`${API_URL}/users/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: nextRole }),
        });
        Swal.fire('Updated!', `Role changed to ${nextRole}.`, 'success');
        fetchUsers();
      } catch (error) {
        console.error("Failed to update role:", error);
        Swal.fire('Error', 'Failed to update role', 'error');
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-amber-950 tracking-tight">User Management</h1>
          <p className="text-amber-900/60 font-bold mt-1 uppercase tracking-widest text-xs">Total Registered: {totalItems}</p>
        </div>
        
        <div className="relative group max-w-md w-full">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={18} className="text-amber-900/30 group-focus-within:text-amber-700 transition-colors" />
          </div>
          <input
            type="text"
            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-amber-900/10 rounded-3xl shadow-sm focus:border-amber-700/20 focus:ring-4 focus:ring-amber-500/5 transition-all outline-none font-medium text-amber-950 placeholder:text-amber-900/20"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Main Table Area */}
      <div className="bg-white rounded-[3rem] shadow-xl shadow-amber-900/5 overflow-hidden border border-amber-900/10">
        <div className="overflow-x-auto custom-scrollbar uppercase">
          <table className="min-w-full">
            <thead>
              <tr className="bg-amber-100/20 border-b border-amber-900/10">
                <th className="px-8 py-6 text-left text-[10px] font-black text-amber-900/60 uppercase tracking-[0.2em]">Profile</th>
                <th className="px-8 py-6 text-left text-[10px] font-black text-amber-900/60 uppercase tracking-[0.2em]">Account Info</th>
                <th className="px-8 py-6 text-left text-[10px] font-black text-amber-900/60 uppercase tracking-[0.2em]">Role Status</th>
                <th className="px-8 py-6 text-right text-[10px] font-black text-amber-900/60 uppercase tracking-[0.2em]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-900/10">
              {loading ? (
                Array.from({ length: itemsPerPage }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-8 py-6"><div className="h-12 w-12 bg-amber-50 rounded-2xl"></div></td>
                    <td className="px-8 py-6"><div className="h-4 w-48 bg-amber-50 rounded-lg"></div></td>
                    <td className="px-8 py-6"><div className="h-6 w-24 bg-amber-50 rounded-full"></div></td>
                    <td className="px-8 py-6"><div className="h-8 w-32 bg-amber-50 rounded-xl ml-auto"></div></td>
                  </tr>
                ))
              ) : users.length > 0 ? (
                users.map((u) => (
                  <tr key={u._id} className="hover:bg-amber-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-amber-100/10 text-amber-600 flex items-center justify-center font-black text-xl shadow-inner group-hover:scale-110 transition-transform border border-amber-500/20">
                          {u.name?.[0].toUpperCase() || "U"}
                        </div>
                        <div>
                          <p className="font-black text-amber-950 text-lg leading-tight">{u.name}</p>
                          <p className="text-[10px] text-amber-900/60 font-black tracking-widest mt-1 uppercase">ID: {u._id.slice(-6).toUpperCase()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-amber-900/60 font-bold tracking-tight lowercase">
                        <Mail size={14} />
                        {u.email}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        u.role?.toLowerCase() === 'admin' 
                        ? 'bg-purple-100 text-purple-700' 
                        : u.role?.toLowerCase() === 'seller'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-amber-100 text-amber-700'
                      }`}>
                        <Shield size={12} />
                        {u.role || "Buyer"}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleRoleChange(u._id, u.role)}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-950 text-white text-xs font-bold hover:bg-black transition-all active:scale-95 shadow-lg shadow-amber-950/20"
                        >
                          <Edit2 size={14} />
                          Assign
                        </button>
                        <button
                          onClick={() => handleDelete(u._id)}
                          className="p-2.5 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all active:scale-90"
                        >
                          <Trash2 size={16} />
                        </button>
                        <StartChatButton 
                          targetUser={{ ...u, uid: u.uid || u._id }} 
                          className="!p-2.5 !rounded-xl !bg-amber-100 !text-amber-800 hover:!bg-amber-800 hover:!text-white shadow-none"
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center">
                    <UserIcon size={48} className="mx-auto text-amber-900/10 mb-4" />
                    <p className="text-xl font-bold text-amber-900/40 uppercase tracking-widest">No Citizens Found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer with Pagination */}
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
    </div>
  );
};

export default ManageUsers;
