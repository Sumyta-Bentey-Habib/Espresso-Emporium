import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";

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
   

    }
]);

export default router;