/*Beans Copyright info*/
var express = require('express');
var router = express.Router();
var Tag = require('../controllers/tags.server.controllers');
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data


/* BEANS code generated for CRR*UD. */

// /*Create tags record*/
// router.post('/', upload.array(), /*auth.isAuthenticated,*/ Tag.createTag);

router.post('/add/:id', Tag.createTag);


// /*Get single tags*/
// router.get('/:tags_id' , Tag.getTag);

// /*Get all Tags.*/
// router.get('/' , Tag.getAllTags);

// /*Update an tags record*/
// router.post('/:tags_id', upload.array(), /*auth.isAuthenticated,*/ Tag.updateTag);

// /*Delete tags */
// router.delete('/:tags_id', /*auth.isAuthenticated,*/ Tag.deleteTag);

// /*For pagination*/
// router.get('/:itemsPerPage/:pageNo' , Tag.getAllTagsForPagination);

// /*For sorting*/
// router.get('/sort/:itemsPerPage/:pageNo/:colname/:orderBy' , Tag.getAllTagsSortedByColumn);

// /*For filtering*/
// router.get('/filter/:itemsPerPage/:pageNo/:colname/:filterText' , Tag.getAllTagsFilteredByColumn);

// /*For Searching*/
// router.get('/search/:itemsPerPage/:pageNo/:colname/:searchText' , Tag.getAllTagsBySearchText);



module.exports = router;
