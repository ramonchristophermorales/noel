
/**
 * tableColumns.js
 */

var database = require('./../db.js');

module.exports = {

	thisModel: null,

	init: function() {

		this.model();

		console.log(this.thisModel);

		// this.thisModel.find(1, function(err, rows) {
		// 		console.log('dasfdfas');
		// 		if ( err )
		// 			that.createTable();
		// 	});

		// 	if ( !model ) {
		// 		// this.createTable();
		// 		// model = this.model();
		// 	}
	},
	
	model: function() {

		this.thisModel = database(function(err, db) {
			
			if ( err ) {
				throw(err);
			}

			return db.define('tableColumns', {
				id:      {type: 'serial', key: true}, // the auto-incrementing primary key
				name:    {type: 'text'},
				alias: {type: 'text'},
				position:     {type: 'number'},
				status: {type:'boolean'},
				created_at: {type: 'date'},
				updated_at: {type: 'date'}
			}, {
				methods : {
					
				}
			});
		});
	
		this.thisModel.find(1, function(err, rows) {
				console.log('dasfdfas');
				if ( err )
					that.createTable();
			});
	},

	createTable: function() {
			console.log('fireed');
		// db.createTable('testing', {
	 //      id: { type: 'int', primaryKey: true },
	 //      name: 'string'
	 //    }, callback);
	},

};
