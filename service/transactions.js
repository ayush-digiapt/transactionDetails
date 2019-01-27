const lib = require('../lib');
const db = require('../db/db').sequelize;
var config = require('config');
var sequelize = require('sequelize');
var randomToken = require('random-token');
var readXlsxFile = require('read-excel-file/node');
var fs = require('fs');
var moment = require("moment");

/*Importing the Sequelize models*/
var Transaction = db.import("../models/transactions");
var Relationship = db.import("../models/relationships");
var Category = db.import("../models/category");
var Tag = db.import("../models/tags");


/*Helper Function Start*/
exports.getTransaction = async function(uid) {
    return new Promise((resolve, reject) => {
        Transaction.findAll({
            where: {
               
            }
        }).then(function(data) {
            var array=[];
            var temp={};
            data.map(function(u){
                temp={
                id:u.dataValues.id,
                Date:u.dataValues.Date,
                Description:u.dataValues.Description,
                ref_no:u.dataValues.ref_no,
                Branch_Code:u.dataValues.Branch_Code,
                Debit:u.dataValues.Debit,
                Credit:u.dataValues.Credit,
                Balance:u.dataValues.Balance


                }
                array.push(temp);
            })
            resolve(array);
        }).catch(function(err) {
            reject(err);
        })
    })
}


exports.getTransactionids = async function(uid) {


    return new Promise((resolve, reject) => {
        Transaction.findAll({
            where: {
               
            },
            attributes: ['id']
        })

        .then(function(data) {

            console.log("data is****");
            var id = [];
            //var temp={};
            data.map(function(u) {

                id.push(u.dataValues.id)
            })

            console.log(id);

            resolve(id);

        }).catch(function(err) {
            console.log("data is######");

            reject(err);
        })
    })
}

exports.noTag = async function(tid) {


    return new Promise((resolve, reject) => {
        Transaction.findAll({
            where: {
                id: {
                    notIn: tid
                }
            }
        })

        .then(function(data) {

            console.log("data is****");



            resolve(data);

        }).catch(function(err) {
            console.log("data is######", err);

            reject(err);
        })
    })
}

exports.getTid = async function() {


    return new Promise((resolve, reject) => {
        Relationship.findAll({
                // attributes: ['tid']
            })
            .then(function(data) {

                // var tid;
                //  var tid=dataValues;
                var tid = [];
                data.map(function(u) {
                    tid.push(u.dataValues.tid);
                })

                resolve(tid);

            }).catch(function(err) {
                // console.log("data is######",data);

                reject(err);
            })
    })
}


