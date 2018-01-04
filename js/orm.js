
// /**
//  * orm.js
//  */

// let orm = require('orm');

// var config = require('./config.js');

// module.exports = {

// 	instance: null,

// 	connect: function() {

// 		var opts = {
// 			host:     config.dbhost,
// 			database: config.dbname,
// 			protocol: config.dbprotocol,
// 			port:     config.dbport,
// 			query:    {pool: true}
// 		};

// 		return orm.connectAsync(opts)
// 			.then(function(db) {
// 				console.log('DB connected');
// 			})
// 			.catch(function() {
// 				console.error('Connection error: ' + err);
// 			})
// 		;
// 	},

// 	init: function() {
// 		return module.exports.connect();
// 	},


// 	table: function( tableName ) {

// 		if ( typeof tableName === 'undefined' || tableName.trim() == '' ) {
// 			console.error('Error: undefined table name');
// 			return false;
// 		}

// 			return tableName;
// 	},


// 	find: function( id ) {

// 		if ( typeof id === 'undefined' || id.trim() == '' ) {
// 			console.error('Error: undefined id');
// 			return false;
// 		}


// 	}

// 	findBy: function( columnName, value ) {

// 		if ( typeof id === 'undefined' || id.trim() == '' ) {
// 			console.error('Error: undefined id');
// 		}
// 	}

// } // moduel.exports
