var express = require('express');
var router = express.Router();
const admincontroller =require ('../controller/admin-controller')
const AdminLog = require('../models/admin-model');
const Authentications = require('../middleware/authentications')
const multer = require("multer");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/upload");
   },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  var upload = multer({ storage: storage });

  router.post('/createadmin',upload.single("image"),admincontroller.createadmin);
  router.get ('/adminlist',admincontroller.adminlist)
  router.get('/adminedit/:id',admincontroller.adminedit);
  router.put('/updateadmin/:id',upload.single("image"),admincontroller.updateadmin);
  router.delete('/admindelete/:id',admincontroller.admindelete);
  
  module.exports =router;
