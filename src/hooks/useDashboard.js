import { useState, useMemo } from "react";
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  Coffee, 
  Clock,
  Heart,
  Box,
  Plus,
  Eye,
  Settings
} from "lucide-react";

export const useDashboard = (user, role) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [chartType, setChartType] = useState("area");

  const stats = useMemo(() => {
    const common = [
      { label: "Active Sessions", value: "12", icon: Clock, iconColor: "text-amber-500" },
    ];

    if (role === "admin") {
      return [
        { label: "Gross Revenue", value: "$45,285", icon: TrendingUp, iconColor: "text-emerald-500", trend: "+12.5%" },
        { label: "Total Members", value: "842", icon: Users, iconColor: "text-blue-500", trend: "+3.2%" },
        { label: "Web Marketplace", value: "1,240 Sales", icon: ShoppingBag, iconColor: "text-purple-500", trend: "+8.1%" },
        ...common
      ];
    } else if (role === "seller") {
      return [
        { label: "Net Earnings", value: "$12,840", icon: TrendingUp, iconColor: "text-emerald-500", trend: "+15.2%" },
        { label: "Live Inventory", value: "24 Items", icon: Box, iconColor: "text-amber-700" },
        { label: "Items Shipped", value: "312", icon: ShoppingBag, iconColor: "text-purple-500", trend: "+5.4%" },
        ...common
      ];
    } else {
      return [
        { label: "Wallet Activity", value: "$1,245", icon: ShoppingBag, iconColor: "text-amber-700" },
        { label: "Saved Items", value: "8", icon: Heart, iconColor: "text-rose-500" },
        { label: "Store Visits", value: "15", icon: Coffee, iconColor: "text-amber-900" },
        ...common
      ];
    }
  }, [role]);

  const quickActions = [
    { label: "Add Product", icon: Plus, color: "bg-amber-900", role: "seller", path: "/dashboard/add-coffee" },
    { label: "View Orders", icon: ShoppingBag, color: "bg-amber-800", role: "seller", path: "/dashboard/seller-products" },
    { label: "Edit Profile", icon: Settings, color: "bg-amber-700", role: "any", path: "/dashboard/profile" },
    { label: "Store Feed", icon: Eye, color: "bg-amber-600", role: "any", path: "/coffee-store" },
  ];

  return {
    activeTab,
    setActiveTab,
    chartType,
    setChartType,
    stats,
    quickActions: quickActions.filter(a => a.role === "any" || a.role === role)
  };
};
