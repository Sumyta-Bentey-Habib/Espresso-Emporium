import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Sidebar from "../components/dashboard/Sidebar";
import Loader from "../components/Loader";
import ChatFloatingButton from "../components/chat/ChatFloatingButton";
import { usePresence } from "../hooks/usePresence";
import { API_URL } from "../utils/utils";

const DashboardLayout = () => {
  const { user: authUser, loading: authLoading } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  usePresence(authUser?.email);

  useEffect(() => {
    if (!authUser) {
      setLoading(false);
      return;
    }

    const fetchUserRole = async () => {
      try {
        const res = await fetch(`${API_URL}/users/${authUser.email}`);
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

  if (authLoading || loading) return <Loader />;
  if (!authUser) return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-black text-amber-950">Access Denied</h2>
        <p className="text-amber-900/60 font-bold">Please login to view your dashboard</p>
      </div>
    </div>
  );
  
  if (!user) return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-black text-amber-950">Profile Not Found</h2>
        <p className="text-amber-900/60 font-bold">We couldn't retrieve your user details</p>
      </div>
    </div>
  );

  const role = user.role?.toString().trim().toLowerCase();

  return (
    <div className="h-screen bg-amber-50 text-amber-950 flex overflow-hidden w-full">
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
        role={role}
      />
      
      <main 
        className="flex-1 overflow-y-auto h-full custom-scrollbar relative"
      >
        <div className="p-8 md:p-12 relative min-h-full">
          {/* Subtle background texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('/more/1.png')", backgroundSize: "400px" }}></div>
          
          <div className="relative z-10 max-w-7xl mx-auto">
            <Outlet context={{ user }} />
          </div>
          <ChatFloatingButton />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
