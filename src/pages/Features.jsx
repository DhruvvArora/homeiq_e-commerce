import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Review from "../components/Review";
import Recommendations from "../components/Recommendations";
import "../styles/features.css";

const Features = () => {
  const [activeComponent, setActiveComponent] = useState("review");

  return (
    <div className="App">
      <Navbar />
      <div className="features-container">
        <Sidebar />
        <div className="features-content">
          <div className="feature-buttons-vertical">
            <button
              className={`feature-btn ${activeComponent === "review" ? "active" : ""}`}
              onClick={() => setActiveComponent("review")}
            >
              Product Reviews
            </button>
            <button
              className={`feature-btn ${activeComponent === "recommendation" ? "active" : ""}`}
              onClick={() => setActiveComponent("recommendation")}
            >
              Product Recommendations
            </button>
          </div>
          <div className="feature-content">
            {activeComponent === "review" ? <Review /> : <Recommendations />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
