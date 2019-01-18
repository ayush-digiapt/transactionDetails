const lib = require('../lib');
const db = require('../db/db').sequelize;
var config = require('config');
var randomToken = require('random-token');

/*Importing the Sequelize models*/
var Tag = db.import("../models/tags");






exports.createTag = async function(name) {

   
    return new Promise((resolve,reject) => {
        Tag.create({
                    name:name
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


exports.findTag = async function(name) {

   
    return new Promise((resolve,reject) => {
        Tag.findOne({
            where: {
                name : name
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

