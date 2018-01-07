
/**
 * db.js
 */

let orm = require('orm');

var config = require('./config.js');


/**
 * @param  {Function} cb [errorMsg, dbInstance]
 * @return {[type]}      [description]
 */
module.exports = function(cb){

	var opts = {
		host:     config.dbhost,
		database: config.dbname,
		protocol: config.dbprotocol,
		port:     config.dbport,
		query:    {pool: true}
	};

	orm.connect(opts, function(err, db) {
		if( err )
			cb(err);

		cb(null, db);
	});  

} // moduel.exports
