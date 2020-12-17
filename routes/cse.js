var express = require("express");
var router = express.Router();
const passwordDetailsModel = require("../modules/passwordadd");
const passwordDetailsList = passwordDetailsModel.find({});


if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require("node-localstorage").LocalStorage;
    localStorage = new LocalStorage("./scratch");
  }


router.post("/", function (req, res, next) {
    var secretKey=req.body.passwordcse
    var mainSecretKey="2020cse"
    if (secretKey==mainSecretKey) {
        var getSecretKey =secretKey       
        localStorage.setItem("secretkey", getSecretKey);
        passwordDetailsList.exec(function(err,data){
          if (err) throw err
          res.render("cse", { title: "GBPIET", msg:"",records:data });
          })        
    } else {
      res.render("index", { title: "GBPIET",msg:"Please Enter Right Key"  });
    }
  });
router.get('/',function(req,res,next){
    var userid=localStorage.getItem('secretkey') 
    if(userid=="2020cse"){
      passwordDetailsList.exec(function(err,data){
        if (err) throw err
        res.render("cse", { title: "GBPIET", msg:"",records:data });
        })        
      
    }
    else{
        res.render("index", { title: "GBPIET",msg:"Kindly Choose your Branch First"  });   
    }
})
router.get("/delete/:id", function (req, res, next) {
  var id=req.params.id;
  var questionDel= passwordDetailsModel.findByIdAndDelete(id)
  questionDel.exec((err, data) => {
    if (err) throw err
    passwordDetailsList.exec((err, data) => {
      if (err) throw err;
      res.render("cse", { title: "GBPIET", msg:"Deleted Successfully",records:data });
    });
  })
});
  


  

  module.exports = router;