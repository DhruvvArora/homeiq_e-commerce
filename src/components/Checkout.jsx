import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import "../styles/checkout.css";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    user_id: 1, 
    name: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: ""
    }, 
    creditCard: "",
    shippingOption: "delivery",
    storeId: "",
    storeAddress: {
      street: "",
      city: "",
      state: "",
      zip: ""
    },
    shippingCost: 6.99,
    discount: 1.99,
  });
  
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const stores = [
    { id: 1, name: "Store 1", street: "123 Main St", city: "City A", state: "CA", zip: "90210" },
    { id: 2, name: "Store 2", street: "456 Maple Ave", city: "City B", state: "TX", zip: "75001" },
    { id: 3, name: "Store 3", street: "789 Oak Blvd", city: "City C", state: "NY", zip: "10001" },
    { id: 4, name: "Store 4", street: "101 Elm St", city: "City D", state: "FL", zip: "33101" },
    { id: 5, name: "Store 5", street: "202 Pine Ave", city: "City E", state: "IL", zip: "60007" },
    { id: 6, name: "Store 6", street: "303 Birch Blvd", city: "City F", state: "NV", zip: "89101" },
    { id: 7, name: "Store 7", street: "404 Cedar St", city: "City G", state: "AZ", zip: "85001" },
    { id: 8, name: "Store 8", street: "505 Palm Ave", city: "City H", state: "WA", zip: "98001" },
    { id: 9, name: "Store 9", street: "606 Redwood Blvd", city: "City I", state: "CO", zip: "80201" },
    { id: 10, name: "Store 10", street: "707 Fir St", city: "City J", state: "NC", zip: "27501" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["street", "city", "state", "zip"].includes(name)) {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [name]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleStoreChange = (e) => {
    const selectedStoreId = e.target.value;
    const selectedStore = stores.find(store => store.id === parseInt(selectedStoreId));

    if (selectedStore) {
      setFormData({
        ...formData,
        storeId: selectedStore.id,
        storeAddress: {
          street: selectedStore.street,
          city: selectedStore.city,
          state: selectedStore.state,
          zip: selectedStore.zip,
        },
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const totalSales = cart.reduce((total, product) => total + product.price * (product.quantity || 1), 0);
    const shippingCost = formData.shippingOption === "delivery" ? 10 : 0;

    const orderData = {
      user_id: formData.user_id,
      name: formData.name,
      address: formData.shippingOption === "delivery" ? formData.address : null,
      creditCard: formData.creditCard,
      orderId: Date.now(), 
      purchaseDate: new Date(),  
      shipDate: formData.shippingOption === "delivery" ? new Date() : null, 
      products: cart.map((product) => ({
        productId: product.id,
        category: product.category,
        quantity: product.quantity || 1,
        price: product.price,
      })),
      shippingCost,
      discount: formData.discount,
      totalSales, 
      storeId: formData.shippingOption === "pickup" ? formData.storeId : null,
      storeAddress: formData.shippingOption === "pickup" ? formData.storeAddress : null,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/orders', orderData);
      setOrderDetails(orderData);
      setOrderPlaced(true);  
      clearCart();  
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  if (orderPlaced && orderDetails) {
    return (
      <div className="order-confirmation">
        <h2>Order Confirmed!</h2>
        <p>Name: {orderDetails.name}</p>
        <p>Credit Card: {orderDetails.creditCard}</p>
        <p><strong>Shipping Option:</strong> {orderDetails.shippingOption === "delivery" ? "Home Delivery" : "In-Store Pickup"}</p>
        
        {orderDetails.shippingOption === "delivery" && orderDetails.address && (
          <p><strong>Shipping Address:</strong> {orderDetails.address.street}, {orderDetails.address.city}, {orderDetails.address.state}, {orderDetails.address.zip}</p>
        )}

        {orderDetails.shippingOption === "pickup" && orderDetails.storeAddress && (
          <>
            <p><strong>Store:</strong> {stores.find(store => store.id === parseInt(orderDetails.storeId))?.name}</p>
            <p><strong>Store Address:</strong> {orderDetails.storeAddress.street}, {orderDetails.storeAddress.city}, {orderDetails.storeAddress.state}, {orderDetails.storeAddress.zip}</p>
          </>
        )}

        <p><strong>Products Ordered:</strong></p>
        <ul>
          {orderDetails.products.map((product, index) => (
            <li key={index}>
              {product.category} (Qty: {product.quantity}) - ${product.price}
            </li>
          ))}
        </ul>
        <p><strong>Total Sales:</strong> ${orderDetails.totalSales}</p>
        <p><strong>Shipping Cost:</strong> ${orderDetails.shippingCost}</p>
        <p><strong>Discount:</strong> ${orderDetails.discount}</p>
      </div>
    );
  }

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <h2>Place Your Order</h2>

      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="creditCard">Credit Card Number:</label>
        <input
          type="text"
          id="creditCard"
          name="creditCard"
          value={formData.creditCard}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Shipping Option:</label>
        <label>
          <input
            type="radio"
            name="shippingOption"
            value="delivery"
            checked={formData.shippingOption === "delivery"}
            onChange={handleChange}
          />
          Home Delivery
        </label>
        <label>
          <input
            type="radio"
            name="shippingOption"
            value="pickup"
            checked={formData.shippingOption === "pickup"}
            onChange={handleChange}
          />
          In-Store Pickup
        </label>
      </div>

      {formData.shippingOption === "delivery" && (
        <>
          <div className="form-group">
            <label htmlFor="street">Street:</label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.address?.street || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.address?.city || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="state">State:</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.address?.state || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="zip">ZIP Code:</label>
            <input
              type="text"
              id="zip"
              name="zip"
              value={formData.address?.zip || ""}
              onChange={handleChange}
              required
            />
          </div>
        </>
      )}

      {formData.shippingOption === "pickup" && (
        <>
          <div className="form-group">
            <label htmlFor="storeId">Select Store:</label>
            <select id="storeId" name="storeId" value={formData.storeId} onChange={handleStoreChange} required>
              <option value="">Select a store</option>
              {stores.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.name} - {store.city}, {store.state}
                </option>
              ))}
            </select>
          </div>

          {formData.storeId && formData.storeAddress && (
            <div>
              <p><strong>Selected Store Address:</strong> {formData.storeAddress.street}, {formData.storeAddress.city}, {formData.storeAddress.state}, {formData.storeAddress.zip}</p>
            </div>
          )}
        </>
      )}

      <button type="submit">Place Order</button>
    </form>
  );
};

export default Checkout;
