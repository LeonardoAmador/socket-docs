import io from "./server.js";
import {
  addDocument,
  deleteDocument,
  findDocument,
  getDocuments,
  updateDocument,
} from "./documentsDb.js";

io.on("connection", (socket) => {
  socket.on("get_documents", async (returnDocuments) => {
    const documents = await getDocuments();

    returnDocuments(documents);
  });

  socket.on("add_document", async (name) => {
    const existingDocument = (await findDocument(name)) !== null;

    if (existingDocument) {
      socket.emit("document_exists", name);
    } else {
      const result = await addDocument(name);

      if (result.acknowledged) {
        io.emit("add_document_interface", name);
      }
    }
  });

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

  socket.on("delete_document", async (name) => {
    const documentDeleted = await deleteDocument(name);

    if (documentDeleted.deletedCount) {
      io.emit("success_delete_document", name);
    }
  });
});
