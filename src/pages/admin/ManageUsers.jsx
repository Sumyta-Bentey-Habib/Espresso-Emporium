import React, { useEffect, useState } from "react";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    const url = search
      ? `https://espresso-emporium-server-phi.vercel.app/users?search=${encodeURIComponent(search)}`
      : "https://espresso-emporium-server-phi.vercel.app/users";
    const res = await fetch(url);
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, [search]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this user?")) return;
    await fetch(`https://espresso-emporium-server-phi.vercel.app/users/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  const handleRoleChange = async (id, currentRole) => {
    const nextRole = prompt(
      "Enter new role (Admin/Buyer/Seller):",
      currentRole || ""
    );
    if (!nextRole) return;
    await fetch(`https://espresso-emporium-server-phi.vercel.app/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: nextRole }),
    });
    fetchUsers();
  };

  return (
    <div className="space-y-6 p-4 bg-gray-50 min-h-screen">
      {/* Search Bar */}
      <div className="flex gap-2">
        <input
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-amber-300 text-gray-900"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={fetchUsers}
          className="px-6 py-2 rounded-lg bg-amber-700 text-white hover:bg-amber-900 transition font-semibold"
        >
          Search
        </button>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-2xl">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-[#331A15] text-white">
            <tr>
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Email</th>
              <th className="p-4 font-semibold">Role</th>
              <th className="p-4 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, idx) => (
              <tr
                key={u._id}
                className={`${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-amber-50 transition`}
              >
                <td className="p-4 text-gray-900 font-medium">{u.name}</td>
                <td className="p-4 text-gray-700">{u.email}</td>
                <td className="p-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    {u.role || "—"}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => handleRoleChange(u._id, u.role)}
                    className="px-4 py-1.5 rounded-lg bg-amber-600 text-white hover:bg-amber-800 transition text-sm font-semibold"
                  >
                    Edit Role
                  </button>
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="px-4 py-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-800 transition text-sm font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {!users.length && (
              <tr>
                <td
                  className="p-6 text-center text-gray-500 font-medium"
                  colSpan={4}
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
