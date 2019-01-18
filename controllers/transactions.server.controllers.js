/*Beans Copyright info*/

const lib = require('../lib');
const db = require('../db/db').sequelize;
var config = require('config');
var fs=require('fs');
var multer= require('multer');



/*Helper Functions*/
var Transaction=require("../service/transactions");

/*
 ** Beans generated CRR*UD controller methods.
 */


exports.getTransaction = lib.asyncMiddleware(async(req, res, next) => {
    console.log("Inside loging API\n");
    try {
        /*Async await*/
        var uid=req.params.id;
      
       var  data = await Transaction.getTransaction(uid);
       
 
        if(data===null){
            
        return res.status(401).send({status:401, message:"data not found"});
        }
        else{
           return res.status(200).send({status:200 , data:data});
             
        }
    } catch (err) {
        console.log("Error\t", err);
        return res.status(400).send("Server Error");
    }
});

exports.search = lib.asyncMiddleware(async(req, res, next) => {
    console.log("Inside loging API\n");
    try {
        /*Async await*/
        var id=req.body.id;

        console.log("id is>>",id);
      
       var  data = await Transaction.search(id);
       
 
        if(data===null){
            
        return res.status(401).send({status:401, message:"data not found"});
        }
        else{
           return res.status(200).send({status:200 , data:data});
             
        }
    } catch (err) {
        console.log("Error\t", err);
        return res.status(400).send("Server Error");
    }
});

exports.import = lib.asyncMiddleware(async(req, res, next) => {
    console.log("Inside loging API\n");
    try {
        /*Async await*/
        //var file=req.body.file;
        // var file = req.body.file;
        // console.log(file);

        //var file=req.file;
        //console.log(file);


      
      
      
      var  data1 = await Transaction.import();

      var data = await Transaction.getArray(data1);
       
 
        if(data===null){
            
        return res.status(401).send({status:401, message:"data not found"});
        }
        else{
           return res.status(200).send({status:200 , data:data});
             
        }
    } catch (err) {
        console.log("Error\t", err);
        return res.status(400).send("Server Error");
    }
});


exports.noTag = lib.asyncMiddleware(async(req, res, next) => {
    console.log("Inside loging API\n");
    try {
        /*Async await*/
        

      
       var  tid = await Transaction.getTid();
    //     var id=[],temp={},ids;
    //    tid.map(function(u){
    //        temp={
    //     ids:u.dataValues
    //        }
    //     id.push(ids);
    //    })
    //    console.log(id);
      

       var  data = await Transaction.noTag(tid);
       
 
        if(data===null){
            
        return res.status(401).send({status:401, message:"data not found"});
        }
        else{
           return res.status(200).send({status:200 , data:data});
             
        }
    } catch (err) {
        console.log("Error\t", err);
        return res.status(400).send("Server Error");
    }
});


/*Create transactions record.*/

exports.createTransaction = function(req, res) {
    // Log entry.
    console.log('Transaction Controller: entering createTransaction ');

    var v = new lib.Validator ("uid:number,amount:number,tyoe:string");

    if (!v.run(req.body)) {
        return res.status(400).send({
            error: v.errors
        });
    }

    Transaction.create({
        id : req.body.id,
				uid : req.body.uid,
				description : req.body.description,
				amount : req.body.amount,
				tyoe : req.body.tyoe
    }).then(function(result) {
        console.log('created transactions', result);
        res.jsonp(result);
    }).catch(function(err) {
        console.log('Could not create transactions record');
        console.log('err: %j', err);
    });
    

} /*End of createTransaction*/


/*Get a single transactions */
// exports.getTransaction = function(req, res) {
//     var transactions_id = req.params.transactions_id;
//     console.log('Transaction Controller: entering getTransaction ');
//     /*Validate for a null id*/
//     if (!transactions_id) {
//         res.status(400).send("transactions ID is null");
//         return;
//     }
//     /* Query DB using sequelize api for a single transactions*/
//     Transaction.findOne({
//         where: {
//             id: transactions_id
//         }
//     }).then(function(transactions) {
//         console.log(transactions);
//         res.jsonp(transactions);
//     }).catch(function(err) {
//         console.log('could not fetch transactions');
//         console.log('err: %j', err);
//     });
// } /*End of getTransaction*/

/*Get all Transactions */
exports.getAllTransactions = function(req, res) {
    console.log('Transaction Controller: entering getAllTransactions');
    /* Query DB using sequelize api for all Transactions*/
    Transaction.findAll().then(function(transactions) {
        /*Return an array of Transactions */
        res.jsonp(transactions);
    }).catch(function(err) {
        console.log('could not fetch all transactions');
        console.log('err: %j', err);
    });
}; /*End of getAllTransactions*/


/*Update transactions record.*/
exports.updateTransaction = function(req, res) {
    // Log entry.
    console.log('Transaction Controller: entering updateTransaction ');

    var transactions_id = req.params.transactions_id;
    Transaction.update({
        id : req.body.id,
				uid : req.body.uid,
				description : req.body.description,
				amount : req.body.amount,
				tyoe : req.body.tyoe
    }, {
        where: {
            /* transactions table primary key */
            id: transactions_id
        }
    }).then(function(result) {
        console.log('updated transactions', result);
        res.send("transactions updated successfully");
    }).catch(function(err) {
        console.log('Could not update transactions record');
        console.log('err: %j', err);
    });

} /*End of updateTransaction*/

