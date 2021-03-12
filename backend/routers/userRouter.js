import express from "express";
import User from "../models/userModel.js";
import data from "../data.js";
import generateToken from "../utils.js";

const userRouter = express.Router();

userRouter.get("/seed", async (req, res) => {
  const users = data.users.map((el) => {
    let user = new User({ ...el });
    user.setPassword(el.password);
    return user;
  });
  try {
    // await User.remove({});
    const createdUsers = await User.insertMany(users);
    res.send({ createdUsers });
  } catch (error) {
    res.status(404).send({ message: "Initializing Error" });
  }
});

userRouter.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email });
  console.log(user);
  if (user) {
    const match = user.validPassword(password);
    if (match) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        admin: user.admin,
        token: generateToken(user),
      });
      return;
    }
  }
  res.status(401).send({ message: "Invalid email or password" });
});
export default userRouter;
