
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
		created_at: {type: 'date'},
		updated_at: {type: 'date'}
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
				orm.enforce.patterns.match(/^[a-z0-9/s]+$/ig, "Alias should only contain blank spaces and alphanumeric characters")
			],
			position: [
				orm.enforce.ranges.number(1, undefined, "Invalid Position")
			],
			status: [
				orm.enforce.ranges.number(0, 1, "Invalid Status")
			],
			crated_at: [
				orm.enforce.patterns.match("/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/", "Invalid Created At")
			],
			updated_at: [
				orm.enforce.patterns.match("/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/", "Invalid Updated At")
			],
		},
		methods: {
			countAll: function() {
				tableColumnsModel.count(null, function(err, rows) {
					return rows;
				});
			}
		}
	});
	// TableColumns.sync();

	db.syncPromise();

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
