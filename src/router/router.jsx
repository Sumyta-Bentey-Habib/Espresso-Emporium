import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import AllCoffee from "../pages/AllCoffee";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../components/ErrorPage";


// Admin Pages
import ManageUsers from "../pages/admin/ManageUsers";
import ManageProducts from "../pages/admin/ManageProducts";

// Buyer Pages
import BuyerViewProducts from "../pages/buyer/BuyerViewProducts";
import BuyerCart from "../pages/buyer/BuyerCart";

// Seller Pages
import SellerProducts from "../pages/seller/SellerProducts";
import SellerAddProduct from "../pages/seller/SellerAddProduct";


const router = createBrowserRouter([
  { path: "/", element: <HomeLayout />, errorElement: <ErrorPage />,
   children: [{ index: true, element: <Home /> }] },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {path:"/about-us",element:<AboutUs></AboutUs>},
  {path:"/contract",element:<ContactUs></ContactUs>},
  {path:"/all-coffee",element:<AllCoffee></AllCoffee>},
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      // Admin
      { path: "users", element: <ManageUsers /> },
      { path: "products", element: <ManageProducts /> },

      // Buyer
      { path: "view-products", element: <BuyerViewProducts /> },
      { path: "cart", element: <BuyerCart /> },

      // Seller
      { path: "seller-products", element: <SellerProducts /> },
      { path: "add-product", element: <SellerAddProduct /> },
    ],
  },
]);

export default router;
