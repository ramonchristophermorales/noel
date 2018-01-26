
/**
 * main.js
 */

let config = require('./config.js');
let database = require('./db.js');
let helpers = require('./helpers.js');

module.exports = {

	data: null,

	search: null,

	limit: 30, // by default 39

	offset: 0, // by default 0

	colHeaders: [],

	jExcelConfigData: {
		data: [],
		columns: [],
		colHeaders : [],
		colWidths: []
	},

	init: function() {

		this.jExcelDom = $('#jexcel');

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

		var _this = this;

		database( function(err, db) {
		  	if (err) {
	  			swal('Error', typeof err.msg !== 'undefined' ? err.msg : 'Something went wrong.' , 'warning');
	  			return false;
			}

  			// get the column headers
  			var tableColumnsModel = db.models.tableColumns;

			tableColumnsModel.find({}, function(err, res1) {
				if (err) {
		  			swal('Error', typeof err.msg !== 'undefined' ? err.msg : 'Something went wrong.' , 'warning');
		  			return false;
				}

				var colHeaders = [];
				var colWidths = [];

				$.each(res1, function(i,v) {
					colHeaders.push(v.name);
					colWidths.push( parseInt(v.name.length) * 15  );
				});

				_this.jExcelConfigData.colHeaders = colHeaders;
				_this.jExcelConfigData.colWidths = colWidths;

				var sql = " SELECT * FROM " + config.tableName;

	  			db.driver.execQuery(sql, function(err,res) {
					if (err) {
			  			swal('Error', err.msg, 'warning');
					}

					if ( !res.length ) {
						// _this.jExcelDom.html('<div class="container mr-top-20 pd-top-20">No result found</div>');
						// return;
					}

					_this.generateTable(res)
					// 
				}); // db.driver.execQuery

			}); // tableColumnsModel

  			
		});

	},

	getData: function() {

	},

	generateTable: function(data) {
		
		var _this = this;
		
		// var data = [
		// 	['Furnace',1,10000,'=B1*C1'],
		// 	['Tower',2,6000,'=B2*C2'],
		// 	['Drum',3,5000,'=B3*C3'],
		// 	['Pump',4,4000,'=B4*C4'],
		// 	['Total','=SUM(B1:B4)','=(C1+C2+C3+C4)','=SUM(D1:D4)']
		// ]
		
		// this.jExcelDom.jexcel({
		// 	data:data,
		// 	columns: [
		// 		{ type:'text' },
		// 		{ type:'numeric' },
		// 		{ type:'numeric' },
		// 		{ type:'numeric' },
		// 	],
		// 	colHeaders: ['Equipment','Quantity', 'Price', 'Total'],
		// 	// colWidths: [ 400, 100, 200 ],
		// 	colWidths: [300, 150, 150, 150, 150],
		// });

		this.jExcelConfigData.data = data;

		this.jExcelDom.jexcel( _this.jExcelConfigData );
		
		this.jExcelDom.jexcel('updateSettings', {
			cells: function (cell, col, row) {
				if (col > 0) {
					// value = this.jExcelDom.jexcel('getValue', $(cell));
					// val = numeral($(cell).text()).format('0,0.00');
					// $(cell).html('' + val);
					console.log(cell);
					console.log(col);
					console.log(row);
				}
			}
		});
	},

}

module.exports.init();
