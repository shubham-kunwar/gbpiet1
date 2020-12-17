var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
    localStorage.removeItem("secretkey");
    res.redirect("/");
  })
  module.exports = router;