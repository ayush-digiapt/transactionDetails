const lib = require('../lib');
const db = require('../db/db').sequelize;
var config = require('config');
var randomToken = require('random-token');
const excelToJson = require('convert-excel-to-json');


/*Importing the Sequelize models*/
var Transaction = db.import("../models/transactions");
var Relationship =db.import("../models/relationships");




exports.getTransaction = async function(uid) {

   
    return new Promise((resolve,reject) => {
        Transaction.findAll({
                    where: {
                        uid : uid
                    }
                })
                
        .then(function(data) {
            
            console.log("data is****");
           
            resolve(data);
        
        }).catch(function(err) {
            console.log("data is######");
            
            reject(err);
        })
    })
}



exports.noTag = async function(tid) {

   
    return new Promise((resolve,reject) => {
        Transaction.findAll({
                    where: {
                        id : {notIn:tid}
                    }
                })
                
        .then(function(data) {
            
            console.log("data is****");
           
            resolve(data);
        
        }).catch(function(err) {
            console.log("data is######",err);
            
            reject(err);
        })
    })
}


exports.getTid = async function() {

   
    return new Promise((resolve,reject) => {
        Relationship.findAll({
            attributes: ['tid']
          })     
        .then(function(data) {
                       
            resolve(data);
        
        }).catch(function(err) {
           // console.log("data is######",data);
            
            reject(err);
        })
    })
}


exports.search = async function(id) {

    console.log("id is ?????",id)

   
    return new Promise((resolve,reject) => {
        Transaction.findAll({
                    where: {
                        id : {in:id}
                        
                    }
                })
                
        .then(function(data) {
            
            console.log("data is****");
           
            resolve(data);
        
        }).catch(function(err) {
            console.log("data is######");
            
            reject(err);
        })
    })
}


exports.import = async function(file) {

    console.log("file is ?????",file);


 
const result = excelToJson({
    
    sourceFile: '/home/administrator/Desktop/_Bank Statement - Oct.xlsx'
});
console.log("result from services>",result);


}


exports.getArray = async function(data1) {
var responce=[],temp={};
data1.map(function(u){
    temp={
       
        date:u.B,
        Description:u.C,
        Ref_no:u.D,
        Branch_Code:u.E,
        Debit:u.F,
        Credit:u.E,
        Balance:u.H
    }
   response.push(temp)   
})
  


}



