var express = require("express");
var router = express.Router();
var userModule = require("../modules/user");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const passwordCategoryModel = require("../modules/passwordcategory");
const passwordCategoryList = passwordCategoryModel.find({});
const passwordDetailsModel = require("../modules/passwordadd");
const passwordDetailsList = passwordDetailsModel.find({});
//Check userdetails
var { checkemail, checkid } = require("../modules/newusercheck");

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

//check login id
function checklogin(req, res, next) {
  var usertoken = localStorage.getItem("usertoken");
  try {
    var decoded = jwt.verify(usertoken, "logintoken");
  } catch (err) {
    res.redirect("/");
  }
  next();
}

router.get("/allcategory/", checklogin, function (req, res, next) {
    var loginid = localStorage.getItem("loginid");
    passwordCategoryList.exec((err, data) => {
      if (err) throw err;
      res.render("allcategory", {
        title: "Tiffin Category List",
        userid: loginid,
        records: data,
        msg: ""
      });
    });
  });
  
  router.get("/edit/:id", checklogin, function (req, res, next) {
    var loginid=localStorage.getItem("loginid");
    var categoryid=req.params.id;
    var categoryEdit=passwordCategoryModel.findById(categoryid)
    categoryEdit.exec((err,data) => {
      if(err) throw err
      res.render("editcategory", { title: "Edit Password Category",records:data, userid:loginid,error: "",id:categoryid,
      success: "" });
    })
  });
  router.post("/edit/", checklogin, function (req, res, next) {
    var loginid=localStorage.getItem("loginid");
    var categoryid=req.body.id;
    var updatecategory=req.body.updatecategory;
    var categoryEditAndSave=passwordCategoryModel.findByIdAndUpdate(categoryid,{passwordCategory:updatecategory})
    categoryEditAndSave.exec((err,data) => {
      if(err) throw err
      passwordCategoryList.exec((err, data) => {
        if (err) throw err;
        res.render("allcategory", {
          title: "Tiffin Category List",
          userid: loginid,
          records: data,
          msg: "Updated"
        });
    })
    })
  });
  router.get("/delete/:id", checklogin, function (req, res, next) {
    var loginid=localStorage.getItem("loginid");
    var categoryid=req.params.id;
    var categoryDel= passwordCategoryModel.findByIdAndDelete(categoryid)
    categoryDel.exec((err, data) => {
      if (err) throw err
      passwordCategoryList.exec((err, data) => {
        if (err) throw err;
        res.render("allcategory", {
          title: "Tiffin Category List",
          userid: loginid,
          records: data,
          msg: "Deleted Successfully"
        });
      });
    })
  });

  module.exports = router;







router.get("/allpassword/", checklogin, function (req, res, next) {
    var loginid=localStorage.getItem("loginid");
  
    var options = {
      offset:1,
      limit: 2
  };
    passwordDetailsModel.paginate({}, options,function(err,result){
      if (err) throw err
        res.render("allpassword", { title: "Project Name", userid:loginid,records:result.docs,msg:'',current:result.offset,pages:Math.ceil(result.totalDocs/result.limit) });
      })
    
  });
  
  router.get("/allpassword/:page", checklogin, function (req, res, next) {
    var loginid=localStorage.getItem("loginid");
    var perpage=2
    var page=req.params.page || 1
    passwordDetailsList.skip((perpage*page)-perpage).limit(perpage).
    exec((err,data) => {
      if (err) throw err
      passwordDetailsModel.countDocuments().exec((err,count) => {
        if (err) throw err
        res.render("allpassword", { title: "Project Name", userid:loginid,records:data,msg:'',current:page,pages:Math.ceil(count/perpage) });
      })
    })
  });
  
  router.get("/allpassword/delete/:id", checklogin, function (req, res, next) {
    var loginid=localStorage.getItem("loginid");
    var categoryid=req.params.id;
    var categoryDel= passwordDetailsModel.findByIdAndDelete(categoryid)
    categoryDel.exec((err, data) => {
      if (err) throw err
      var options = {
        offset:1,
        limit: 2
    };
      passwordDetailsModel.paginate({}, options,function(err,result){
        if (err) throw err
          res.render("allpassword", { title: "Project Name", userid:loginid,records:result.docs,msg:'',current:result.offset,pages:Math.ceil(result.totalDocs/result.limit) });
        })
      
    })
  });
  router.get("/allpassword/edit/:id", checklogin, function (req, res, next) {
    var loginid=localStorage.getItem("loginid");
    var categoryid=req.params.id;
    
    var categoryEdit=passwordDetailsModel.findById(categoryid)
    categoryEdit.exec((err,data) =>{
      if(err) throw err
      var edit=data
      passwordCategoryList.exec(function(err,data){
      if (err) throw err
      res.render("editpassword", { title: "Edit Password Details",records:data,record:edit, userid:loginid,error: "",id:categoryid,
      msg: "" });  
    })
    })
  });
  router.post("/allpassword/edit/:id", checklogin, function (req, res, next) {
    var loginid=localStorage.getItem("loginid");
    var id=req.body.id
    var updateCategory=req.body.categorytype
    var passwordDetails=req.body.passwordadd
    var projectName=req.body.projectname
  
    var passwordDetailsEditAndSave=passwordDetailsModel.findByIdAndUpdate(id,{passwordCategory:updateCategory,passwordDetails:passwordDetails,projectName:projectName})
    
      passwordDetailsEditAndSave.exec((err,data)=>{
          if(err) throw err
          var options = {
            offset:1,
            limit: 2
        };
        passwordDetailsModel.paginate({}, options,function(err,result){
          if (err) throw err
        
            res.render("allpassword", { title: "Project Name", userid:loginid,records:result.docs,msg:'',current:result.offset,pages:Math.ceil(result.totalDocs/result.limit) });
          })
        
      })
  });