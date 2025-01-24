const pool = require('../db');

function generateTicketNumber() {
  const prefix = 'TCKT-'; 
  const randomNumber = Math.floor(10000 + Math.random() * 90000); // Generate a 5-digit number
  return `${prefix}${randomNumber}`;
} 

exports.createTicket = async (decision) => {
  try {
    const ticketNumber = generateTicketNumber(); // Generate a unique Id
    console.log("Generated ticket number:", ticketNumber);

    const result = await pool.query(
      'INSERT INTO tickets (ticket_number, decision) VALUES ($1, $2) RETURNING ticket_number, decision',
      [ticketNumber, decision]
    );
    console.log("Database insert result:", result.rows[0]); // Log the database response
    return result.rows[0];
  } catch (error) {
    console.error("Error creating ticket in the database:", error.message);
    throw new Error("Database error: " + error.message);
  }
};