/*Delete a single transaction */
exports.deleteTransaction = function(req, res) {
    console.log('Transaction Controller: entering deleteTransaction ');

    var transactions_id = req.params.transactions_id;
    /*Validate for a null transactions_id*/
    if (!transactions_id) {
        res.status(400).send("transactions ID is null");
        return;
    }
    /* Delete transactions record*/
    Transaction.destroy({
        where: {
            id: transactions_id
        }
    }).then(function(transaction) {
        console.log(transaction);
        res.jsonp(transaction);
    }).catch(function(err) {
        console.log('could not delete transaction');
        console.log('err: %j', err);

    });
} /*End of deleteTransaction*/


// /*Get all Transactions for pagination */
// exports.getAllTransactionsForPagination = function(req, res) {
//     console.log('Transaction Controller: entering getAllTransactionsForPagination');
//     var itemsPerPage = parseInt(req.params.itemsPerPage);
//     var pageNo = parseInt(req.params.pageNo);
//     var offset = itemsPerPage * (pageNo - 1);
//     console.log("offset is " + offset);
//     /* Query DB using sequelize api for all Transactions*/
//     Transaction.findAll({
//         offset: offset,
//         limit: itemsPerPage
//     }).then(function(transactions) {
//         /*Return an array of transactions */
//         res.jsonp(transactions);
//     }).catch(function(err) {
//         console.log('could not fetch all transactions for pagination');
//         console.log('err: %j', err);
//     });
// }; /*End of getAllTransactionsForPagination*/

// /*Get all sorted Transactions  */
// exports.getAllTransactionsSortedByColumn = function(req, res) {
//     console.log('Page Controller: entering getAllTransactionsSortedByColumn');
//     var itemsPerPage = parseInt(req.params.itemsPerPage);
//     var pageNo = parseInt(req.params.pageNo);
//     var colname = req.params.colname;
//     var orderBy = req.params.orderBy;
//     var offset = itemsPerPage * (pageNo - 1);

//     var order = colname + " " + orderBy;
//     console.log("offset is " + offset);
//     /* Query DB using sequelize api for all Transactions*/
//     Transaction.findAll({
//         offset: offset,
//         limit: itemsPerPage,
//         order: order
//     }).then(function(transactions) {
//         /*Return an array of Transactions */
//         res.jsonp(transactions);
//     }).catch(function(err) {
//         console.log('could not fetch all Transactions for sorting');
//         console.log('err: %j', err);
//     });
// }; /*End of getAllTransactionsSortedByColumn*/

// /*Get all filtered Transactions */
// exports.getAllTransactionsFilteredByColumn = function(req, res) {
//     console.log('Page Controller: entering getAllTransactionsFilteredByColumn');
//     var itemsPerPage = parseInt(req.params.itemsPerPage);
//     var pageNo = parseInt(req.params.pageNo);
//     var colname = req.params.colname;
//     var filterText = req.params.filterText;
//     var offset = itemsPerPage * (pageNo - 1);
//     var criteria = {};
//     var whereCl = {};
//     whereCl[colname] = filterText;

//     criteria['where'] = whereCl;

//     criteria['offset'] = offset;
//     criteria['limit'] = itemsPerPage;

//     console.log("offset is " + offset);
//     /* Query DB using sequelize api for all Pages offset : offset , limit : itemsPerPage ,order : order ,*/
//     Transaction.findAll(criteria).then(function(transactions) {
//         /*Return an array of pages */
//         res.jsonp(transactions);
//     }).catch(function(err) {
//         console.log('could not fetch all Transactions for filtering');
//         console.log('err: %j', err);
//     });
// }; /*End of getAllTransactionsFilteredByColumn*/


// /*Get all Transactions by search text */
// exports.getAllTransactionsBySearchText = function(req, res) {
//     console.log('Transaction Controller: entering getAllTransactionsBySearchText');
//     var itemsPerPage = parseInt(req.params.itemsPerPage);
//     var pageNo = parseInt(req.params.pageNo);
//     var offset = itemsPerPage * (pageNo - 1);
//     console.log("offset is " + offset);
//     var searchText = req.params.searchText;
//     var like = "%" + searchText + "%";
//     var criteria = {
//         where: Sequelize.where(Sequelize.fn("concat", Sequelize.col('id'),Sequelize.col('uid'),Sequelize.col('description'),Sequelize.col('amount'),Sequelize.col('tyoe')), {
//             like: like
//         })
//     };
//     criteria['offset'] = offset;
//     criteria['limit'] = itemsPerPage;

//     /* Query DB using sequelize api for all transactions*/
//     Transaction.findAll(criteria).then(function(transactions) {
//         /*Return an array of pages */
//         res.jsonp(transactions);
//     }).catch(function(err) {
//         console.log('could not fetch all transactions for search');
//         console.log('err: %j', err);
//     });
// }; /*End of getAllTransactionsBySearchText*/