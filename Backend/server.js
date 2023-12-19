import express from "express";
import dotenv from "dotenv";

const app = express();
const port = process.env.Prot||4000;

app.get("/", (req, res) => {
  res.json("Hello World!");
});

app.get("/login", (req, res) => {
  res.send("<h1>Login page</h1>");
});
app.get("/api/jokes", (req, res) => {
     const jokes=[{id:1,title:'joke1',description:"valdivel"},{id:2,title:'joke2',description:"santhanam"},{id:3,title:'joke3',description:"gowndamani"}]
    res.send(jokes);
  });
app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
