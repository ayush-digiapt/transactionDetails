/*Beans Copyright info*/
var express = require('express');
var router = express.Router();
var Transaction = require('../controllers/transactions.server.controllers');
//var multer = require('multer');
//var upload = multer(); // for parsing multipart/form-data
//  var multer      = require('multer');
//  var upload      = multer({ dest: 'uploads/',fileFilter:function(req,file,cb){
//         console.log('file is',file)
//          cb(null,true);
//      }
//     });


/* BEANS code generated for CRR*UD. */

/*Create transactions record*/
//router.post('/', upload.array(), /*auth.isAuthenticated,*/ Transaction.createTransaction);

/*Get single transactions*/
router.get('/details/:id' , Transaction.getTransaction);


/*Get single transactions*/
router.post('/search' , Transaction.search);

router.post('/import' ,Transaction.import);

router.get('/notag' ,Transaction.noTag);
// router.post('/import', upload.single('test'), function(req, res, next) {
//     console.log(req.body);
//     console.log(req.file);
//     Ingest.ingestData()
//     .then(function (response){
//         return res.status(200).json(response);
//     });
// });

//router.post('/import' ,Transaction.import);



// /*Get all Transactions.*/
// router.get('/' , Transaction.getAllTransactions);

// /*Update an transactions record*/
// router.post('/:transactions_id', upload.array(), /*auth.isAuthenticated,*/ Transaction.updateTransaction);

// /*Delete transactions */
// router.delete('/:transactions_id', /*auth.isAuthenticated,*/ Transaction.deleteTransaction);

// /*For pagination*/
// router.get('/:itemsPerPage/:pageNo' , Transaction.getAllTransactionsForPagination);

// /*For sorting*/
// router.get('/sort/:itemsPerPage/:pageNo/:colname/:orderBy' , Transaction.getAllTransactionsSortedByColumn);

// /*For filtering*/
// router.get('/filter/:itemsPerPage/:pageNo/:colname/:filterText' , Transaction.getAllTransactionsFilteredByColumn);

// /*For Searching*/
// router.get('/search/:itemsPerPage/:pageNo/:colname/:searchText' , Transaction.getAllTransactionsBySearchText);



module.exports = router;
