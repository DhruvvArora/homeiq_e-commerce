import React, { useState } from 'react';
import axios from 'axios';

function StatusOfTicket() {
  const [ticketNumber, setTicketNumber] = useState('');
  const [status, setStatus] = useState('');
  const [decision, setDecision] = useState('');
  const [loading, setLoading] = useState(false);

  const handleStatusCheck = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/ticket/status/${ticketNumber}`);
      setStatus(`Ticket ID: ${ticketNumber}`);
      setDecision(`Decision: ${response.data.decision}`);
    } catch (err) {
      console.error(err);
      setStatus('Ticket not found');
      setDecision('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="status-ticket-container">
      <input 
        type="text" 
        placeholder="Enter Ticket ID" 
        value={ticketNumber} 
        onChange={(e) => setTicketNumber(e.target.value)} 
      />
      <button onClick={handleStatusCheck} disabled={!ticketNumber || loading}>
        {loading ? 'Checking...' : 'Check Status'}
      </button>
      <div className="ticket-status">
        {status && <p>{status}</p>}
        {decision && <p>{decision}</p>}
        {!status && !decision && <p>Enter a ticket ID to check status.</p>}
      </div>
    </div>
  );
}

export default StatusOfTicket;
