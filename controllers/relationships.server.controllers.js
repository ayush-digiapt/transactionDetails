/*Beans Copyright info*/

const lib = require('../lib');
const db = require('../db/db').sequelize;
var config = require('config');



/*Helper Functions*/
var Relationship =require("../service/relationships");

/*
 ** Beans generated CRR*UD controller methods.
 */

/*Create relationships record.*/
exports.createRelationship = function(req, res) {
    // Log entry.
    console.log('Relationship Controller: entering createRelationship ');

    var v = new lib.Validator ("tid:number,tagid:number");

    if (!v.run(req.body)) {
        return res.status(400).send({
            error: v.errors
        });
    }

    Relationship.create({
        id : req.body.id,
				tid : req.body.tid,
				tagid : req.body.tagid
    }).then(function(result) {
        console.log('created relationships', result);
        res.jsonp(result);
    }).catch(function(err) {
        console.log('Could not create relationships record');
        console.log('err: %j', err);
    });

} /*End of createRelationship*/


/*Get a single relationships */
exports.getRelationship = function(req, res) {
    var relationships_id = req.params.relationships_id;
    console.log('Relationship Controller: entering getRelationship ');
    /*Validate for a null id*/
    if (!relationships_id) {
        res.status(400).send("relationships ID is null");
        return;
    }
    /* Query DB using sequelize api for a single relationships*/
    Relationship.findOne({
        where: {
            id: relationships_id
        }
    }).then(function(relationships) {
        console.log(relationships);
        res.jsonp(relationships);
    }).catch(function(err) {
        console.log('could not fetch relationships');
        console.log('err: %j', err);
    });
} /*End of getRelationship*/

/*Get all Relationships */
exports.getAllRelationships = function(req, res) {
    console.log('Relationship Controller: entering getAllRelationships');
    /* Query DB using sequelize api for all Relationships*/
    Relationship.findAll().then(function(relationships) {
        /*Return an array of Relationships */
        res.jsonp(relationships);
    }).catch(function(err) {
        console.log('could not fetch all relationships');
        console.log('err: %j', err);
    });
}; /*End of getAllRelationships*/


/*Update relationships record.*/
exports.updateRelationship = function(req, res) {
    // Log entry.
    console.log('Relationship Controller: entering updateRelationship ');

    var relationships_id = req.params.relationships_id;
    Relationship.update({
        id : req.body.id,
				tid : req.body.tid,
				tagid : req.body.tagid
    }, {
        where: {
            /* relationships table primary key */
            id: relationships_id
        }
    }).then(function(result) {
        console.log('updated relationships', result);
        res.send("relationships updated successfully");
    }).catch(function(err) {
        console.log('Could not update relationships record');
        console.log('err: %j', err);
    });

} /*End of updateRelationship*/

/*Delete a single relationship */
exports.deleteRelationship = function(req, res) {
    console.log('Relationship Controller: entering deleteRelationship ');

    var relationships_id = req.params.relationships_id;
    /*Validate for a null relationships_id*/
    if (!relationships_id) {
        res.status(400).send("relationships ID is null");
        return;
    }
    /* Delete relationships record*/
    Relationship.destroy({
        where: {
            id: relationships_id
        }
    }).then(function(relationship) {
        console.log(relationship);
        res.jsonp(relationship);
    }).catch(function(err) {
        console.log('could not delete relationship');
        console.log('err: %j', err);

    });
} /*End of deleteRelationship*/


/*Get all Relationships for pagination */
exports.getAllRelationshipsForPagination = function(req, res) {
    console.log('Relationship Controller: entering getAllRelationshipsForPagination');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all Relationships*/
    Relationship.findAll({
        offset: offset,
        limit: itemsPerPage
    }).then(function(relationships) {
        /*Return an array of relationships */
        res.jsonp(relationships);
    }).catch(function(err) {
        console.log('could not fetch all relationships for pagination');
        console.log('err: %j', err);
    });
}; /*End of getAllRelationshipsForPagination*/

/*Get all sorted Relationships  */
exports.getAllRelationshipsSortedByColumn = function(req, res) {
    console.log('Page Controller: entering getAllRelationshipsSortedByColumn');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var colname = req.params.colname;
    var orderBy = req.params.orderBy;
    var offset = itemsPerPage * (pageNo - 1);

    var order = colname + " " + orderBy;
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all Relationships*/
    Relationship.findAll({
        offset: offset,
        limit: itemsPerPage,
        order: order
    }).then(function(relationships) {
        /*Return an array of Relationships */
        res.jsonp(relationships);
    }).catch(function(err) {
        console.log('could not fetch all Relationships for sorting');
        console.log('err: %j', err);
    });
}; /*End of getAllRelationshipsSortedByColumn*/

/*Get all filtered Relationships */
exports.getAllRelationshipsFilteredByColumn = function(req, res) {
    console.log('Page Controller: entering getAllRelationshipsFilteredByColumn');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var colname = req.params.colname;
    var filterText = req.params.filterText;
    var offset = itemsPerPage * (pageNo - 1);
    var criteria = {};
    var whereCl = {};
    whereCl[colname] = filterText;

    criteria['where'] = whereCl;

    criteria['offset'] = offset;
    criteria['limit'] = itemsPerPage;

    console.log("offset is " + offset);
    /* Query DB using sequelize api for all Pages offset : offset , limit : itemsPerPage ,order : order ,*/
    Relationship.findAll(criteria).then(function(relationships) {
        /*Return an array of pages */
        res.jsonp(relationships);
    }).catch(function(err) {
        console.log('could not fetch all Relationships for filtering');
        console.log('err: %j', err);
    });
}; /*End of getAllRelationshipsFilteredByColumn*/


/*Get all Relationships by search text */
exports.getAllRelationshipsBySearchText = function(req, res) {
    console.log('Relationship Controller: entering getAllRelationshipsBySearchText');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    var searchText = req.params.searchText;
    var like = "%" + searchText + "%";
    var criteria = {
        where: Sequelize.where(Sequelize.fn("concat", Sequelize.col('id'),Sequelize.col('tid'),Sequelize.col('tagid')), {
            like: like
        })
    };
    criteria['offset'] = offset;
    criteria['limit'] = itemsPerPage;

    /* Query DB using sequelize api for all relationships*/
    Relationship.findAll(criteria).then(function(relationships) {
        /*Return an array of pages */
        res.jsonp(relationships);
    }).catch(function(err) {
        console.log('could not fetch all relationships for search');
        console.log('err: %j', err);
    });
}; /*End of getAllRelationshipsBySearchText*/