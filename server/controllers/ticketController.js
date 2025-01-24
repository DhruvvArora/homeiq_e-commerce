const pool = require('../db');
const { createTicket } = require('../models/ticketModel');
const { getDecision } = require('../services/decideTicket');

exports.openTicket = async (req, res) => {
    console.log("openTicket route hit");
    const { text } = req.body;
    const imagePath = req.file ? req.file.path : null;
  
    try {
      const { summary, decision } = await getDecision(text, imagePath);

      const ticketData = await createTicket(decision); 
      if (!ticketData) throw new Error("Ticket creation failed.");

      console.log("Generated Ticket Data:", ticketData); 
      res.json({
          ticketNumber: ticketData.ticket_number, 
          summary,
          decision
      });
    } catch (error) {
      console.error('Error in openTicket:', error.message);
      res.status(500).json({ error: error.message });
    }
  };

exports.getTicketStatus = async (req, res) => {
    const { ticketNumber } = req.params;
  
    try {
      const result = await pool.query(
        'SELECT decision FROM tickets WHERE ticket_number = $1',
        [ticketNumber]
      );
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
  
      const decision = result.rows[0].decision;
      res.json({ ticket_number: ticketNumber, decision });
    } catch (error) {
      console.error('Error fetching ticket status:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
};
