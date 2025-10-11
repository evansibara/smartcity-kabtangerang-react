import React from "react";
import { Outlet } from "react-router-dom";
import Header from './components/Header'; // Impor Header

const Layout = () => {
  return (
    <div className="layout-wrapper">
      
      {/* Menggunakan komponen Header yang sudah dilengkapi logic scroll */}
      <Header /> 

      <main className="main-content">
        <Outlet /> {/* Tempat untuk render child route */}
      </main>
      
    </div>
  );
};

export default Layout;