jQuery(document).ready(function($) {

	$.ajaxSetup ({ cache: false });

	// clear firefox and safari cache
	$(window).unload( function() {}); 
	
	
	$('#reg-admin-attendee-questions-submit').prop( 'disabled', true );
	

	$('#entries-per-page-slct').change( function() {
		var per_page = $(this).val();
		$('#per_page').val( per_page );
		$('#registrations-overview-frm').submit();
	}); 

	var dates = $( "#reg-filter-start-date" ).datepicker({
		defaultDate: "-1m",
		changeMonth: true,
		//numberOfMonths: 3,
		onSelect: function( selectedDate ) {
			var option = this.id == "reg-filter-start-date" ? "minDate" : "maxDate",
				instance = $( this ).data( "datepicker" ),
				date = $.datepicker.parseDate(
					instance.settings.dateFormat ||
					$.datepicker._defaults.dateFormat,
					selectedDate, instance.settings );
			dates.not( this ).datepicker( "option", option, date );
		}
	});

	var dates = $( "#reg-filter-end-date" ).datepicker({
		//defaultDate: "-1m",
		changeMonth: true,
		//numberOfMonths: 3,
		onSelect: function( selectedDate ) {
			var option = this.id == "reg-filter-start-date" ? "minDate" : "maxDate",
				instance = $( this ).data( "datepicker" ),
				date = $.datepicker.parseDate(
					instance.settings.dateFormat ||
					$.datepicker._defaults.dateFormat,
					selectedDate, instance.settings );
			dates.not( this ).datepicker( "option", option, date );
		}
	});




	
	$( '.reg-admin-attendee-questions-input-td' ).each(function() {
		$(this).find('input').prop( 'disabled', true );
		$(this).find('select').prop( 'disabled', true );
	});	
	
	$('#reg-admin-attendee-questions-frm').on( 'click', '.reg-admin-edit-attendee-question-lnk', function(e) {
		e.preventDefault();
		$(this).closest('table').find('.reg-admin-attendee-questions-input-td' ).each(function() {
			$(this).removeClass('disabled-input');
			$(this).find('input').prop( 'disabled', false ).addClass('editable-input');
			$(this).find('select').prop( 'disabled', false ).addClass('editable-input');
		});	
	});
	
	$('#reg-admin-attendee-questions-frm').on( 'change', '.editable-input', function(e) {
		$(this).removeClass('editable-input').addClass('edited-input');
		var edit_lnk = $(this).closest('table').find('.reg-admin-edit-attendee-question-td' ).html();
		var edit_lnk = '<span class="reminder-spn">' + eei18n.update_att_qstns + '<span><span class="hidden">' + edit_lnk + '<span>';
		$(this).closest('table').find('.reg-admin-edit-attendee-question-td' ).html( edit_lnk );
		$('#reg-admin-attendee-questions-submit').prop( 'disabled', false );
	});
	
	

	/**
	 * catch the checkin status triggers
	 * @return string (new html for checkin)
	 */
	$('.trigger-checkin', '#the-list').on('click', function() {
		var content;
		var itemdata = $(this).data();
		var thisitem = $(this);
		var data = {
			regid : itemdata.regid,
			dttid : itemdata.dttid,
			checkinnonce : itemdata.nonce,
			ee_admin_ajax : true,
			action : 'toggle_checkin_status',
			page : 'espresso_registrations'
		};

		var setup = {
			where: '#ajax-notices-container',
			what: 'clear'
		};

		$.ajax({
			type: "POST",
			url: ajaxurl,
			data: data,
			success: function( response, status, xhr ) {
				var ct = xhr.getResponseHeader("content-type") || "";
					if (ct.indexOf('html') > -1) {
						$(setup.where).html(response);
					}

					if (ct.indexOf('json') > -1 ) {
						var resp = response,
						content = resp.error ? resp.error : resp.content;
						if ( resp.error ) {
							$(setup.where).html(content);
						} else {
							$(setup.where).html(resp.notices);
							thisitem.attr('class', content);
						}
					}
			}
		});
		return false;
	});

	/**
	 * hide unnecessary ui elements when viewing attendee details cpt route.
	 */
	$('#post-status-display').parent().hide();
	$('#visibility').hide();

});


