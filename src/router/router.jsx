import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import ContractUs from "../pages/ContactUs";

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
    }

]);

export default router;