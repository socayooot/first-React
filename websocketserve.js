import WebSocket, { WebSocketServer } from "ws";

//wss is just a variable name, its a normal naming convention when
//working with websocket, I am not encrypting anything here.

//cretes a websocket server listening on port 8080
const wss = new WebSocketServer({ port: 8080 });

//this logs to the console that the server is running
console.log("WebSocket server running on ws://localhost:8080");

//set is something like an array but with unique values only
//it helps keep track of the clients
const clients = new Set();

//to my understandingm wss is an event emitter that listens for the whole server
//ws is an event emitter that listens for a single client connection

//when a client connects, this event is fired
wss.on("connection", (ws) => {
  //add the new client to the clients set
  clients.add(ws);
  //simply logs to the console that a client has now connected
  console.log("Client connected. Total clients:", clients.size);

  let canSend = true; // track per-client message cooldown

  //whats going on above ****
  //when a user is connected, they can send a message
  //when they actually go to do that it enters the ws.on block below
  //ws.on sets canSend to false, preventing further messages from being sent
  //after 3 seconds, canSend is set back to true, allowing them to send again


  //when a message is received from this client, this event is fired
  ws.on("message", (message) => {
    // Implement simple rate limiting: 1 message every 3 seconds
    if (!canSend) {
      ws.send(JSON.stringify({ username: "Server", message: "Slow down!" }));
      return; // ignore message until cooldown passes
    }

    //parse the message (which is in JSON format)
    const data = JSON.parse(message);
    data.message = data.message.slice(0, 50); // limit message length

    // Broadcast to all clients
    for (const client of clients) {
      // send the message to each client
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    }

    // Disable sending for 3 seconds
    canSend = false;
    setTimeout(() => {
      canSend = true;
    }, 3000);
  });

  //when a client disconnects, this event is fired
  //when a client closes the tab
  ws.on("close", () => {
    clients.delete(ws);
    console.log("Client disconnected. Total clients:", clients.size);
  });
});