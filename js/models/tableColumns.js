
/**
 * tableColumns.js
 */

var db = require('./../db.js');

module.exports = {
	
	model: function() {

		return db.define('person', {
			id:      {type: 'serial', key: true}, // the auto-incrementing primary key
			name:    {type: 'text'},
			alias: {type: 'text'},
			position:     {type: 'number'},
			status: {type:'boolean'},
			created_at {type: 'date'},
			updated_at {type: 'date'},
		}, {
			methods : {
				
			}
		});
	}

};
