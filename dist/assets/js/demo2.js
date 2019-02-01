
$(document).ready(function () {
    var imported = document.createElement('script');
    imported.src = 'assets/js/demo.js';
    document.body.appendChild(imported);


    $('#btmodalperfil').click(function () {
        var container = $(".modalperfil");
        var top = 0;

        if (container[0] != null) {

            var eTop = $('#btmodalperfil').offset().top;

            $(".modalperfil").css('top', eTop / 2);
        }
    });
});
