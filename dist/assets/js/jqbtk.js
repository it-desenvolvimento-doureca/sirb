// jQuery Bootstrap Touch Keyboard plugin
// By Matthew Dawkins

(function ($) {
    $.fn.keyboard = function (options) {
        // Settings
        var settings = $.extend({
            keyboardLayout: [
                [
                    ['1', '1'],
                    ['2', '2'],
                    ['3', '3'],
                    ['4', '4'],
                    ['5', '5'],
                    ['6', '6'],
                    ['7', '7'],
                    ['8', '8'],
                    ['9', '9'],
                    ['0', '0'],
                    ['del', 'del']
                ],
                [
                    ['q', 'Q'],
                    ['w', 'W'],
                    ['e', 'E'],
                    ['r', 'R'],
                    ['t', 'T'],
                    ['y', 'Y'],
                    ['u', 'U'],
                    ['i', 'I'],
                    ['o', 'O'],
                    ['p', 'P'],
                    ['-', '='],
                    ['_', '+']
                ],
                [
                    ['a', 'A'],
                    ['s', 'S'],
                    ['d', 'D'],
                    ['f', 'F'],
                    ['g', 'G'],
                    ['h', 'H'],
                    ['j', 'J'],
                    ['k', 'K'],
                    ['l', 'L'],
                    ['\'', ':'],
                    ['@', ';'],
                    ['#', '~']
                ],
                [
                    ['z', 'Z'],
                    ['x', 'X'],
                    ['c', 'C'],
                    ['v', 'V'],
                    ['b', 'B'],
                    ['n', 'N'],
                    ['m', 'M'],
                    [',', ','],
                    ['.', '.'],
                    ['?', '!']
                ],
                [
                    ['shift', 'shift'],
                    ['space', 'space'],
                    ['shift', 'shift']
                ]
            ],
            numpadLayout: [
                [
                    ['7'],
                    ['8'],
                    ['9']
                ],
                [
                    ['4'],
                    ['5'],
                    ['6']
                ],
                [
                    ['1'],
                    ['2'],
                    ['3']
                ],
                [
                    ['.'],
                    ['0'],
                    ['del']
                ]
            ],
            telLayout: [
                [
                    ['1'],
                    ['2'],
                    ['3']
                ],
                [
                    ['4'],
                    ['5'],
                    ['6']
                ],
                [
                    ['7'],
                    ['8'],
                    ['9']
                ],
                [
                    ['.'],
                    ['0'],
                    ['del']
                ]
            ],
            layout: false,
            type: false,
            btnTpl: '<button type="button">',
            btnClasses: 'btn btn-default',
            btnActiveClasses: 'active btn-primary',
            initCaps: false,
            placement: 'auto'
        }, options);
        if (!settings.layout) {
            if (($(this).attr('type') === 'tel' && $(this).hasClass('keyboard-numpad')) || settings.type === 'numpad') {
                settings.layout = settings.numpadLayout;
            } else if (($(this).attr('type') === 'tel') || settings.type === 'tel') {
                settings.layout = settings.telLayout;
            } else {
                settings.layout = settings.keyboardLayout;
            }
        }
        // Keep track of shift status
        var keyboardShift = false;

        // Listen for keypresses
        $(document).off('click', '.jqbtk-row .btn');
        $(document).on('click', '.jqbtk-row .btn', function (e) {
            e.preventDefault();
            // $(this).addClass(settings.btnActiveClasses);
            var keyContent = $(this).attr('data-value' + (keyboardShift ? '-alt' : ''));
            var parent = $('[aria-describedby=' + $(this).closest('.popover').attr('id') + ']');

            var currentContent = parent.val();
            switch (keyContent) {
                case 'space':
                    currentContent += ' ';
                    break;
                case 'shift':
                    keyboardShift = !keyboardShift;
                    keyboardShiftify();
                    break;
                case 'del':
                    currentContent = currentContent.substr(0, currentContent.length - 1);
                    break;
                case 'enter':
                    parent.closest('form').submit();
                    break;
                default:
                    currentContent += keyContent;
                    keyboardShift = false;
            }
            parent.val(currentContent);
            keyboardShiftify();
            parent.focus();
        });
        $(document).on('touchend', '.jqbtk-row .btn', function () {
            $(this).removeClass(settings.btnActiveClasses);
        });
        // Prevent clicks on the popover from cancelling the focus
        $(document).on('touchstart', '.jqbtk-row', function (e) {
            e.preventDefault();
            var parent = $('[aria-describedby=' + $(this).closest('.popover').attr('id') + ']');
            parent.focus();
        });

        // Update keys according to shift status
        var keyboardShiftify = function () {
            $('.jqbtk-container .btn').each(function () {
                switch ($(this).attr('data-value')) {
                    case 'shift':
                    case 'del':
                    case 'space':
                    case 'enter':
                        break;
                    default:
                        $(this).text($(this).attr('data-value' + (keyboardShift ? '-alt' : '')));
                }
            });
        };



        $(document).mouseup(function (e) {
            var container = $(".popover");


            // if the target of the click isn't the container nor a descendant of the container
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if (container[0] != null) {
                    $('[aria-describedby=' + container[0].id + ']').click();
                }
                container.remove();
            }
        });

        // Set up a popover on each of the targeted elements
        return this.each(function () {
            $(this).popover({
                content: function () {

                    // Optionally set initial caps
                    if (settings.initCaps && $(this).val().length === 0) {
                        keyboardShift = true;
                    }
                    // Set up container
                    var content = $('<div class="jqbtk-container">');
                    $.each(settings.layout, function () {
                        var line = this;
                        var lineContent = $('<div class="jqbtk-row">');
                        $.each(line, function () {
                            var btn = $(settings.btnTpl).addClass(settings.btnClasses);
                            btn.attr('data-value', this[0]).attr('data-value-alt', this[1]);
                            switch (this[0]) {
                                case 'shift':
                                    btn.addClass('jqbtk-shift').html('<span class="glyphicon glyphicon-arrow-up"></span>');
                                    break;
                                case 'space':
                                    btn.addClass('jqbtk-space').html('&nbsp;');
                                    break;
                                case 'del':
                                    btn.addClass('jqbtk-del').html('<span class="glyphicon glyphicon-arrow-left"></span>');
                                    break;
                                case 'enter':
                                    btn.addClass('jqbtk-enter').html('Enter');
                                    break;
                                default:
                                    btn.text(btn.attr('data-value' + (keyboardShift ? '-alt' : '')));
                            }
                            lineContent.append(btn);
                        });
                        content.append(lineContent);
                    });
                    return content;
                },
                html: true,
                placement: settings.placement,
                trigger: 'click',
                container: 'body',
                viewport: 'body'
            });
        });
    };
}(jQuery));


