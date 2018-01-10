
/**
 * tableColumns.js
 */

var database = require('./../db.js');

module.exports = {

	thisModel: null,

	init: function() {
		database( function(err, db) {
		  	if (err) throw err;

		});
	},


};
