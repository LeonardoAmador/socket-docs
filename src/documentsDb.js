import { documentsCollection } from "./dbConnect.js";

const getDocuments = () => {
  return documentsCollection.find().toArray();
};

const addDocument = (name) => {
  return documentsCollection.insertOne({ name, text: "" });
};

const findDocument = (name) => {
  return documentsCollection.findOne({ name });
};

const updateDocument = (name, text) => {
  return documentsCollection.updateOne({ name }, { $set: { text } });
};

const deleteDocument = (name) => {
  return documentsCollection.deleteOne({ name });
};

export {
  getDocuments,
  addDocument,
  findDocument,
  updateDocument,
  deleteDocument,
};
