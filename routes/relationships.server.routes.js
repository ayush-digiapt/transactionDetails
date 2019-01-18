/*Beans Copyright info*/
var express = require('express');
var router = express.Router();
var Relationship = require('../controllers/relationships.server.controllers');
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data


/* BEANS code generated for CRR*UD. */

/*Create relationships record*/
router.post('/', upload.array(), /*auth.isAuthenticated,*/ Relationship.createRelationship);

/*Get single relationships*/
router.get('/:relationships_id' , Relationship.getRelationship);

/*Get all Relationships.*/
router.get('/' , Relationship.getAllRelationships);

/*Update an relationships record*/
router.post('/:relationships_id', upload.array(), /*auth.isAuthenticated,*/ Relationship.updateRelationship);

/*Delete relationships */
router.delete('/:relationships_id', /*auth.isAuthenticated,*/ Relationship.deleteRelationship);

/*For pagination*/
router.get('/:itemsPerPage/:pageNo' , Relationship.getAllRelationshipsForPagination);

/*For sorting*/
router.get('/sort/:itemsPerPage/:pageNo/:colname/:orderBy' , Relationship.getAllRelationshipsSortedByColumn);

/*For filtering*/
router.get('/filter/:itemsPerPage/:pageNo/:colname/:filterText' , Relationship.getAllRelationshipsFilteredByColumn);

/*For Searching*/
router.get('/search/:itemsPerPage/:pageNo/:colname/:searchText' , Relationship.getAllRelationshipsBySearchText);



module.exports = router;
