const lib = require('../lib');
const db = require('../db/db').sequelize;
var config = require('config');
var randomToken = require('random-token');
var passwordHash = require('password-hash');
var randomChar = require('random-char');



/*Importing the Sequelize models*/
var Team = db.import("../models/team");

var TeamSession = db.import("../models/team_sessions");

exports.getPassword = async function(name) {

    return new Promise((resolve,reject) => {
        Team.findOne({
                    where: {
                        name:name
                    }
                })
                
        .then(function(getPassword) {
            
            console.log("data is****");
           
            resolve(getPassword);
        
        }).catch(function(err) {
            console.log("data is######");
            
            reject(err);
        })
    })

}

exports.getPersonDetails = async function(name,password,hashedPassword) {

 
    console.log(passwordHash.verify(password, hashedPassword)); // true
    
   var valid = passwordHash.verify(password, hashedPassword);
if(valid){
    return new Promise((resolve,reject) => {
        Team.findOne({
                    where: {
                        name: name,
                        password: hashedPassword
                       
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
        TeamSession.create({
                   
                    
                    team : name,
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
        TeamSession.destroy({
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



exports.addTeam = async function(name,password,number,validity,license_key) {

   

    var currentDate = new Date();
    var year = currentDate.getFullYear(); 
    var month = currentDate.getMonth();
    var day = currentDate.getDate();
    var nextDate = new Date(year+validity, month, day)
                      
                          
    var Validity = nextDate;

    
    


    var hashedPassword = passwordHash.generate(password);
    console.log(hashedPassword);

      
    return new Promise((resolve,reject) => {
        Team.create({
                    name : name,
            		password : hashedPassword,
            		number_of_people : number,
                    validity : Validity,
                    license_key:license_key
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
        TeamSession.findOne({
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



exports.getAllTeam = async function() {

    return new Promise((resolve,reject) => {
        Team.findAll({attributes: ['name', ['validity', 'validity_date'], 'number_of_people']})
                
        .then(function(getAllTeam) {
           
            console.log("data is****");
           
            resolve(getAllTeam);
        
        }).catch(function(err) {
            console.log("data is######");
            
            reject(err);
        })
    })

}




exports.getTeam = async function(name) {

    return new Promise((resolve,reject) => {
        Team.findOne({
                    where: {
                        name:name
                    }
                })
                
        .then(function(getTeam) {
           
            console.log("data is****");
           
            resolve(getTeam);
        
        }).catch(function(err) {
            console.log("data is######");
            
            reject(err);
        })
    })

}

exports.deleteTeamSession = async function(name) {
    console.log("inside delete team session");

    return new Promise((resolve,reject) => {
        TeamSession.destroy({
                    where: {
                        team:name
                    }
                })
                
        .then(function(deleteTeamSession) {
           
            console.log("data is****");
           
            resolve(deleteTeamSession);
        
        }).catch(function(err) {
            console.log("data is######");
            
            reject(err);
        })
    })

}


exports.deleteTeam = async function(name) {

    return new Promise((resolve,reject) => {
        Team.destroy({
                    where: {
                        name:name
                    }
                })
                
        .then(function(deleteTeam) {
           
            console.log("data is****");
           
            resolve(deleteTeam);
        
        }).catch(function(err) {
            console.log("data is######");
            
            reject(err);
        })
    })

}




exports.updateTeam = async function(name,number,validity,license_key,password) {


    var currentDate = new Date();
    var year = currentDate.getFullYear(); 
    var month = currentDate.getMonth();
    var day = currentDate.getDate();
    var nextDate = new Date(year+validity, month, day)
                      
                          
    var Validity = nextDate;

    return new Promise((resolve,reject) => {
        console.log("license_key>>>>"+license_key);

        if(license_key===undefined && password===undefined){
           
        Team.update({
                  
            		number_of_people : number,
                    validity : Validity
                }, {
                    where: {
                       
                        name: name
                    }
                })
                           
      .then(function(updateTeam) {
           
            resolve(updateTeam);
        
        }).catch(function(err) {
          
            reject(err);
        })
    }

    else if(license_key===undefined){

    var hashedPassword = passwordHash.generate(password);
    console.log(hashedPassword);

        Team.update({
                  
            		number_of_people : number,
                    validity : Validity,
                    password : hashedPassword
                }, {
                    where: {
                       
                        name: name
                    }
                })
                           
      .then(function(updateTeam) {
           
            resolve(updateTeam);
        
        }).catch(function(err) {
          
            reject(err);
        })
    }

    else if(password===undefined){
        
        Team.update({
                  
            		number_of_people : number,
                    validity : Validity,
                    license_key : license_key
                }, {
                    where: {
                       
                        name: name
                    }
                })
                           
      .then(function(updateTeam) {
           
            resolve(updateTeam);
        
        }).catch(function(err) {
          
            reject(err);
        })
    }
    else{

    var hashedPassword = passwordHash.generate(password);
    console.log(hashedPassword);
        
        Team.update({
                  
            number_of_people : number,
            validity : Validity,
            license_key : license_key,
            password : hashedPassword
        }, {
            where: {
               
                name: name
            }
        })
        
                
        .then(function(updateTeam) {
        
          
            resolve(updateTeam);

        }).catch(function(err) {
           
            reject(err);
        })
    }
      })

}




exports.getName = async function(token) {

    return new Promise((resolve,reject) => {
        TeamSession.findOne({
                    where: {
                        token:token
                    }
                })
                
        .then(function(getName) {
            
            console.log("data is****");
           
            resolve(getName);
    
        }).catch(function(err) {
            console.log("data is######");
            
            reject(err);
        })
    })

}


exports.getValidity = async function(name) {

    return new Promise((resolve,reject) => {
        Team.findOne({
                    where: {
                        name:name
                    }
                })
                
        .then(function(getValidity) {
           
            console.log("data is****");
           
            resolve(getValidity);
        
        }).catch(function(err) {
            console.log("data is######");
            
            reject(err);
        })
    })

}
