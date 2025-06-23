import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const [sender, setSender] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/messages')
      .then(res => setMessages(res.data));

    socket.on('newMessage', msg => {
      setMessages(prev => [...prev, msg]);
    });

    return () => socket.off('newMessage');
  }, []);

  const sendMessage = async () => {
    if (content.trim() && sender.trim()) {
      await axios.post('http://localhost:5000/messages', { sender, content });
      setContent('');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Chat App</h2>

      {/* Messages Display */}
      <div style={{ maxHeight: 300, overflowY: 'auto', marginBottom: 10 }}>
        {messages.map((msg, i) => (
          <div key={i}>
            <b>{msg.sender}</b>: {msg.content}
          </div>
        ))}
      </div>

      {/* Sender Name Input */}
      <input
        value={sender}
        onChange={e => setSender(e.target.value)}
        placeholder="Your name"
        style={{ width: '30%', marginRight: 10 }}
      />

      {/* Message Input */}
      <input
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Type a message"
        style={{ width: '40%', marginRight: 10 }}
      />

      {/* Send Button */}
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
