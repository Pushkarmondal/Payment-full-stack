const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
const PORT = 3006
const mainrouter = require("./routes/app.js");

app.use(bodyparser.json());
app.use(cors());

app.use("/api/v1", mainrouter); 

app.listen(PORT, () => {
  console.log(`App is running on Port ${PORT}`);
});
