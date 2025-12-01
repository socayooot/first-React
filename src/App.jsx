import { useState, useEffect, useRef } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Connect to WebSocket
  function connectToServer() {
    if (!username.trim()) {
      alert("Enter username first!");
      return;
    }

    const ws = new WebSocket("ws://localhost:8080"); // CHANGE HERE for part 1
    setSocket(ws);

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
    };

    ws.onclose = () => {
      console.log("Disconnected from server");
    };
  }

  // Send message
  function sendMessage(e) {
    e.preventDefault();
    if (!message.trim()) return;

    const data = {
      username,
      message,
    };

    socket.send(JSON.stringify(data));
    setMessage("");
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>React WebSocket Chat</h1>

      {/* Username Before Connecting */}
      {!socket && (
        <>
          <input
            type="text"
            placeholder="Enter username…"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={connectToServer}>Connect</button>
        </>
      )}

      {/* Chat UI After Connecting */}
      {socket && (
        <>
          <div
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              height: "300px",
              overflowY: "scroll",
              marginTop: "20px",
            }}
          >
            {messages.map((m, idx) => (
              <div key={idx}>
                <strong>{m.username}:</strong> {m.message}
              </div>
            ))}
            <div ref={messagesEndRef}></div>
          </div>

          <form onSubmit={sendMessage} style={{ marginTop: "10px" }}>
            <input
              type="text"
              placeholder="Type a message…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </>
      )}
    </div>
  );
}

export default App;
