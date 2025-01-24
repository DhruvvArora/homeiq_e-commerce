import { useState } from "react";
import ProductList from "../components/ProductList";
import "../App.css";

const Product = () => {
  const [category, setCategory] = useState("All");

  const productsData = [
    {
      id: 1,
      name: "Smart Goggles",
      description: "See more, do more.",
      price: 199.99,
      image: "./sgoggles.jpg",
      category: "Gadgets",
    },
    {
      id: 2,
      name: "Smart Watch",
      description: "Timeless technology.",
      price: 149.99,
      image: "./swatch1.webp",
      category: "Gadgets",
    },
    {
      id: 3,
      name: "Smart Thermostat",
      description: "Say goodbye to temperature shock.",
      price: 249.99,
      image: "./thermostat.jpeg",
      category: "Gadgets",
    },
    {
      id: 4,
      name: "Smart Speaker",
      description: "Your personal genie, in a speaker.",
      price: 99.99,
      image: "./sspeaker.jpg",
      category: "Gadgets",
    },
    {
      id: 5,
      name: "Smart Lighting",
      description: "Your light, your rules.",
      price: 129.99,
      image: "./slighting.jpeg",
      category: "Gadgets",
    },
    {
      id: 6,
      name: "Smart Doorlock",
      description: "Your home's ultimate guardian.",
      price: 59.99,
      image: "./sdoorlock.jpg",
      category: "Gadgets",
    },
    {
      id: 7,
      name: "Smart Curtains",
      description: "Automate your natural lighting.",
      price: 199.99,
      image: "./scurtains.jpg",
      category: "Gadgets",
    },
    {
      id: 8,
      name: "Smart Robot Vacuum",
      description: "Clean smarter, not harder.",
      price: 299.99,
      image: "./svacuum.jpg",
      category: "Gadgets",
    },
    {
      id: 9,
      name: "Smart Mirror",
      description: "Your personal digital assistant in the mirror.",
      price: 399.99,
      image: "./smirror.webp",
      category: "Gadgets",
    },
    {
      id: 10,
      name: "Smart Garage Controller",
      description: "Never wonder if you left the garage open.",
      price: 89.99,
      image: "./scontroller.jpeg",
      category: "Gadgets",
    },
    {
      id: 11,
      name: "Smart Pet Feeder",
      description: "Feed your pets on schedule, even when away.",
      price: 129.99,
      image: "./sfeeder.webp",
      category: "Gadgets",
    },
    {
      id: 12,
      name: "Smart Air Purifier",
      description: "Breathe cleaner, live better.",
      price: 249.99,
      image: "./spurifier.jpeg",
      category: "Gadgets",
    },
  ];

  return (
    <div className="App" id="product">
      <header className="header">
        <h1>Latest Products</h1>
      </header>
      <div className="filter-buttons">
        <button onClick={() => setCategory("All")}>All</button>
        <button onClick={() => setCategory("Gadgets")}>Smart Gadgets</button>
        <button onClick={() => setCategory("Accessories")}>Accessories</button>
      </div>

      <ProductList products={productsData} category={category} />
    </div>
  );
};

export default Product;
