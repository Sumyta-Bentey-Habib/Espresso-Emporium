import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import ContractUs from "../pages/ContactUs";
import Login from "../pages/Login";
import Register from "../pages/Register";

const router =createBrowserRouter([
    { 
        path:"/",
        element:<HomeLayout></HomeLayout>,
        children:[
            {
                index:true,
                element:<Home></Home>,
            },
        ]
    },
    {
          path:"/about-us",
          element:<AboutUs></AboutUs>,
    },
    {
        path:"/contract",
        element:<ContractUs></ContractUs>
    },
    {
        path:"/login",
        element:<Login></Login>
    },
    {
        path:"/register",
        element:<Register></Register>,
    },


]);

export default router;