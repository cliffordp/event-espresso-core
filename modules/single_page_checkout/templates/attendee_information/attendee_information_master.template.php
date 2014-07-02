	<p id="spco-attendee_information-pg" class="spco-steps-pg small-text drk-grey-text">
		<?php echo apply_filters( 'FHEE__registration_page_attendee_information__attendee_information_pg', sprintf( __('In order to process your registration, we ask you to provide the following information.%1$sPlease note that all fields marked with an asterisk (%2$s) are required.', 'event_espresso'), '<br />', '<span class="asterisk">*</span>' )); ?>
	</p>

<?php
$att_nmbr = 0;
$prev_event = '';
$prev_ticket = '';

if ( count( $registrations ) > 0 ) {
	foreach ( $registrations as $registration ) {
		if ( $registration instanceof EE_Registration ) {
			$att_nmbr++;
?>

		<div id="spco-attendee-panel-dv-<?php echo $registration->reg_url_link();?>" class="spco-attendee-panel-dv">

			<?php if ( $registration->event()->ID() != $prev_event ) { ?>
			<h4 id="event_title-<?php echo $registration->event()->ID() ?>" class="big-event-title-hdr">
				<?php echo $registration->event()->name(); ?>
			</h4>
			<?php } ?>
			<?php if ( $registration->ticket()->ID() != $prev_ticket ) { ?>
				<?php if ( ! $revisit ) { ?>
			<div class="spco-ticket-info-dv small-text">
				<h5><?php _e('Ticket Details', 'event_espresso');?></h5>
				<table>
					<tr>
						<th scope="col" width=""><?php _e('Ticket Name and Description', 'event_espresso');?></th>
						<th scope="col" width="7.5%" class="jst-cntr"><?php _e('Qty', 'event_espresso');?></th>
						<th scope="col" width="17.5%" class="jst-cntr"><?php _e('Price', 'event_espresso');?></th>
						<th scope="col" width="17.5%" class="jst-cntr"><?php _e('Total', 'event_espresso');?></th>
					</tr>
					<tr>
						<td>
						<?php
							echo $registration->ticket()->name();
							echo $registration->ticket()->description() ? '<br/>' . $registration->ticket()->description() : '';
						?>
						</td>
						<td class="jst-cntr"><?php echo $ticket_count[ $registration->ticket()->ID() ];?></td>
						<td class="jst-rght"><?php echo EEH_Template::format_currency( $registration->ticket()->price() );?></td>
						<td class="jst-rght"><?php echo EEH_Template::format_currency( $registration->ticket()->price() * $ticket_count[ $registration->ticket()->ID() ] );?></td>
					</tr>
				</table>
			</div>
				<?php } ?>
			<?php } ?>

			<?php
			// ATTENDEE QUESTIONS
			$reg_form = 'reg_form_' . str_replace( '-', '', $registration->reg_url_link() );
			echo ${$reg_form};
			?>

		</div>
<?php
			$prev_event = $registration->event()->ID();
			$prev_ticket = $registration->ticket()->ID();

		} // if ( $registration instanceof EE_Registration )
	 } // end foreach ( $registrations as $registration )

	echo $hidden_inputs;

} // end if ( count( $registrations ) > 0 )

?>

		<div class="clearfix">
			<a id="spco-display-event-questions-lnk" class="act-like-link smaller-text hidden hide-if-no-js float-right" >
				<?php _e('show&nbsp;event&nbsp;questions', 'event_espresso'); ?>
			</a>
		</div>


