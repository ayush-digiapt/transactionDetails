const lib = require('../lib');
const db = require('../db/db').sequelize;
var config = require('config');
var randomToken = require('random-token');

/*Importing the Sequelize models*/
var Admin = db.import("../models/admin");

var AdminSession = db.import("../models/admin_sessions");

exports.getPersonDetails = async function(name,pwd) {

    return new Promise((resolve,reject) => {
        Admin.findOne({
                    where: {
                        name: name,
                        password: pwd
                       
                    }
                })
                
        .then(function(persondata) {
           
            console.log("data is****");
           
            resolve(persondata);
        
        }).catch(function(err) {
            console.log("data is######");
            
            reject(err);
        })
    })

}



exports.getSession = async function(name) {
  
    var token = randomToken(12);
    console.log("token is"+token);
   

          var currentDate = new Date();
          var year = currentDate.getFullYear(); 
          var month = currentDate.getMonth();
          var day = currentDate.getDate();
          var nextDate = new Date(year+1, month, day)
                            
                                
          var token_expiry = nextDate;
      
     
      return new Promise((resolve,reject) => {
        AdminSession.create({
                   
                    
                    admin : name,
                    token : token,
                    token_expiry : token_expiry
        })
          .then(function(getSession) {
              console.log("data is****");
             
              resolve(getSession);
          }).catch(function(err) {
              console.log("data is######");
              
              reject(err);
          })
      })
  
  }




exports.getPersonName = async function(token) {
    
      
      return new Promise((resolve,reject) => {
        AdminSession.destroy({
            where: {
                token:token
            }
        })
          .then(function(getPersonName) {
              console.log("data is****");
             
              resolve(getPersonName);
          }).catch(function(err) {
              console.log("data is######");
              
              reject(err);
          })
      })
  
  }

  


exports.getTokenExpiry = async function(token) {

    return new Promise((resolve,reject) => {
        AdminSession.findOne({
                    where: {
                        token:token
                    }
                })
                
        .then(function(getTokenExpiry) {
          
            console.log("data is****");
           
            resolve(getTokenExpiry);
        
        }).catch(function(err) {
            console.log("data is######");
            
            reject(err);
        })
    })

}

  
