
/**
 * db.js
 */

let orm = require('orm');

let config = require('./config.js');

function setup(db) {

	var TableColumns = db.define('tableColumns', {
		id:      {type: 'serial', key: true}, // the auto-incrementing primary key
		name:    {type: 'text'},
		alias: {type: 'text'},
		status: {type:'boolean'},
		created_at: {type: 'date', time: true},
		updated_at: {type: 'date', time: true}
	}, {
		hooks : {

		},
		validations: {
			name: [
				orm.enforce.required(['Name is required']),
				orm.enforce.ranges.length(1, 255, "Invalid Name")
			],
			alias: [
				orm.enforce.required(['Alias is required']),
				orm.enforce.ranges.length(1, 255, "Invalid Alias"),
				orm.enforce.patterns.match(/^[a-z0-9 ]+$/i, "Alias should only contain blank spaces and alphanumeric characters")
			],
			position: [
				orm.enforce.ranges.number(1, undefined, "Invalid Position")
			],
			status: [
				orm.enforce.ranges.number(0, 1, "Invalid Status")
			],
			created_at: [
				// orm.enforce.patterns.match("/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/", "Invalid Created At")
			],
			updated_at: [
				// orm.enforce.patterns.match("/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/", "Invalid Updated At")
			],
		},
		methods: {

		}
	});
	// TableColumns.sync();
	
	// crate the jExcel table if not exists, will contain all data to jexcel
	db.driver.execQuery(" CREATE TABLE IF NOT EXISTS "+ config.tableName +" ( id INT(7) UNSIGNED AUTO_INCREMENT PRIMARY KEY ) ", function(err,res) {
		if (err) {
  			swal('Error', err.msg, 'warning');
		}
	});

	db.syncPromise();
} // setup()

/**
 * @param  {Function} cb [errorMsg, dbInstance]
 * @return {[type]}      [description]
 */
module.exports = function(cb){

	var opts = {
		host:     config.dbhost,
		database: config.dbname,
		user: config.dbuser,
		password: config.dbpass,
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
