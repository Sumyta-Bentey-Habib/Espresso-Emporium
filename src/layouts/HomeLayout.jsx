import React from 'react';
import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import Footer from "../components/NavBar";
const HomeLayout = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
           
        </div>
    );
};

export default HomeLayout;