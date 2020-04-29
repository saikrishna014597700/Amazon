"use strict";
const app = require("./app");

//routes

const account = require("./routes/account");
const product = require("./routes/product");
const orders = require("./routes/orders");
const auth = require("./routes/auth");
const common = require("./routes/common");
const customerDetails = require("./routes/customerDetails");
const seller = require("./routes/seller");

const cart = require("./routes/cart");

app.use("/api/account", account);
app.use("/api/product", product);
app.use("/api/orders", orders);
app.use("/api/auth", auth);
app.use("/api/common", common);
app.use("/api/customerDetails", customerDetails);
app.use("/api/seller", seller);
app.use("/api/cart",cart);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