exports.search = async function(id) {

    console.log("id is ?????", id)


    return new Promise((resolve, reject) => {
        Transaction.findAll({
            where: {
                id: { in: id
                }

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
var moment = require("moment");

exports.readExcelFile = async function(filepath) {
    
    return new Promise((resolve, reject) => {
        readXlsxFile(filepath).then((rows) => {
            var key = [],
                data = [];
            for (i = 0; i < 8; i++) {
                if(i==0){
                    rows[19][i]='Date'
                }
                else if(i==3){
                    rows[19][i]='ref_no'
                }
                else if(i==4){
                    rows[19][i]='Branch_Code'
                }
                key.push(rows[19][i]);
            }
            let map = new Map();
            //256  //53
            for (i = 20; i < (rows.length - 1); i++) {
                for (j = 0; j < 8; j++) {
                    if (j != 1 && j <= 4) {
                        if (j == 0) {
                          rows[i][j] = moment(rows[i][j],"DD/MM/YYYY").format("YYYY-MM-DD");
                          console.log("date is >>>>",rows[i][j]);
                         // rows[i][j] = stringToDate(rows[i][j],"MM/dd/yyyy","/");

                          // rows[i][j] = rows[i][j];
                        } else if(j==3){
                            if(rows[i][j]==" "||rows[i][j]=="/"){
                                rows[i][j]="NA";
                            }else if((rows[i][j].split(" ")[0]=="TRANSFER")||(rows[i][j].split(" ")[0]=="NEFT")){
                                rows[i][j]=rows[i][j].split(" ")[2];
                            }else{
                                rows[i][j]=rows[i][j].split(" ")[0];
                            }
                        }
                        else if(j==4){
                       rows[i][j] = rows[i][j];

                        }
                        
                        else
                            rows[i][j] = rows[i][j].toString().replace(/\s+/g, ' ').trim();

                        map.set(key[j], rows[i][j]);
                    }
                  
                    if (j > 4) {
                        rows[i][j] = rows[i][j] == null ? 0.0 : parseFloat(rows[i][j]);
                        map.set(key[j], rows[i][j]);
                    }
                }
                data.push(mapToObject(map));
            }
            resolve(data)
        }).catch((err) => {
            console.log("Error occured\t" + err);
            reject(err);
        })
    })
}

function mapToObject(map) {
    let obj = Array.from(map).reduce((obj, [key, value]) => (
        Object.assign(obj, {
            [key]: value
        })
    ), {});
    return obj
}


exports.getArray = async function(data1) {
    var responce = [],
        temp = {};
    data1.map(function(u) {
        temp = {

            date: u.B,
            Description: u.C,
            Ref_no: u.D,
            Branch_Code: u.E,
            Debit: u.F,
            Credit: u.E,
            Balance: u.H
        }
        response.push(temp)
    })
}

exports.findcategory = async function() {
    return new Promise((resolve, reject) => {
        Category.findAll({})

        .then(function(data) {

            console.log("data is****");
            var cid = [];
            var temp = {};
            data.map(function(u) {
                temp = {
                    cid: u.dataValues.id,
                    name: u.dataValues.name
                }
                cid.push(temp)
            })

            console.log("cid>>", cid);

            resolve(cid);

            resolve(cid);

        }).catch(function(err) {
            console.log("data is######");

            reject(err);
        })
    })
}

exports.findtagids = async function() {
    return new Promise((resolve, reject) => {
        Tag.findAll({})

        .then(function(data) {

            console.log("data is****");
            var tagid = [];
            var temp = {};
            data.map(function(u) {
                temp = {

                    tagid: u.dataValues.id,
                    cid: u.dataValues.cid,
                    name: u.dataValues.name
                }
                tagid.push(temp);
            })
            console.log(tagid);
            resolve(tagid);

        }).catch(function(err) {
            console.log("data is######");

            reject(err);
        })
    })
}

exports.gettagids = async function() {
    return new Promise((resolve, reject) => {
        Tag.findAll({})

        .then(function(data) {

            console.log("data is****");
            var id = [];
            var temp = {};
            data.map(function(u) {

                id.push(u.dataValues.id);
            })
            console.log(id);
            resolve(id);

        }).catch(function(err) {
            console.log("data is######");

            reject(err);
        })
    })
}

exports.gettag = async function() {
    return new Promise((resolve, reject) => {
        Tag.findAll({})

        .then(function(data) {

            console.log("data is****");
            var tagdata = [];
            var temp = {};
            data.map(function(u) {
                temp = {

                    id: u.dataValues.id,
                    name: u.dataValues.name
                }
                tagdata.push(temp);
            })
            
            console.log(tagdata);
            resolve(tagdata);

        }).catch(function(err) {
            console.log("data is######");

            reject(err);
        })
    })
}

exports.getdata = async function(tid) {
    var length = tid.length;
    console.log(length);
    return new Promise((resolve, reject) => {
        Relationship.findAll({
            where: {
                tid: { in: tid
                }
            }
        }).then(function(data) {
            console.log("data is****");
            var tagid = [];
            var temp = {};
            if (data === null) {
                console.log("2222");
            }
            data.map(function(u) {
                temp = {

                    tid: u.dataValues.tid ? u.dataValues.tid : 'NA',
                    tagid: u.dataValues.tagid ? u.dataValues.tagid : 'NA',
                    tag_name: u.dataValues.tag_name ? u.dataValues.tag_name : 'NA'

                }
                tagid.push(temp);
            })
            console.log(tagid);
            resolve(tagid);

        }).catch(function(err) {
            console.log("data is######");

            reject(err);
        })
    })
}

exports.gettransactionchart = async function(id) {
    console.log("0 is ", id[7]);
    return new Promise((resolve, reject) => {
        Transaction.sum('balance')
        Transaction.sum('balance', {
            where: {
                Date: {
                    $between: ["1/10/2018", "31/10/2018"]
                }
            }
        }).then(function(data) {
            console.log("sum  is****", data);
            resolve(data);
        }).catch(function(err) {
            console.log("data is######");
            reject(err);
        })
    })
}

exports.gettidarray = async function(id) {
    // console.log("0 is ",id[7]);
    //for(let i=id[0])

   // var tids = [];
   // var tidarray = [];
   ayusharray=[];
   count=0;



    return new Promise((resolve, reject) => {
        for (let i = 0; i < id.length; i++) {
            Relationship.findAll({
                where: {
                    tagid: id[i]
                }
            })

            .then(function(data) {
                var tidarray = [];
                var temp = {};

                  //  console.log("data is****",data);
                    if(data.length===0){
                        tidarray.push(0);
                    }
                    else{
                   
                    data.map(function(u) {

                        tidarray.push(u.dataValues.tid);
                    })
                }
                    console.log("tidarray>>", tidarray);
                    
                    //async function(){
                    // var balance= await findchartarray(tidarray);
                   // }
                   asyncCall();

                        async function asyncCall() {
                            var balance= await findchartarray(tidarray);
                            console.log("balance is for ayusharray",balance);
                            count++;
                            ayusharray.push(balance);
                            if(count==id.length){
                                console.log(ayusharray);
                                resolve(ayusharray);
                            }
                        }
                           
                  

                 

                   


                    //tids.push(tidarray);
                   // resolve(tidarray);

                })
                .catch(function(err) {
                    console.log("data is######");

                    reject(err);
                })

     }
      
    })
}
findchartarray = async function(tidarray){
        return new Promise((resolve, reject) => {
          //  Transaction.sum('balance')
          var balance=[];
          for( let i=1;i<=12;i++){
            Transaction.sum('balance', {
                where: {
                    Date: {
                        $between: ["2018-"+i+"-01", "2018-"+i+"-31"]     
                    },
                    id: {in: tidarray}
                }
            }).then(function(data) {
               // console.log("balance for month "+i+"",data);
                if (isNaN(data)) data = 0;
                    balance.push(data);
               // console.log("balance  is****", balance);
               if(i==12){
              //  console.log("balance  is****", balance);
               resolve(balance);
               }
            }).catch(function(err) {
                console.log("data is######");
                reject(err);
            })
        }
        
        
        })
    

}

exports.getReferences = async function() {
    return new Promise((resolve, reject) => {
            Transaction.findAll({
                where: {
                  
                }
            }).then(function(data) {
                    console.log("data is****");
                    var Ref_no = [];
                    var temp = {};
                    data.map(function(u) {

                        Ref_no.push(u.dataValues.ref_no);
                    })
                    console.log("Ref_no>>", Ref_no);
                   
                    resolve(Ref_no);

                })
                .catch(function(err) {
                    console.log("data is######");

                    reject(err);
                })
    })
}

exports.finddata = async function(transaction_data,ref) {
    return new Promise((resolve, reject) => {
           var data=[];
           var temp={};
           transaction_data.map(function(u){
            
                if(!(ref.includes(u.ref_no))){
                    /*Getting data for book table START*/
                 //   temp={
                        data.push(u);
                   // }
                   
                   
                }

               
           })
           console.log("data is>>",data.length);
           resolve(data);
    })
}


exports.createTransactionData = async function(dataforadd) {
    return new Promise((resolve, reject) => {
        Transaction.bulkCreate(dataforadd).then(function(data) {
            console.log("data is****");
            resolve(data);

        }).catch(function(err) {
            console.log("data is######");

            reject(err);
        })
          
    })
}


exports.findcategoryarray = async function(tid,categoryname) {
    //console.log("tid of i",tid[32]);
                var data=[];
                var ayush=[];
                console.log("******",tid.length);

    return new Promise((resolve, reject) => {

        for(let i=0;i<tid.length;i++){
       
        Relationship.findAll( {
            where: {
               tid:tid[i]
            }
        }).then(function(category) {
            console.log("data is"+i+"",category);
            var Array=[];
           // var data=[];
            var temp={};
            var count=0;
            if(category.length===0){
                       temp={
                           Type:"-",
                           Area:"-"
                       }
                       data.push(temp);
                   }
                   else{
            category.map(function(u){
            Array.push(u.dataValues.tagid);
           })
           console.log("array is"+i+"",Array);

        //    if(Array.length===0){
        //        temp={
        //            Type:"-",
        //            Area:"-"
        //        }
        //        data.push(temp);
        //    }
            if(Array.length===1){
               Array.map(function(u){
                   
                   if(u===1 || u===2){
                       if(u===1){
                        temp={
                            Type:"credit",
                            Area:"-"
                        }
                        data.push(temp);
                       }
                       else{
                        temp={
                            Type:"debit",
                            Area:"-"
                        }
                        data.push(temp);
                       }
                      
                   }
                   else{
                    if(u===3){
                        temp={
                            Type:"-",
                            Area:"sale"
                        }
                        data.push(temp);
                       }
                       else if(u===4){
                            temp={
                               Type:"-",
                               Area:"delivery"
                         }
                        data.push(temp);
                          }
                           
                          else if(u===5){
                                temp={
                                    Type:"-",
                                    Area:"hr"
                                }
                                data.push(temp);
                               }
                            else{
                                temp={
                                    Type:"-",
                                    Area:"form"
                                }
                                data.push(temp);
                                }
                            

                        }
                    
                
               })
           }
           else{
              
               if(Array[0]===1){
                if(Array[1]===3){
                    temp={
                    Type:"credit",
                    Area:"sale"
                    }
                    data.push(temp)

                }
                else if(Array[1]===4){
                    temp={
                    Type:"credit",
                    Area:"delivery"
                    }
                    data.push(temp)

                }
                else if(Array[1]===5){
                    temp={
                    Type:"credit",
                    Area:"hr"
                    }
                    data.push(temp)

                }
                else if( Array[1]===6){
                    temp={
                    Type:"credit",
                    Area:"Form"
                    }
                    data.push(temp)
                }
               }
               else if(Array[0]===2){
                if(Array[1]===3){
                    temp={
                    Type:"debit",
                    Area:"sale"
                    }
                    data.push(temp)

                }
                else if(Array[1]===4){
                    temp={
                    Type:"debit",
                    Area:"delivery"
                    }
                    data.push(temp)

                }
                else if(Array[1]===5){
                    temp={
                    Type:"debit",
                    Area:"hr"
                    }
                    data.push(temp)

                }
                else if( Array[1]===6){
                    temp={
                    Type:"debit",
                    Area:"Form"
                    }
                    data.push(temp)
                }
               }
               else{
                temp={
                    Type:"-",
                    Area:"-"
                    }
                    data.push(temp)
               }
              
               ayush.push(data);
               console.log(tid.length);
           
        
            //data.push(temp);
           }
        }
        if(i===tid.length-1){
                
            console.log("data is for category",ayush);
            resolve(ayush);
        }
        
         
        // console.log("data is for category",data);
          //  resolve(data);
        }).catch(function(err) {
            console.log("data is######");
            reject(err);
        })
       
    }
    
    
    
    })

}



exports.gettrasactionandcategorydata = async function(transactiondata,categoryarray) {
    return new Promise((resolve, reject) => {
      

        var array=[];
        var j=0;
      
           transactiondata.map(function(u){
             var temp={};

                temp={
                    id:u.id,
                    Date:u.Date,
                    Description:u.Description,
                    ref_no:u.ref_no,
                    Branch_Code:u.Branch_Code,
                    Debit:u.Debit,
                    Credit:u.Credit,
                    Balance:u.Balance,
                    category:categoryarray[0][j]
                }
                
               j++;
                array.push(temp);
          
        })
       
       
    //   for(let i=0;i<transactiondata.length;i++){
    //        array[i]=""+transactiondata[i]+""+categoryarray+"";
    //   }
      console.log("array",array);
     resolve(array);
          
    })
}


