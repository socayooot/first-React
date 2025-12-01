// server.js (ES Module)
import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });
console.log("WebSocket server running on ws://localhost:8080");

const clients = new Set();

wss.on("connection", (ws) => {
  clients.add(ws);
  console.log("Client connected. Total clients:", clients.size);

  ws.on("message", (message) => {
    // parse incoming JSON message
    const data = JSON.parse(message);

    // limit message length to 50
    data.message = data.message.slice(0, 50);

    // broadcast to all clients
    for (const client of clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    }
  });

  ws.on("close", () => {
    clients.delete(ws);
    console.log("Client disconnected. Total clients:", clients.size);
  });
});
