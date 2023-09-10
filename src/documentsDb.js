import { documentsCollection } from "./dbConnect.js";

const findDocument = (name) => {
  return documentsCollection.findOne({ name });
}

const updateDocument = (name, text) => {
  return documentsCollection.updateOne({ name }, { $set: { text } });
};

export { findDocument, updateDocument }