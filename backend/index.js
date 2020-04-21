"use strict";
const app = require("./app");

//routes

const account = require("./routes/account");
const product = require("./routes/product");
const auth= require("./routes/auth");

app.use("/api/account", account);
app.use("/api/product", product);
app.use("/api/auth",auth)

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
