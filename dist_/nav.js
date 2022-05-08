


$(document).ready(function () {
    $('#nav_toggle_button').click(function () {
        //console.log("fuck2024")
        if ($('#side_bar').css('display') == 'none') {
            $('#side_bar').show('slow');
        } else {
            $('#side_bar').hide('slow');
        }
    });
});
