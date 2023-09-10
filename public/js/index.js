import { addDocument } from "./socket-front-index.js";

const documentList = document.getElementById("lista-documentos");
const form = document.getElementById("form-adiciona-documento");
const documentInput = document.getElementById("input-documento");

form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  addDocument(documentInput.value);
  documentInput.value = "";
});

const insertDocumentLink = (documentName) => {
  documentList.innerHTML += `
    <a 
      href="document.html?nome=${documentName}" 
      class="list-group-item list-group-item-action"
      id="document-${documentName}"    
    >
      ${documentName}
    </a>
  `;
};

const removeDocumentLink = (documentName) => {
  const document = document.getElementById(`document-${documentName}`);

  documentList.removeChild(document);
};

export { insertDocumentLink, removeDocumentLink };
