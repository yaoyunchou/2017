$(function(){
    $('[data-toggle="tooltip"]').tooltip();
	$('[data-toggle="popover"]').popover();
	$('#loading-example-btn').on('click', function () {
		var $btn = $(this).button('loading');
		// business logic...
		$btn.button('reset');
	});
});