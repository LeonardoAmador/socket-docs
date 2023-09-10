import { alertAndRedirect, updateEditorText } from "./document.js";

const socket = io();

const selectDocument = (name) => {
  socket.emit("select_document", name, (text) => {
    updateEditorText(text);
  });
};

const emitEditorText = (data) => {
  socket.emit("editor_text", data);
};

socket.on("editor_text_clients", (text) => {
  updateEditorText(text);
});

const deleteDocument = (name) => {
  socket.emit("delete_document", name);
};

socket.on("success_delete_document", (name) => {
  alertAndRedirect(name);
});

export { emitEditorText, selectDocument, deleteDocument };
