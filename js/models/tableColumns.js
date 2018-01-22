
/**
 * tableColumns.js
 */

var database = require('./../db.js');

var helpers = require('./../helpers.js');

module.exports = {

	thisModel: null,
	count: 0,

	init: function() {

		var that = this;
		
		
	},

	/**
	 * create data
	 * 
	 * @param  {object} data 
	 * @return {boolean}
	 */
	create: function(data) {

		var _this = this;

		if ( typeof data.alias === 'undefined' ) {
			swal('error', 'Unable to save new column', 'Error');
			return false;
		}

		database( function(err, db) {
		  	if (err) throw err;

			data.name = data.alias.replace(' ', '');

			var tableColumnsModel = db.models.tableColumns

			tableColumnsModel.find({ alias: data.alias }, function(err, res) {
				if (err) {
		  			swal('error', err.msg, 'Error');
		  			return false;
	  			}

	  			if ( res.length != 0 ) {
	  				swal('error', 'Column name should be unique', 'Error');
	  				return false;
	  			} 

	  			tableColumnsModel.count(null, function(err, count) {
					if (err) {
			  			swal('error', err.msg, 'Error');
			  			return false;
		  			}

					var createData = {
						name: data.name,
						alias: data.alias,
						position: count + 1, // increment the position
						status: data.status ? 1 : 0,
						created_at: helpers.epochDateTime()
					};

				  	tableColumnsModel.create( createData, function(err, rows) {
			  			if (err) {
			  				swal('error', err.msg, 'Error');
			  				return false;
			  			}

				  	}); // tableColumnsModel.create()

				}); // tableColumnsModel.count()

			}); // tableColumnsModel.find(()

			return true;

		}); // database()

	}, // create()

	/**
	 * delete data
	 * 
	 * @param  {object} data 
	 * @return {boolean}
	 */
	delete: function(id) {

		if ( typeof id === 'undefined' )
			return false;

		database( function(err, db) {
		  	if (err) throw err;

			var tableColumnsModel = db.models.tableColumns;

			tableColumnsModel.one( {id: id}, function(err, res) {
				if (err) throw err;
				
				res.remove();
			});

		}); // database()

	}, // delete()

}; // module.exports()
