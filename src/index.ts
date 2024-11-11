import express from "express";
import bodyParser from "body-parser";
import authRouter from "./routes/auth.route";
import errorMiddleware from "./middlewares/error.middleware";
import userRouter from "./routes/user.route";
import blogRouter from "./routes/blog.route";
import { PORT } from "./config/constants";
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

app.use("/auth", authRouter);
app.use("/profile", userRouter);
app.use("/posts", blogRouter);
app.use(errorMiddleware);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


