var express = require("express");
var router = express.Router();
const passwordDetailsModel = require("../modules/passwordadd");
const passwordDetailsList = passwordDetailsModel.find({});
//Check userdetails

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}
/* GET home page. */
router.get("/", function (req, res, next) {
  var secretkey=localStorage.getItem("secretkey")
  if (secretkey) {
    res.redirect("/cse")
  }
  else {
    res.render("index", { title: "GBPIET", msg: "" ,});
  }

});
//User Login







module.exports = router;
