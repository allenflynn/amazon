import express from "express";
import Product from "../models/productModel.js";
import data from "../data.js";

const productRouter = express.Router();

productRouter.get("/seed", async (req, res) => {
  const products = await Product.insertMany(data.products);
  res.send(products);
});

productRouter.get("/", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

productRouter.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

export default productRouter;
