"use strict";
const app = require("./app");

//routes

const account = require("./routes/account");

app.use("/api/account", account);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
