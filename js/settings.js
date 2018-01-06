
/**
 * settings.js
 */
 
module.exports = new function() {

	this.init = function() {

		this.settings = $('#app-settings');
		this.settings.btn_add = this.settings.find('#btn-add-new');
		this.settings.btn_edit = this.settings.find('.btn-edit');
		this.settings.btn_cancel = this.settings.find('.btn-cancel');
		this.settings.btn_delete = this.settings.find('.btn-delete');
		this.settings.table = this.settings.find('.table');

		this.settings.form_add_row = $('tr#jexcel-form-add-row');
		this.settings.form_add_row.btn_cancel = this.settings.form_add_row.find('.btn-submit');
		this.settings.form_add_row.btn_cancel = this.settings.form_add_row.find('.btn-cancel');

		this.settings.formTemplate = '<div>' +	
			'<input type="hidden" name="id" value="">' +
			'<input type="text" name="alias" class="form-control" value="">' +
		'<div>';

		this.ready();
	}; // init()

	this.ready = function() {

		var that = this;	

		// this.showTable();

		this.settings.form_add_row.btn_cancel.on('click', function(e) {
			e.preventDefault();
			that.cancelFormAddRow();
		});

		this.settings.btn_add.on('click', function(e) {
			e.preventDefault();
			that.showFormAddRow();
		});

		this.settings.btn_edit.on('click', function(e) {
			e.preventDefault();
			that.showFormEditRow( $(this) );
		});

		this.settings.btn_cancel.on('click', function(e) {
			e.preventDefault();
			that.cancelFormEditRow( $(this) );
		});

		this.settings.btn_delete.on('click', function(e) {
			e.preventDefault();
			that.deleteFromRow($(this));
		})

	}; // ready()

	/**
	 * show the modal delete, then redirect to delete url
	 */
	this.deleteFromRow = function(btn_delete) {

		if ( typeof btn_delete !== 'object')
			return false;

		var that = this;

		var alias = btn_delete.attr('data-alias');

		swal({
			title: 'Delete',
			text: 'Delete "'+ alias +'" column?',
			type: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!'
		}, function(result) {
			window.location = btn_delete.attr('href');
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
		var formTemplate = $(this.settings.formTemplate);

		formTemplate.find('[name="id"]').val( btn_edit.attr('data-id') );
		formTemplate.find('[name="alias"]').attr('value', btn_edit.attr('data-alias') );

		btn_edit_parent.find('.settingsFormContainer').html(formTemplate.html());

		btn_edit_parent.find('.text-container').addClass('hide');
		btn_edit_parent.find('.btn-edit').addClass('hide');
		btn_edit_parent.find('.btn-delete').addClass('hide');
		btn_edit_parent.find('.btn-update').removeClass('hide');
		btn_edit_parent.find('.btn-cancel').removeClass('hide');

		this.settings.btn_add.attr('disabled', true);

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
	 * send add new request, adding new column for the jexcel or main table through ajax
	 * @param  {object} obj - button initiator
	 */
	this.sendAddNewColumn = function(obj) {

		var data = {
			columnName: $('#formAddRow').find('input').val()
		};

		$.ajax({
	        data: data, 
	        url: settings.url.store, 
	        cache: false, 
	        type: 'POST', 
	        dataType: 'json',
	        error: function (jqXHR, textStatus, errorThrown) {},
	        success: function (res) {

	        	if (res.status == 0) {
	        		swal('Adding new Column failed.', res.message, 'error');
	        		return false;
	        	}

	        	swal('Success', res.message, 'success' );
	        }
	    });
	}; // sendAddNewColumn()

	this.init();

} // settings
