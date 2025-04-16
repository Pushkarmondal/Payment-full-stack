const express = require('express')
const userRouter = require('./users.js')
const accountRouter = require("./accounts.js");
const router = express.Router();

router.use("/users", userRouter);
router.use("/accounts", accountRouter);

module.exports = router