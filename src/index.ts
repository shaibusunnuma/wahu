import express from "express";
import bodyParser from "body-parser";
import authRouter from "./routes/auth.route";
import { getTestToken } from "../firebaseClientTest";
import errorMiddleware from "./middlewares/error.middleware";


const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.get("/token/:uid", async (req, res) => {
 
    const token = await getTestToken();
    res.send(token);
  });

app.use("/auth", authRouter);
app.use(errorMiddleware);


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


