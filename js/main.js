
/**
 * main.js
 */

var helpers = require('./helpers.js');


module.exports = new function(){

	this.data =  null;

	this.search = null;

	this.limit = 30; // by default 39

	this.offset = 0; // by default 0

	this.colHeaders = [];

	this.init = function() {

		// used for search, result data and pagination
		this.search = helpers.urlParam('search');
		this.limit = helpers.urlParam('limit');
		this.offset = helpers.urlParam('offset');

		module.exports.ready();
	}

	this.ready = function() {

		console.log(this.search);
	}

	this.generateTable = function() {
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
	}

}

module.exports.init();
