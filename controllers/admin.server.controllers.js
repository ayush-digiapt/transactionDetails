/*Beans Copyright info*/

const lib = require('../lib');
const db = require('../db/db').sequelize;
var config = require('config');



/*Helper Functions*/
var AdminHelper=require("../service/adminhelper");


exports.login = lib.asyncMiddleware(async(req, res, next) => {
    console.log("Inside loging API\n");
    try {
        /*Async await*/
        var name= req.body.name;
        var pwd=req.body.password;
      
       var  data = await AdminHelper.getPersonDetails(name,pwd);
       
    console.log(data)
        if(data===null){
            
        return res.status(401).send({status:401, message:"login fail"});
        }
        else{
           var  data2 = await AdminHelper.getSession(name);
            if(data2===null){
                console.log("data2"+data2);
                return res.status(401).send({status:401, message:"session is not done"});
            }
            else{
             console.log("data2 is"+data2);
             var token=data2.token;
            console.log(token);
            return res.status(200).send({status:200, message:"login successfull", token: token});
             }
           
            
        }
    } catch (err) {
        console.log("Error\t", err);
        return res.status(400).send("Server Error");
    }
});


exports.logout = lib.asyncMiddleware(async(req, res, next) => {
    console.log("Inside demo API\n");
    var token= req.headers.token;
    try {
        /*Async await*/
       
        data = await AdminHelper.getPersonName(token);
       
        console.log("data is"+data);
        if(data===0)
        {
            res.status(401).send({status:401, message:"not logout"})
        }
        else{
        return res.status(200).send({status:200, message:"logout successfull"});
        }
    } catch (err) {
        console.log("Error\t", err);
        return res.status(400).send("Server Error");
    }
});


