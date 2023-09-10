import { insertDocumentLink, removeDocumentLink } from "./index.js";

const socket = io();

socket.emit("get_documents", (documents) => {
  documents.forEach((doc) => {
    insertDocumentLink(doc.name);
  });
});

const addDocument = (name) => {
  socket.emit("add_document", name);
};

socket.on("add_document_interface", (name) => {
  insertDocumentLink(name);
});

socket.on("document_exists", (name) => {
  alert(`The document ${name} already exists!`);
});

socket.on("success_delete_document", (name) => {
  removeDocumentLink(name);
});

export { addDocument };
