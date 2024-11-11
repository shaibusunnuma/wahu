import express from "express";
import bodyParser from "body-parser";
import authRouter from "./routes/auth.route";
import { getTestToken } from "../firebaseClientTest";
import errorMiddleware from "./middlewares/error.middleware";
import userRouter from "./routes/user.route";
import blogRouter from "./routes/blog.route";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}


const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.get("/token/:uid", async (req, res) => {
  //TODO: Remove this route before deploying
    const token = await getTestToken();
    res.send(token);
  });

app.use("/auth", authRouter);
app.use("/profile", userRouter);
app.use("/posts", blogRouter);
app.use(errorMiddleware);


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


