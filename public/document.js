import { emitEditorText, selectDocument } from "./socket-front.js";

const parameters = new URLSearchParams(window.location.search);
const documentName = parameters.get("nome");

const editorText = document.getElementById("editor-texto");
const documentTitle = document.getElementById("titulo-documento");

documentTitle.textContent = documentName || "Documento sem título";

selectDocument(documentTitle.textContent);

editorText.addEventListener("keyup", () => {
  emitEditorText({
    text: editorText.value, 
    documentName
  });
});

const updateEditorText = (text) => {
  editorText.value = text;
};

export { updateEditorText };