$('[id^="number"]').keyboard();

$('[id^="default"]').keyboard();

$('[id^="default"]').click(function () {
    var w = window.innerWidth;
    $(".popover").css('width', 632.4);
});

$('.main-panel').scroll(function () {
    var container = $(".popover");
    var top = 0;
    if (container[0] != null) {
        if (container[0].className.indexOf('bottom') > -1) {

            var eTop = $('[aria-describedby=' + container[0].id + ']').offset().top;
            top = $('[aria-describedby=' + container[0].id + ']');

            $(".popover").css('top', eTop - $(window).scrollTop() + 35);

        } else if (container[0].className.indexOf('top') > -1) {
            var eTop = $('[aria-describedby=' + container[0].id + ']').offset().top;
            var h = $(".popover").height();
            bottom = $('[aria-describedby=' + container[0].id + ']');

            $(".popover").css('top', eTop - $(window).scrollTop() - h);
        }
    }
});

$('#editarclick2').click(function () {
    $("#editarclick1").trigger("click");
});

$('#cancelaclick1').click(function () {
    $("#cancelaclick").trigger("click");
});

$('#editarclick3').click(function () {
    $("#editarclick5").trigger("click");
});

$('#editarclick4').click(function () {
    $("#editarclickhidde").trigger("click");
});

$('#btvalidar').click(function () {
    $("#btvalidartrue").trigger("click");
});
$('#btvalidafalse').click(function () {
    $("#btvalidarfalse").trigger("click");
});

//verificar se elemento está dentro da janela
function elementInViewport2(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while (el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
    }

    return (
        top < (window.pageYOffset + window.innerHeight) &&
        left < (window.pageXOffset + window.innerWidth) &&
        (top + height) > window.pageYOffset &&
        (left + width) > window.pageXOffset
    );
}