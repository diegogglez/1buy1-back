const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json("SERVER OK, LET'S COMPARE, LET'S SAVE MONEY!");
});

module.exports = router;
