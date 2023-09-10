import io from "./server.js";

const documents = [
  {
    name: "JavaScript",
    text: "...",
  },
  {
    name: "Node",
    text: "...",
  },
  {
    name: "Socket.io",
    text: "...",
  }
];

io.on("connection", (socket) => {
  console.log("Client connected - ID:", socket.id);

  socket.on("select_document", (documentName, returnText) => {
    const document = findDocument(documentName);

    if (document) returnText(document.text);

    socket.join(documentName);
  });

  socket.on("editor_text", ({ text, documentName }) => {
    const document = findDocument(documentName);

    if (document) {
      document.text = text;
      socket.to(documentName).emit("editor_text_clients", text);
    }
  });
});

const findDocument = (name) => {
  return documents.find(doc => doc.name === name);
}