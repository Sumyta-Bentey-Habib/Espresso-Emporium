import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider"; 
import AdminDashboard from "../pages/admin/AdminDashboard";
import BuyerDashboard from "../pages/buyer/BuyerDashboard";
import SellerDashboard from "../pages/seller/SellerDashboard";
import Loader from "../components/Loader";

const DashboardLayout = () => {
  const { user: authUser, loading: authLoading } = useAuth(); 
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authUser) {
      setLoading(false);
      return;
    }

    const fetchUserRole = async () => {
      try {
        // fetch user from backend by email or uid
        const res = await fetch(`https://espresso-emporium-server-phi.vercel.app/users/${authUser.email}`);
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user role:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [authUser]);

  if (authLoading || loading) return 
  <p>
    <Loader></Loader>
  </p>;
  if (!authUser) return <p>Please login</p>;
  if (!user) return <p>User data not found</p>;

  const role = user.role?.toString().trim().toLowerCase();

  switch (role) {
    case "admin":
      return <AdminDashboard />;
    case "buyer":
      return <BuyerDashboard />;
    case "seller":
      return <SellerDashboard />;
    default:
      return <p>Role not recognized</p>;
  }
};

export default DashboardLayout;
