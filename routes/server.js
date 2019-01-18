var express = require('express');
var app = express.Router();
//var Relationship = require('../controllers/relationships.server.controllers');
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data
var Ingest      = require('../controllers/ingest.js');
var multer      = require('multer');
var upload      = multer({ dest: 'uploads/',fileFilter:function(req,file,cb){
        console.log('file is',file)
        cb(null,true);
    }
}).single('csv');



    app.post('/ingest', function(req,res){
        upload(req, res, function(err) {
            if(err){
                console.log(err);
            }
            console.log(req.body);
            console.log(req.file);
            Ingest.ingestData()
            .then(function (response){
                return res.status(200).json(response);
            });
        });
    });

