import io from "./server.js";
import { findDocument, updateDocument } from "./documentsDb.js";

io.on("connection", (socket) => {
  console.log("Client connected - ID:", socket.id);

  socket.on("select_document", async (documentName, returnText) => {
    const document = await findDocument(documentName);

    console.log(document);

    if (document) returnText(document.text);

    socket.join(documentName);
  });

  socket.on("editor_text", async ({ text, documentName }) => {
    const documentUpdated = await updateDocument(documentName, text);

    if (documentUpdated.modifiedCount) {
      socket.to(documentName).emit("editor_text_clients");
    }
  });
});