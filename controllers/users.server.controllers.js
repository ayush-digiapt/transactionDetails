/*Beans Copyright info*/

const lib = require('../lib');
const db = require('../db/db').sequelize;
var config = require('config');



/*Helper Functions*/
var User =require("../service/users");

/*
 ** Beans generated CRR*UD controller methods.
 */


exports.login = lib.asyncMiddleware(async(req, res, next) => {
    console.log("Inside loging API\n");
    try {
        /*Async await*/
        var email= req.body.email;
        var password=req.body.password;
      
       var  data = await User.login(email,password);
       
 
        if(data===null){
            
        return res.status(401).send({status:401, message:"login fail"});
        }
        else{
            var uid=data.id;
            var name=data.name;
          
           return res.status(200).send({status:200 , uid:uid, name:name, message:"login successfully done"});
             
        }
    } catch (err) {
        console.log("Error\t", err);
        return res.status(400).send("Server Error");
    }
});

/*Create users record.*/
exports.createUser = function(req, res) {
    // Log entry.
    console.log('User Controller: entering createUser ');

    var v = new lib.Validator ("name:string,email:string,password:string");

    if (!v.run(req.body)) {
        return res.status(400).send({
            error: v.errors
        });
    }

    User.create({
        id : req.body.id,
				name : req.body.name,
				email : req.body.email,
				password : req.body.password
    }).then(function(result) {
        console.log('created users', result);
        res.jsonp(result);
    }).catch(function(err) {
        console.log('Could not create users record');
        console.log('err: %j', err);
    });

} /*End of createUser*/


/*Get a single users */
exports.getUser = function(req, res) {
    var users_id = req.params.users_id;
    console.log('User Controller: entering getUser ');
    /*Validate for a null id*/
    if (!users_id) {
        res.status(400).send("users ID is null");
        return;
    }
    /* Query DB using sequelize api for a single users*/
    User.findOne({
        where: {
            id: users_id
        }
    }).then(function(users) {
        console.log(users);
        res.jsonp(users);
    }).catch(function(err) {
        console.log('could not fetch users');
        console.log('err: %j', err);
    });
} /*End of getUser*/

/*Get all Users */
exports.getAllUsers = function(req, res) {
    console.log('User Controller: entering getAllUsers');
    /* Query DB using sequelize api for all Users*/
    User.findAll().then(function(users) {
        /*Return an array of Users */
        res.jsonp(users);
    }).catch(function(err) {
        console.log('could not fetch all users');
        console.log('err: %j', err);
    });
}; /*End of getAllUsers*/


/*Update users record.*/
exports.updateUser = function(req, res) {
    // Log entry.
    console.log('User Controller: entering updateUser ');

    var users_id = req.params.users_id;
    User.update({
        id : req.body.id,
				name : req.body.name,
				email : req.body.email,
				password : req.body.password
    }, {
        where: {
            /* users table primary key */
            id: users_id
        }
    }).then(function(result) {
        console.log('updated users', result);
        res.send("users updated successfully");
    }).catch(function(err) {
        console.log('Could not update users record');
        console.log('err: %j', err);
    });

} /*End of updateUser*/

/*Delete a single user */
exports.deleteUser = function(req, res) {
    console.log('User Controller: entering deleteUser ');

    var users_id = req.params.users_id;
    /*Validate for a null users_id*/
    if (!users_id) {
        res.status(400).send("users ID is null");
        return;
    }
    /* Delete users record*/
    User.destroy({
        where: {
            id: users_id
        }
    }).then(function(user) {
        console.log(user);
        res.jsonp(user);
    }).catch(function(err) {
        console.log('could not delete user');
        console.log('err: %j', err);

    });
} /*End of deleteUser*/


/*Get all Users for pagination */
exports.getAllUsersForPagination = function(req, res) {
    console.log('User Controller: entering getAllUsersForPagination');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all Users*/
    User.findAll({
        offset: offset,
        limit: itemsPerPage
    }).then(function(users) {
        /*Return an array of users */
        res.jsonp(users);
    }).catch(function(err) {
        console.log('could not fetch all users for pagination');
        console.log('err: %j', err);
    });
}; /*End of getAllUsersForPagination*/

/*Get all sorted Users  */
exports.getAllUsersSortedByColumn = function(req, res) {
    console.log('Page Controller: entering getAllUsersSortedByColumn');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var colname = req.params.colname;
    var orderBy = req.params.orderBy;
    var offset = itemsPerPage * (pageNo - 1);

    var order = colname + " " + orderBy;
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all Users*/
    User.findAll({
        offset: offset,
        limit: itemsPerPage,
        order: order
    }).then(function(users) {
        /*Return an array of Users */
        res.jsonp(users);
    }).catch(function(err) {
        console.log('could not fetch all Users for sorting');
        console.log('err: %j', err);
    });
}; /*End of getAllUsersSortedByColumn*/

/*Get all filtered Users */
exports.getAllUsersFilteredByColumn = function(req, res) {
    console.log('Page Controller: entering getAllUsersFilteredByColumn');
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
    User.findAll(criteria).then(function(users) {
        /*Return an array of pages */
        res.jsonp(users);
    }).catch(function(err) {
        console.log('could not fetch all Users for filtering');
        console.log('err: %j', err);
    });
}; /*End of getAllUsersFilteredByColumn*/


/*Get all Users by search text */
exports.getAllUsersBySearchText = function(req, res) {
    console.log('User Controller: entering getAllUsersBySearchText');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    var searchText = req.params.searchText;
    var like = "%" + searchText + "%";
    var criteria = {
        where: Sequelize.where(Sequelize.fn("concat", Sequelize.col('id'),Sequelize.col('name'),Sequelize.col('email'),Sequelize.col('password')), {
            like: like
        })
    };
    criteria['offset'] = offset;
    criteria['limit'] = itemsPerPage;

    /* Query DB using sequelize api for all users*/
    User.findAll(criteria).then(function(users) {
        /*Return an array of pages */
        res.jsonp(users);
    }).catch(function(err) {
        console.log('could not fetch all users for search');
        console.log('err: %j', err);
    });
}; /*End of getAllUsersBySearchText*/