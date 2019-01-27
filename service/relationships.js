const lib = require('../lib');
const db = require('../db/db').sequelize;
var config = require('config');
var randomToken = require('random-token');

/*Importing the Sequelize models*/
var Relationship = db.import("../models/relationships");


