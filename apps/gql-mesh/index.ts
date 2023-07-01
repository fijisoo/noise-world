import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { createBuiltMeshHTTPHandler } from "./.mesh";

dotenv.config();

const app: Express = express();
const port = 4000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/graphql", createBuiltMeshHTTPHandler());

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

module.exports = app;
