/*Beans Copyright info*/

const lib = require('../lib');
const db = require('../db/db').sequelize;
var config = require('config');



/*Helper Functions*/
var Tag=require("../service/tags");

/*
 ** Beans generated CRR*UD controller methods.
 */



exports.createTag = lib.asyncMiddleware(async(req, res, next) => {
    console.log("Inside loging API\n");
    try {
        /*Async await*/
        
        var name=req.body.name;
        var tid=req.params.tid;
   
      
        
       var  finddata = await Tag.findTag(name);
     //  console.log(finddata);
       if(finddata===null){
           console.log("<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>");
       var  createdata = await Tag.createTag(name);
       console.log(createdata);
       var tagid=data.id;
       }
       else{
        var tagid=createdata.id;
       }
       console.log(tid,tagid);

       var data = await Tag.addTagInTransaction(tid,tagid);


 
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



// /*Create tags record.*/
// exports.createTag = function(req, res) {
//     // Log entry.
//     console.log('Tag Controller: entering createTag ');

//     var v = new lib.Validator ("name:string");

//     if (!v.run(req.body)) {
//         return res.status(400).send({
//             error: v.errors
//         });
//     }

//     Tag.create({
//         id : req.body.id,
// 				name : req.body.name
//     }).then(function(result) {
//         console.log('created tags', result);
//         res.jsonp(result);
//     }).catch(function(err) {
//         console.log('Could not create tags record');
//         console.log('err: %j', err);
//     });

// } /*End of createTag*/


// /*Get a single tags */
// exports.getTag = function(req, res) {
//     var tags_id = req.params.tags_id;
//     console.log('Tag Controller: entering getTag ');
//     /*Validate for a null id*/
//     if (!tags_id) {
//         res.status(400).send("tags ID is null");
//         return;
//     }
//     /* Query DB using sequelize api for a single tags*/
//     Tag.findOne({
//         where: {
//             id: tags_id
//         }
//     }).then(function(tags) {
//         console.log(tags);
//         res.jsonp(tags);
//     }).catch(function(err) {
//         console.log('could not fetch tags');
//         console.log('err: %j', err);
//     });
// } /*End of getTag*/

// /*Get all Tags */
// exports.getAllTags = function(req, res) {
//     console.log('Tag Controller: entering getAllTags');
//     /* Query DB using sequelize api for all Tags*/
//     Tag.findAll().then(function(tags) {
//         /*Return an array of Tags */
//         res.jsonp(tags);
//     }).catch(function(err) {
//         console.log('could not fetch all tags');
//         console.log('err: %j', err);
//     });
// }; /*End of getAllTags*/


// /*Update tags record.*/
// exports.updateTag = function(req, res) {
//     // Log entry.
//     console.log('Tag Controller: entering updateTag ');

//     var tags_id = req.params.tags_id;
//     Tag.update({
//         id : req.body.id,
// 				name : req.body.name
//     }, {
//         where: {
//             /* tags table primary key */
//             id: tags_id
//         }
//     }).then(function(result) {
//         console.log('updated tags', result);
//         res.send("tags updated successfully");
//     }).catch(function(err) {
//         console.log('Could not update tags record');
//         console.log('err: %j', err);
//     });

// } /*End of updateTag*/

// /*Delete a single tag */
// exports.deleteTag = function(req, res) {
//     console.log('Tag Controller: entering deleteTag ');

//     var tags_id = req.params.tags_id;
//     /*Validate for a null tags_id*/
//     if (!tags_id) {
//         res.status(400).send("tags ID is null");
//         return;
//     }
//     /* Delete tags record*/
//     Tag.destroy({
//         where: {
//             id: tags_id
//         }
//     }).then(function(tag) {
//         console.log(tag);
//         res.jsonp(tag);
//     }).catch(function(err) {
//         console.log('could not delete tag');
//         console.log('err: %j', err);

//     });
// } /*End of deleteTag*/


// /*Get all Tags for pagination */
// exports.getAllTagsForPagination = function(req, res) {
//     console.log('Tag Controller: entering getAllTagsForPagination');
//     var itemsPerPage = parseInt(req.params.itemsPerPage);
//     var pageNo = parseInt(req.params.pageNo);
//     var offset = itemsPerPage * (pageNo - 1);
//     console.log("offset is " + offset);
//     /* Query DB using sequelize api for all Tags*/
//     Tag.findAll({
//         offset: offset,
//         limit: itemsPerPage
//     }).then(function(tags) {
//         /*Return an array of tags */
//         res.jsonp(tags);
//     }).catch(function(err) {
//         console.log('could not fetch all tags for pagination');
//         console.log('err: %j', err);
//     });
// }; /*End of getAllTagsForPagination*/

// /*Get all sorted Tags  */
// exports.getAllTagsSortedByColumn = function(req, res) {
//     console.log('Page Controller: entering getAllTagsSortedByColumn');
//     var itemsPerPage = parseInt(req.params.itemsPerPage);
//     var pageNo = parseInt(req.params.pageNo);
//     var colname = req.params.colname;
//     var orderBy = req.params.orderBy;
//     var offset = itemsPerPage * (pageNo - 1);

//     var order = colname + " " + orderBy;
//     console.log("offset is " + offset);
//     /* Query DB using sequelize api for all Tags*/
//     Tag.findAll({
//         offset: offset,
//         limit: itemsPerPage,
//         order: order
//     }).then(function(tags) {
//         /*Return an array of Tags */
//         res.jsonp(tags);
//     }).catch(function(err) {
//         console.log('could not fetch all Tags for sorting');
//         console.log('err: %j', err);
//     });
// }; /*End of getAllTagsSortedByColumn*/

// /*Get all filtered Tags */
// exports.getAllTagsFilteredByColumn = function(req, res) {
//     console.log('Page Controller: entering getAllTagsFilteredByColumn');
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
//     Tag.findAll(criteria).then(function(tags) {
//         /*Return an array of pages */
//         res.jsonp(tags);
//     }).catch(function(err) {
//         console.log('could not fetch all Tags for filtering');
//         console.log('err: %j', err);
//     });
// }; /*End of getAllTagsFilteredByColumn*/


// /*Get all Tags by search text */
// exports.getAllTagsBySearchText = function(req, res) {
//     console.log('Tag Controller: entering getAllTagsBySearchText');
//     var itemsPerPage = parseInt(req.params.itemsPerPage);
//     var pageNo = parseInt(req.params.pageNo);
//     var offset = itemsPerPage * (pageNo - 1);
//     console.log("offset is " + offset);
//     var searchText = req.params.searchText;
//     var like = "%" + searchText + "%";
//     var criteria = {
//         where: Sequelize.where(Sequelize.fn("concat", Sequelize.col('id'),Sequelize.col('name')), {
//             like: like
//         })
//     };
//     criteria['offset'] = offset;
//     criteria['limit'] = itemsPerPage;

//     /* Query DB using sequelize api for all tags*/
//     Tag.findAll(criteria).then(function(tags) {
//         /*Return an array of pages */
//         res.jsonp(tags);
//     }).catch(function(err) {
//         console.log('could not fetch all tags for search');
//         console.log('err: %j', err);
//     });
// }; /*End of getAllTagsBySearchText*/