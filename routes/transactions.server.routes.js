var express = require('express');
var router = express.Router();
var Transaction = require('../controllers/transactions.server.controllers');
var multer=require("multer")
var upload = multer();


/*Get single transactions*/
router.get('/details' , Transaction.transactiondatawithcategory);


/*Get single transactions*/
router.post('/search' , Transaction.search);
router.post('/import' ,Transaction.import);
router.get('/notag' ,Transaction.noTag);
//router.get('/category' ,Transaction.category);
router.get('/chartdetails' ,Transaction.chartdetails);
module.exports = router;
