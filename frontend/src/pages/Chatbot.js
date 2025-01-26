import React, { useState } from 'react';
import './Chatbot.css'; // Import the CSS file for styling

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = async () => {
        if (input.trim()) {
            setMessages([...messages, { text: input, sender: 'user' }]);
            setInput('');

            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}/chat`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.REACT_APP_GEMINI_API_KEY}` // Add the API key here
                    },
                    body: JSON.stringify({ message: input }),
                });
                const data = await response.json();
                setMessages([...messages, { text: input, sender: 'user' }, { text: data.response, sender: 'bot' }]);
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div className="chatbot-container">
            <div className="chatbot-messages">
                {messages.map((message, index) => (
                    <div key={index} className={message.sender === 'user' ? 'user-message' : 'bot-message'}>
                        {message.text}
                    </div>
                ))}
            </div>
            <div className="chatbot-input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="chatbot-input"
                />
                <button onClick={handleSend} className="chatbot-send-button">Send</button>
            </div>
        </div>
    );
};

export default Chatbot;