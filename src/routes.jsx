import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PersonDetail from "./pages/PersonDetail";
import PlanetDetail from "./pages/PlanetDetail";
import VehicleDetail from "./pages/VehicleDetail";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/person/:uid" element={<PersonDetail />} />
          <Route path="/planet/:uid" element={<PlanetDetail />} />
          <Route path="/vehicle/:uid" element={<VehicleDetail />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default AppRoutes;
