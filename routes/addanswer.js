var express = require("express");
var router = express.Router();
const passwordDetailsModel = require("../modules/passwordadd");
const passwordDetailsList = passwordDetailsModel.find({});
//Check userdetails

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

router.get("/",function (req, res, next) {
  var secretKey=localStorage.getItem("secretkey");
  if(secretKey){
      res.render("addnewanswer", { title: "Add New Answer",msg:'' });
  }
  else{
    res.render("index", { title: "GBPIET",msg:"Kindly Choose your Branch First"  });   
  }
  });
  router.post("/",  function (req, res, next) {  
    var secretKey=localStorage.getItem("secretkey");
    var questionNo=req.body.questionno
    var question=req.body.question
    var answer=req.body.answer
    var passwordDetailsSave= new passwordDetailsModel({
        questionNo:questionNo,
        question:question,
        answer:answer
      })
    if(secretKey){
      passwordDetailsSave.save((err,data)=>{
        if(err) throw err
        passwordDetailsList.exec(function(err,data){
          if (err) throw err
          res.render("cse", { title: "GBPIET", msg:"Successfully Saved Answer Details",records:data });
          })        
        })
      }
      else{
        res.render("index", { title: "GBPIET",msg:"Kindly Choose your Branch First"  });   
      }
  });

module.exports = router;