import React, { useState } from 'react';

function PopupChatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Predefined questions and answers
  const predefinedQA = {
    "hi": "Hello! Welcome to our store. How can I assist you today?",
    "how are you": "I'm just a bot, but I'm here to help you!",
    "what is your return policy": "You can return products within 30 days of purchase. Make sure the items are in their original condition.",
    "how can i track my order": "You can track your order by logging into your account and clicking on 'My Orders' or by using the tracking link sent to your email.",
    "what are your delivery options": "We offer standard and express shipping. You can choose your preferred delivery option at checkout.",
    "do you offer free shipping": "Yes! We offer free shipping on orders over $50.",
    "what payment methods do you accept": "We accept credit/debit cards, PayPal, and Apple Pay.",
    "can i change my order after placing it": "Unfortunately, once an order is placed, we cannot modify it. However, you can cancel the order within the first 2 hours of placing it.",
    "do you have a size guide": "Yes, you can find our size guide on each product page under the 'Size Guide' link.",
    "how can i contact customer support": "You can reach our customer support through live chat, email at support@store.com, or call us at 1-800-123-4567.",
    "where is my order": "You can check your order status by logging into your account and clicking on 'My Orders' or by using the tracking link in your email.",
    "what brands do you carry": "We carry a wide range of brands including Nike, Adidas, Zara, and many more!",
    "do you have a loyalty program": "Yes! Join our loyalty program and earn points on every purchase to redeem for discounts.",
    "can i cancel my order": "You can cancel your order within 2 hours of placing it by visiting your account and going to 'My Orders'.",
    "what are your store hours": "Our online store is open 24/7, and our customer service team is available Monday through Friday from 9 AM to 6 PM.",
    "bye": "Thank you for visiting our store! Have a great day!"

  };

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, sender: 'user' };

    // Simple bot logic to respond based on the predefinedQA object
    const userQuestion = input.toLowerCase().trim();
    const botResponseText = predefinedQA[userQuestion] || "I'm sorry, I don't understand that. Can you please rephrase?";
    const botResponse = { text: botResponseText, sender: 'bot' };

    setMessages((prevMessages) => [
      ...prevMessages,
      userMessage,
      botResponse
    ]);

    setInput(''); // Clear input
  };

  return (
    <div>
      <button style={styles.toggleButton} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Close Chat' : 'Chat with us'}
      </button>
      
      {isOpen && (
        <div style={styles.container}>
          <div style={styles.chatBox}>
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  ...styles.message,
                  alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  backgroundColor: message.sender === 'user' ? '#007bff' : '#6c757d',
                }}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div style={styles.inputContainer}>
            <input
              type="text"
              style={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button style={styles.button} onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '300px',
    height: '400px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '10px',
    backgroundColor: '#f1f1f1',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  chatBox: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '10px',
  },
  message: {
    padding: '10px 15px',
    borderRadius: '20px',
    color: '#fff',
    marginBottom: '10px',
    maxWidth: '70%',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '10px',
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '20px',
    border: '1px solid #ccc',
    marginRight: '10px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '20px',
    border: 'none',
    cursor: 'pointer',
  },
  toggleButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '20px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default PopupChatbot;
