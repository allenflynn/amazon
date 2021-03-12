import express from "express";
import data from "./data.js";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";

// mongoose
mongoose.connect(
  "mongodb+srv://root:root@amazon.1f6nk.mongodb.net/Amazon?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "database connection error:"));
db.once("open", function () {
  console.log("database connected!");
});

// express
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
