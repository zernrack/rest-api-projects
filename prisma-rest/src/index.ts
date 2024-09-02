import express from "express";

import authorRouter from "./routes/author.router";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use("/authors", authorRouter);

app.get("/ping", (req, res) => {
  res.json({ message: "pong" }).status(200);
});

app.listen(port, () => {
  console.log("Connected to Server!");
});
