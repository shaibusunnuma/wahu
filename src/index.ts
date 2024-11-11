import express from "express";
import bodyParser from "body-parser";


const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.get("/ping", async (req, res) => {
  res.send("pong");
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


