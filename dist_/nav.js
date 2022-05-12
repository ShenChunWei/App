


$(document).ready(function () {
    $('#nav_toggle_button').click(function () {
        //console.log("fuck2024")
        if ($('#side_bar').css('display') == 'none') {
            $('.bi.bi-list').css('color', 'black');
            //$('#nav_toggle_button').css('transform', 'rotate(0)');
            $('#nav_toggle_button').addClass('rotated')
            $('#side_bar').show('slow');
        } else {
            //$('.bi.bi-list').css('color', 'white');
            $('#nav_toggle_button').removeClass('rotated')
            $('#side_bar').hide('slow');
        }
    });
});
