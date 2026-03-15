import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setFields } from "../redux/interactionSlice";

function AIAssistant() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = message;

    // Add user message to chat
    setChat((prev) => [...prev, { role: "user", text: userMessage }]);

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8000/interaction/ai-chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userMessage,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();
      console.log("AI Response: ", data);

      // Update form fields from AI Redux update
      if (data.fields) {
        
        dispatch(setFields(data.fields));
      }

      // Add AI reply to chat
      setChat((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.reply || "Interaction logged.",
        },
      ]);
    } catch (error) {
      console.error("AI error:", error);

      setChat((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Error communicating with AI server.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-card">
      <h3 className="ai-title">AI Assistant</h3>

      <div className="chat-box">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`chat-row ${msg.role}`}
          >
            <div className="chat-bubble">
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe interaction..."
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />

        <button onClick={handleSend} disabled={loading}>
          {loading ? "Sending..." : "Log"}
        </button>
      </div>
    </div>
  );
}

export default AIAssistant;
