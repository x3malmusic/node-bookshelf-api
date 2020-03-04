const express = require("express");
require("dotenv").config();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json({ extended: true }));
app.use("", require("./routes"));

app.listen(port, () => {
  console.log(`app running on ${port}`);
});
