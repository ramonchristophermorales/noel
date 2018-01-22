
/**
 * settings.js
 * https://angularfirebase.com/lessons/desktop-apps-with-electron-and-angular/
 */

var database = require('./db.js');
var tableColumns = require('./models/tableColumns.js');
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
			e.preventDefault();
			_this.cancelFormAddRow();
		});

		this.settings.btn_add.on('click', function(e) {
			_this.showFormAddRow();
		});

		this.settings.btn_cancel.on('click', function(e) {
			e.preventDefault();
			_this.cancelFormEditRow( $(this) );
		});

	}; // ready()

	this.showTable = function() {

		var _this = this;

		database( function(err, db) {
		  	if (err) throw err;

			var tableColumnsModel = db.models.tableColumns;

			tableColumnsModel.find( {}, {order: 'id' }, function(err, res) {

				if (err) {
		  			swal('error', err.msg, 'Error');
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

	  			// _this.settings.table.find('tbody').find('tr:not(.jexcel-form-add-row').remove();

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

	}; // executeFormAction()

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
				tableColumns.delete(id);
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

		btn_cancel_parent
			.find('[name="id"]')
			.val( null )
		;

		btn_cancel_parent
			.find('[name="alias"]')
			.val( null )
			.addClass('hide')
		;

		btn_cancel_parent.find('.text-container').removeClass('hide');
		btn_cancel_parent.find('.btn-edit').removeClass('hide');
		btn_cancel_parent.find('.btn-delete').removeClass('hide');
		btn_cancel_parent.find('.btn-update').addClass('hide');
		btn_cancel_parent.find('.btn-cancel').addClass('hide');

		this.settings.btn_add.attr('disabled', false);

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

		this.settings.btn_add.attr('disabled', true);
		this.settings.find(':not(.btn-update)').attr('disabled');

	}; // showFormEditRow()

		/**
	 * cancel the from add row
	 */
	this.cancelFormAddRow = function() {

		this.settings.form_add_row.addClass('hide');

		this.settings.btn_edit.attr('disabled', false);
		this.settings.btn_delete.attr('disabled', false);

	}; // cancelFromAddRow()

	/**
	 * show the form, new row contains input box and some buttons
	 */
	this.showFormAddRow = function() {

		this.settings.form_add_row.removeClass('hide');

		this.settings.btn_edit.attr('disabled', true);
		this.settings.btn_delete.attr('disabled', true);

		var formTemplate = $(this.settings.formTemplate);

		this.settings.form_add_row.find('.settingsFormContainer').html(formTemplate.html());

	}; // showNewColumnForm()

	/**
	 * dding new column for the jexcel or main table through ajax
	 * @param  {object} obj - button initiator
	 */
	this.addNewColumn = function(obj) {

		var data = {
			alias: this.settings.form_add_row.find('input[name="alias"]').val()
		};

		tableColumns.create(data);

	}; // sendAddNewColumn()

	this.init();

} // settings
