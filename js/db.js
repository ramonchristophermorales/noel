
/**
 * db.js
 */

let orm = require('orm');

var config = require('./config.js');

function setup(db) {

	var TableColumns = db.define('tableColumns', {
		id:      {type: 'serial', key: true}, // the auto-incrementing primary key
		name:    {type: 'text'},
		alias: {type: 'text'},
		position:     {type: 'number'},
		status: {type:'boolean'},
		created_at: {type: 'date'},
		updated_at: {type: 'date'}
	}, {
		methods : {
			
		},
		validations: {
		}
	});
	TableColumns.sync();

	// other models

} // setup()


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

		setup(db);
		cb(null, db);
	});  

} // moduel.exports
