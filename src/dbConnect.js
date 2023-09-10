import { MongoClient } from "mongodb";

const client = new MongoClient(
  "mongodb+srv://amadorleonardo8109:tiMmA5dn5pS3DqFb@docscluster.xmicn5n.mongodb.net/?retryWrites=true&w=majority"
);

let documentsCollection;

try {
  await client.connect();

  const db = client.db("socket-docs");
  documentsCollection = db.collection("documents");

  console.log("Successfully connected to the database");
} catch (error) {
  console.log(error);
}

export { documentsCollection };
