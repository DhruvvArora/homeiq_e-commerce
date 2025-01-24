import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import OpenTicket from '../components/OpenTicket';
import TicketStatus from '../components/StatusOfTicket';
import '../styles/customerservice.css'

const CustomerService = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="customer-service-container">
        <h2 className="customer-service-heading">Customer Service</h2>
        <div className="ticket-button-group">
          <button onClick={() => setSelectedOption('openTicket')}>Open a Ticket</button>
          <button onClick={() => setSelectedOption('ticketStatus')}>Status of a Ticket</button>
        </div>
      {selectedOption === 'openTicket' && <OpenTicket />}
      {selectedOption === 'ticketStatus' && <TicketStatus />}
      </div>
    </>
  );
}


export default CustomerService;