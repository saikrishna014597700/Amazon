"use strict";
const app = require("./app");

//routes

const account = require("./routes/account");
const product = require("./routes/product");
<<<<<<< HEAD
const orders = require("./routes/orders")

app.use("/api/account", account);
app.use("/api/product", product);
app.use("/api/orders", orders);
=======
const auth= require("./routes/auth");

app.use("/api/account", account);
app.use("/api/product", product);
app.use("/api/auth",auth)
>>>>>>> dev

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
