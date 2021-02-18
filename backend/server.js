import express from "express";
import data from "./data.js";

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Sever is ready");
});

app.get("/api/products", (req, res) => {
  res.send(data);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
