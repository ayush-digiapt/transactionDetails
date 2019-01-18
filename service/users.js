const lib = require('../lib');
const db = require('../db/db').sequelize;
var config = require('config');
var randomToken = require('random-token');

/*Importing the Sequelize models*/
var User = db.import("../models/users");


exports.login = async function(email,password) {

   
    return new Promise((resolve,reject) => {
        User.findOne({
                    where: {
                        email: email,
                        password: password
                       
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

