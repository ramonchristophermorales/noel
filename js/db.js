
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

	if (connections[host] && connections[host][database]) {
		return connections[host][database];
	}

	var opts = {
		host:     config.dbhost,
		database: config.dbname,
		protocol: config.dbprotocol,
		port:     config.dbport,
		query:    {pool: true}
	};

	orm.connect(opts, function(err, db) {
		
		throw(err);

		connections[host] = connections[host] || {};
		connections[host][database] = db;

		return db;
	});  

} // moduel.exports
