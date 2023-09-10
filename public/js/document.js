import {
  deleteDocument,
  emitEditorText,
  selectDocument,
} from "./socket-front-document.js";

const parameters = new URLSearchParams(window.location.search);
const documentName = parameters.get("nome");

const editorText = document.getElementById("editor-texto");
const documentTitle = document.getElementById("titulo-documento");
const deleteButton = document.getElementById("excluir-documento");

documentTitle.textContent = documentName || "Documento sem título";

selectDocument(documentTitle.textContent);

editorText.addEventListener("keyup", () => {
  emitEditorText({
    text: editorText.value,
    documentName,
  });
});

const updateEditorText = (text) => {
  editorText.value = text;
};

deleteButton.addEventListener("click", () => {
  deleteDocument(documentName);
});

const alertAndRedirect = (name) => {
  if (name === documentName) {
    alert(`Document ${name} removed!`);
    window.location.href = "/";
  }
};

export { updateEditorText, alertAndRedirect };
