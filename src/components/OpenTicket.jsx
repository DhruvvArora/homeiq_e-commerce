import React, { useState } from 'react';
import axios from 'axios';
import '../styles/customerservice.css';

const OpenTicket = () => {
    const [ticketText, setTicketText] = useState('');
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [response, setResponse] = useState('');

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('text', ticketText);
        if (image) formData.append('image', image);
    
        try {
            const res = await axios.post('http://localhost:5000/api/ticket/submit', formData);
            const { ticketNumber, summary, decision } = res.data; 
            console.log("Response Data:", res.data); 
    
            setResponse(`Ticket Number: ${ticketNumber}\nSummary: ${summary}\nDecision: ${decision}`);
        } catch (err) {
            console.error(err);
            setResponse('Error creating ticket');
        }
    };

    return (
        <div className="open-ticket-container">
            <textarea 
                placeholder="Describe your issue" 
                onChange={(e) => setTicketText(e.target.value)} 
            />
            <input type="file" onChange={handleImageUpload} />
            {previewUrl && <img src={previewUrl} alt="Preview" className="uploaded-image-preview" />}
            
            <button onClick={handleSubmit}>Submit Ticket</button>
            {/* Render the response with new lines for separation */}
            {response && <pre className="response-message">{response}</pre>}
        </div>
    );
};

export default OpenTicket;
