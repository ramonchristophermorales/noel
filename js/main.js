
/**
 * main.js
 */

var database = require('./db.js');

var helpers = require('./helpers.js');

module.exports = {

	data: null,

	search: null,

	limit: 30, // by default 39

	offset: 0, // by default 0

	colHeaders: [],

	init: function() {



		// used for search, result data and pagination
		search = helpers.urlParam('search');
		limit = helpers.urlParam('limit');
		offset = helpers.urlParam('offset');

		module.exports.ready();
	},

	ready: function() {
		var _this = this;
		
		this.showTable();

	},

	showTable: function() {

		database( function(err, db) {
		  	if (err) {
	  			swal('Error', err.msg, 'warning');
	  			return false;
  			}

  			var sql = " SELECT * FROM jExcel";

  			db.driver.execQuery(sql, function(err,res) {
				if (err) {
		  			swal('Error', err.msg, 'warning');
				}

				console.log(res);
			});
		});

	},

	getData: function() {

	},

	generateTable: function() {
		// var data = [
		// 	['Furnace',1,10000,'=B1*C1'],
		// 	['Tower',2,6000,'=B2*C2'],
		// 	['Drum',3,5000,'=B3*C3'],
		// 	['Pump',4,4000,'=B4*C4'],
		// 	['Total','=SUM(B1:B4)','=(C1+C2+C3+C4)','=SUM(D1:D4)']
		// ]
		//
		// $('#my').jexcel({
		// 	data:data,
		// 	columns: [
		// 		{ type:'text' },
		// 		{ type:'numeric' },
		// 		{ type:'numeric' },
		// 		{ type:'numeric' },
		// 	],
		// 	colHeaders: ['Equipment','Quantity', 'Price', 'Total'],
		// 	colWidths: [ 400, 100, 200 ],
		// 	colWidths: [300, 150, 150, 150, 150],
		// });
		//
		// $('#my').jexcel('updateSettings', {
		// 	cells: function (cell, col, row) {
		// 		if (col > 0) {
		// 			value = $('#my').jexcel('getValue', $(cell));
		// 			val = numeral($(cell).text()).format('0,0.00');
		// 			$(cell).html('' + val);
		// 		}
		// 	}
		// });
	},

}

module.exports.init();
