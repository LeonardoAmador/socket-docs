import express from "express";
import url from "url";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import "./dbConnect.js";

const app = express();
const port = process.env.PORT || 3000;

const currentPath = url.fileURLToPath(import.meta.url);
const publicDirectory = path.join(currentPath, "../..", "public");

app.use(express.static(publicDirectory));

const httpServer = http.createServer(app);

httpServer.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});

const io = new Server(httpServer);

export default io;
