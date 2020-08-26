const User = require("../models/user.model");
exports.getUser = (req, res) => {
  res.render("user.ejs");
};

exports.postUser = async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
  });
  await user.save();
  res.redirect("/");
};
