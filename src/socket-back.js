import io from "./server.js";

io.on("connection", (socket) => {
  console.log("Client connected - ID:", socket.id);

  socket.on("select_document", (documentName) => {
    socket.join(documentName);
  });

  socket.on("editor_text", ({ text, documentName }) => {
    socket.to(documentName).emit("editor_text_clients", text);
  });
});