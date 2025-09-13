// src/pages/ScamChatbot.jsx
import React, { useState } from "react";
import "../styles/ScamChatbot.css";

function ScamChatbot() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi 👋, I'm CyberBot — your AI-powered assistant to fight scams! Ask me anything related to cybercrime, fraud, or how to stay safe online.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return; // prevent empty/spam

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are CyberBot, an expert in Indian cyber laws and digital safety. Provide helpful, trustworthy answers to users asking about fraud, scams, and protection — with links to official resources like cybercrime.gov.in, RBI, and MHA. Keep your answers clean, user-friendly, and actionable.",
            },
            ...newMessages.map((m) => ({
              role: m.sender === "user" ? "user" : "assistant",
              content: m.text,
            })),
          ],
        }),
      });

      if (!res.ok) {
        let errorText = "Sorry, something went wrong.";
        if (res.status === 429) errorText = "⚠️ Too many requests! Please wait a bit and try again.";
        throw new Error(errorText);
      }

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "❗ Something went wrong.";
      setMessages([...newMessages, { sender: "bot", text: reply }]);
    } catch (err) {
      console.error("Chatbot Error:", err.message);
      setMessages([
        ...newMessages,
        {
          sender: "bot",
          text: err.message || "Sorry, I couldn't fetch a response. Try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-page">
      <div className="chatbot-intro">
        <h1>🤖 CyberBot – Your Scam Awareness Assistant</h1>
        <p>
          CyberBot helps you detect, understand, and respond to online scams. Whether you're unsure about a suspicious
          link, received a fake job offer, or want to know how to report fraud in India — just ask away. It provides
          detailed guidance, prevention tips, and official resource links.
        </p>
        <p>
          Built with 💡 AI, powered by GPT, trusted by CyberCop. No jargon. Just help.
        </p>
      </div>

      <div className="chat-container">
        <div className="chat-box">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-message ${msg.sender}`}>
              <p>{msg.text}</p>
            </div>
          ))}
          {loading && <p className="loading">CyberBot is typing...</p>}
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your question here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            disabled={loading}
          />
          <button onClick={sendMessage} disabled={loading}>
            {loading ? "..." : "Send 🚀"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScamChatbot;
