
/**
 * settings.js
 * https://angularfirebase.com/lessons/desktop-apps-with-electron-and-angular/
 */

let config = require('./config.js');

var database = require('./db.js');

var helpers = require('./helpers');
 
module.exports = new function() {

	var tableColumnsData = null;

	this.init = function() {


		this.settings = $('#app-settings');
		this.settings.btn_add = this.settings.find('#btn-add-new');
		this.settings.btn_edit = this.settings.find('.btn-edit');
		this.settings.btn_cancel = this.settings.find('.btn-cancel');
		this.settings.btn_delete = this.settings.find('.btn-delete');
		this.settings.table = this.settings.find('.table');

		this.settings.form_add_row = $('tr#jexcel-form-add-row');
		this.settings.form_add_row.btn_submit = this.settings.form_add_row.find('.btn-submit');
		this.settings.form_add_row.btn_cancel = this.settings.form_add_row.find('.btn-cancel');

		this.settings.formTemplate = '<div>' +	
			'<input type="hidden" name="id" value="">' +
			'<input type="text" name="alias" class="form-control" value="" placeholder="Type new column name">' +
		'<div>';

		this.settings.formActionTemplate = '' +
			'<button class="btn btn-success btn-edit" type="button" data-id="" data-alias="">Edit</button>&nbsp;' +
			'<button class="btn btn-danger btn-delete" data-id="" data-alias="">Delete</button>&nbsp;' +
			'<button class="btn btn-success btn-update hide" type="submit">Update</button>&nbsp;' +
			'<button class="btn btn-danger btn-cancel hide" type="button">Cancel</button>'
		;
		this.ready();
	}; // init()

	this.ready = function() {

		var _this = this;	

		this.showTable();


		this.settings.form_add_row.btn_submit.on('click', function(e) {
			_this.addNewColumn();
		});

		this.settings.form_add_row.btn_cancel.on('click', function(e) {
			_this.cancelFormAddRow();
		});

		this.settings.btn_add.on('click', function(e) {
			_this.showFormAddRow();
		});

		// this.settings.find('.btn-cancel').on('click', function(e) {
		// 	_this.cancelFormEditRow( $(this) );
		// });

	}; // ready()

	this.showTable = function() {

		var _this = this;

		database( function(err, db) {

		  	if (err) {
	  			swal('Error', typeof err.msg !== 'undefined' ? err.msg : 'Something went wrong.' , 'warning');
	  			return false;
  			}

			var tableColumnsModel = db.models.tableColumns;

			tableColumnsModel.find( {}, {order: 'id' }, function(err, res) {

				if (err) {
		  			swal('Error', typeof err.msg !== 'undefined' ? err.msg : 'Something went wrong.' , 'warning');
		  			return false;
	  			}

	  			_this.tableColumnsData = res;

	  			var html = '';
	  			$.each(res, function(i,v) {

	  				var template = _this.settings.formActionTemplate.replace('data-id=""', 'data-id="'+ v.id +'"');

	  				html += '' +
	  					'<tr class="jexcel-item" data-id="'+ v.id +'" data-alias="'+ v.alias +'">' +
	  						'<td class="alias">' + v.alias + '</td>' +
	  						'<td>' + template + '</td>' +
  						'</tr>'
	  				;
	  			});

	  			_this.settings.table.find('tbody').find('tr:not(#jexcel-form-add-row)').remove();

	  			_this.settings.table.find('tbody')
	  				.prepend( html )
	  				.on('click', '.btn', function() {
	  					_this.executeFormAction(this);
	  				})
  				;
			});
		}); // database()

	}; // showTable()

	this.executeFormAction = function(btn_obj) {

		var btn = $(btn_obj);

		if ( btn.hasClass('btn-edit') ) {
			this.showFormEditRow(btn);
		}

		if ( btn.hasClass('btn-delete') ) {
			this.deleteFromRow(btn);
		}

		if ( btn.hasClass('btn-cancel') ) {
			this.cancelFormEditRow(btn);
		}

		if ( btn.hasClass('btn-update') ) {
			this.updateFormEditRow(btn);
		}

	}; // executeFormAction()

	/**
	 * update the form edit row
	 * 
	 * @param  {object} btn_update 
	 */
	this.updateFormEditRow = function(btn_update) {

		var _this = this;

		if ( typeof btn_update !== 'object')
			return false;

		var parent = btn_update.parents('tr.jexcel-item');

		var id = parent.attr('data-id');

		var alias = parent.find('input').val();

		database( function(err, db) {
		  	if (err) {
	  			swal('Error', typeof err.msg !== 'undefined' ? err.msg : 'Something went wrong.' , 'warning');
	  			return false;
  			}

			var tableColumnsModel = db.models.tableColumns;

			tableColumnsModel.one( {id: id}, function(err, res) {
				if (err) {
		  			swal('Error', typeof err.msg !== 'undefined' ? err.msg : 'Something went wrong.' , 'warning');
		  			return false;
	  			}

	  			var prevName = res.name;
	  			var prevAlias = res.name;

	  			res.alias = alias;
	  			res.name = alias.replace(' ', '');
	  			res.updated_at =  helpers.epochDateTime();

	  			res.save(function(err) {
	  				if (err) {
			  			swal('Error', typeof err.msg !== 'undefined' ? err.msg : 'Something went wrong.' , 'warning');
			  			return false;
		  			}

		  			// add the column to jexcel table
		  			var sql = " ALTER TABLE `" + config.tableName + "` CHANGE `" + prevName + "` `" + res.name + "` TEXT(1000) NULL";

		  			// @todo here
		  			db.driver.execQuery( sql , function(err,res1) {

						// if (err) {
				  // 			swal('Error', typeof err.msg !== 'undefined' ? err.msg : 'Something went wrong.' , 'warning');
				  // 			res.alias = prevName;
				  // 			res.name = prevAlias;
				  // 			res.save(function(err) {
				  				
				  // 			});
						// }
					});

		  			_this.showTable();
	  			});
			}); // tableColumnsModel

		}); // database()

	}; // updateFormEditRow()

	/**
	 * show the modal delete, then redirect to delete url
	 */
	this.deleteFromRow = function(btn_delete) {

		if ( typeof btn_delete !== 'object')
			return false;

		var _this = this;

		var parent = btn_delete.parents('.jexcel-item')

		var alias = parent.attr('data-alias');

		var id = parent.attr('data-id');

		swal({
			title: "Are you sure?",
			text: 'Delete "'+ alias +'" column?',
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
		.then((r) => {
			if (r) {
				
				if ( typeof id === 'undefined' )
					return false;

				database( function(err, db) {
				  	if (err) {
			  			swal('Error', typeof err.msg !== 'undefined' ? err.msg : 'Something went wrong.' , 'warning');
			  			return false;
		  			}

					var tableColumnsModel = db.models.tableColumns;

					tableColumnsModel.one( {id: id}, function(err, res) {
						if (err) {
				  			swal('Error', typeof err.msg !== 'undefined' ? err.msg : 'Something went wrong.' , 'warning');
				  			return false;
			  			}
						
						res.remove();

						_this.showTable();
					});

				}); // database()
			} 
		});

	}; // deleteFromRow()

	/**
	 * cancel the currently editing row
	 * 
	 * @param  {object} btn_cancel 
	 */
	this.cancelFormEditRow = function(btn_cancel) {

		if ( typeof btn_cancel !== 'object' )
			return false;

		var btn_cancel_parent = btn_cancel.parents('.jexcel-item');

		var alias = btn_cancel_parent.attr('data-alias');

		btn_cancel_parent.find('.alias').html(alias);

		btn_cancel_parent.find('.btn-edit').removeClass('hide');
		btn_cancel_parent.find('.btn-delete').removeClass('hide');
		btn_cancel_parent.find('.btn-update').addClass('hide');
		btn_cancel_parent.find('.btn-cancel').addClass('hide');

		this.settings.find('.btn-edit').attr('disabled', false);
		this.settings.find('.btn-delete').attr('disabled', false);

		this.settings.find('.btn-add').attr('disabled', false);
		this.settings.find(':not(.btn-update)').attr('disabled', false);

	}; // cancelFormEditRow()

	/**
	 * show the edit form of the selected row item
	 *
	 * @param  {object} btn_cancel 
	 */
	this.showFormEditRow = function(btn_edit) {

		if ( typeof btn_edit !== 'object' )
			return false;

		var btn_edit_parent = btn_edit.parents('.jexcel-item');

		var alias = btn_edit_parent.attr('data-alias');

		btn_edit_parent.find('.alias').html('<input type="text" class="form-control" value="' + alias +'">');

		btn_edit_parent.find('.btn-edit').addClass('hide');
		btn_edit_parent.find('.btn-delete').addClass('hide');
		btn_edit_parent.find('.btn-update').removeClass('hide');
		btn_edit_parent.find('.btn-cancel').removeClass('hide');

		this.settings.find('.btn-edit').attr('disabled', true);
		this.settings.find('.btn-delete').attr('disabled', true);

		this.settings.find('.btn-add').attr('disabled', true);
		// this.settings.find(':not(.btn-update)').attr('disabled', true);

	}; // showFormEditRow()

		/**
	 * cancel the from add row
	 */
	this.cancelFormAddRow = function() {

		this.settings.form_add_row.addClass('hide');

		this.settings.find('.btn-edit').attr('disabled', false);
		this.settings.find('.btn-delete').attr('disabled', false);

	}; // cancelFormAddRow()

	/**
	 * show the form, new row contains input box and some buttons
	 */
	this.showFormAddRow = function() {

		this.settings.form_add_row.removeClass('hide');

		this.settings.find('.btn-edit').attr('disabled', true);
		this.settings.find('.btn-delete').attr('disabled', true);

		var formTemplate = $(this.settings.formTemplate);

		this.settings.form_add_row.find('.settingsFormContainer').html(formTemplate.html());

	}; // showNewColumnForm()

	/**
	 * adding new column for the jexcel or main table through ajax
	 * @param  {object} obj - button initiator
	 */
	this.addNewColumn = function(obj) {

		var _this = this;

		var data = {
			alias: this.settings.form_add_row.find('input[name="alias"]').val()
		};

		if ( typeof data.alias === 'undefined' ) {
			swal('Error', 'Unable to save new column', 'warning');
			return false;
		}

		database( function(err, db) {
		  	if (err) {
	  			swal('Error', typeof err.msg !== 'undefined' ? err.msg : 'Something went wrong.' , 'warning');
	  			return false;
  			}

			data.name = data.alias.replace(' ', '');

			var tableColumnsModel = db.models.tableColumns

			tableColumnsModel.find({ alias: data.alias }, function(err, res) {
				if (err) {
		  			swal('Error', typeof err.msg !== 'undefined' ? err.msg : 'Something went wrong.' , 'warning');
		  			return false;
	  			}

	  			if ( res.length != 0 ) {
	  				swal('Invalid', 'Column name should be unique', 'warning');
	  				return false;
	  			} 

	  			tableColumnsModel.count(null, function(err, count) {
					if (err) {
			  			swal('Invalid', err.msg, 'warning');
			  			return false;
		  			}

					var createData = {
						name: data.name,
						alias: data.alias,
						position: count + 1, // increment the position
						status: data.status ? 1 : 0,
						created_at: helpers.epochDateTime(),
						updated_at: helpers.epochDateTime()
					};

				  	tableColumnsModel.create( createData, function(err, row) {
			  			if (err) {
			  				swal('Error', typeof err.msg !== 'undefined' ? err.msg : 'Something went wrong.' , 'warning');
			  				return false;
			  			}

			  			// add the column to jexcel table
			  			var sql = " ALTER TABLE `" + config.tableName + "` ADD `" + createData.name + "` TEXT(1000) NULL ";
			  			db.driver.execQuery( sql , function(err,res) {
							if (err) {
					  			swal('Error', typeof err.msg !== 'undefined' ? err.msg : 'Something went wrong.' , 'warning');
					  			tableColumnsModel.one(row.id, function(err, row) {
					  				row.remove();
					  			});
							}
						});

			  			// refresh the table
			  			_this.showTable();

			  			_this.settings.form_add_row.find('input').val(null);
			  			_this.settings.form_add_row.addClass('hide');
				  	}); // tableColumnsModel.create()

				}); // tableColumnsModel.count()

			}); // tableColumnsModel.find(()

			return true;

		}); // database()

	}; // sendAddNewColumn()


	this.init();

} // settings
