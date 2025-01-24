import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./App.css";
import Home from "./pages/Home";
import CheckoutPage from "./pages/CheckoutPage";
import ReviewsPage from "./pages/ReviewsPage";
import Trending from "./pages/TrendingPage";
import InventoryPage from './pages/InventoryPage';
import SalesPage from './pages/SalesPage';
import Login from "./components/Login";
import Register from "./components/Register";
import Products from "./components/ProductList"; 
import CustomerService from "./pages/CustomerService";
import Features from "./pages/Features";
import Sidebar from "./components/Sidebar";


// Wrapper component to handle sidebar visibility
function AppContent() {
  const location = useLocation();
  const hideSidebarPaths = ['/login', '/register'];
  const shouldShowSidebar = !hideSidebarPaths.includes(location.pathname);

  return (
    <div className="App" style={{ display: "flex", minHeight: "100vh" }}>
      {shouldShowSidebar && <Sidebar />}
      <div style={{ 
        marginLeft: shouldShowSidebar ? "150px" : "0", 
        flexGrow: 1, 
        padding: "20px" 
      }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<CheckoutPage />} />
          <Route path="/review" element={<ReviewsPage />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/inventoryPage" element={<InventoryPage />} />
          <Route path="/salesPage" element={<SalesPage />} />
          <Route path="/customerService" element={<CustomerService />} />
          <Route path="/features" element={<Features />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
