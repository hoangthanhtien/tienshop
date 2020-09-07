const Product = require("../models/product.model");
const Order = require("../models/order.model");
const User = require("../models/user.model");

exports.getAdminRoute = (req, res) => {
  if (req.session.isAdmin == true) {
    res.render("admin/admin.ejs");
  } else {
    res.render("auth/auth-error.ejs");
  }
};

exports.getAddProduct = (req, res) => {
  res.render("admin/add-product.ejs");
};

exports.postAddProduct = async (req, res) => {
  const product = new Product({
    title: req.body.title,
    price: req.body.price,
    type: req.body.type,
    imgURL: req.body.imgURL,
  });
  await product.save();
  res.redirect("/admin");
};

exports.getUpdateProduct = async (req, res) => {
  const products = await Product.find({});
  res.render("admin/update-product.ejs", { products: products });
};

exports.getUpdateProductId = async (req, res) => {
  const product = await Product.findById({ _id: req.params.id });
  res.render("admin/update-product-form.ejs", { product: product });
};

exports.postUpdateProductId = async (req, res) => {
  const product = await Product.findById(req.params.id);
  product.title = req.body.title;
  product.price = req.body.price;
  product.type = req.body.type;
  product.imgURL = req.body.imgURL;

  await product.save();
  res.redirect("/admin");
};

exports.getDeleteProduct = async (req, res) => {
  const products = await Product.find({});
  res.render("admin/delete-product.ejs", { products: products });
};

exports.deleteProduct = async (req, res) => {
  const product = await Product.findById({ _id: req.params.id });
  await product.remove();
  res.redirect("/admin/delete-product");
};

exports.getOrder = async (req, res) => {
  const orders = await Order.find();
  const products = orders.products;
  res.render("admin/view-orders.ejs", { orders: orders, products: products });
};
