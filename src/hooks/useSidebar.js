import { useMemo } from "react";
import { 
  Users, 
  User,
  Box, 
  LayoutDashboard, 
  ShoppingBag, 
  PlusCircle,
  History
} from "lucide-react";

export const useSidebar = (role) => {
  const menuItems = useMemo(() => {
    const common = [
      { to: "/dashboard/profile", icon: User, label: "Profile" },
    ];

    switch (role) {
      case "admin":
        return [
          { to: "/dashboard", icon: LayoutDashboard, label: "Overview" },
          { to: "/dashboard/users", icon: Users, label: "Manage Users" },
          { to: "/dashboard/products", icon: Box, label: "Manage Products" },
          ...common
        ];
      case "seller":
        return [
          { to: "/dashboard", icon: LayoutDashboard, label: "Sales Review" },
          { to: "/dashboard/my-products", icon: Box, label: "Inventory" },
          { to: "/dashboard/add-product", icon: PlusCircle, label: "Add Item" },
          ...common
        ];
      case "buyer":
        return [
          { to: "/dashboard", icon: History, label: "Activity" },
          { to: "/dashboard/wishlist", icon: ShoppingBag, label: "Wishlist" },
          ...common
        ];
      default:
        return common;
    }
  }, [role]);

  return { menuItems };
};
