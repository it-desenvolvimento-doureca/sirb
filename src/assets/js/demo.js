/* TIAGO */

$(document).on('fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange', function () {
    if (IsFullScreenCurrently()) {
        $('#go-button').hide();
    }
    else {
        $('#go-button').show();
    }
});

/* Get into full screen */
function GoInFullscreen(element) {

    if (element.requestFullscreen)
        element.requestFullscreen();
    else if (element.mozRequestFullScreen)
        element.mozRequestFullScreen();
    else if (element.webkitRequestFullscreen)
        element.webkitRequestFullscreen();
    else if (element.msRequestFullscreen)
        element.msRequestFullscreen();
}

/* Get out of full screen */
function GoOutFullscreen() {
    if (document.exitFullscreen)
        document.exitFullscreen();
    else if (document.mozCancelFullScreen)
        document.mozCancelFullScreen();
    else if (document.webkitExitFullscreen)
        document.webkitExitFullscreen();
    else if (document.msExitFullscreen)
        document.msExitFullscreen();
}

/* Is currently in full screen or not */
function IsFullScreenCurrently() {
    $('#go-button').hide();
    return (document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen);
}

$("#go-button").on('click', function () {
    if (IsFullScreenCurrently())
        GoOutFullscreen();
    else
        GoInFullscreen($("#element").get(0));
});




$("#toptexttop").css({ top: '0px' });
!function (a) { function b(b, d) { function e() { if (w) { $canvas = a('<canvas class="pg-canvas"></canvas>'), v.prepend($canvas), p = $canvas[0], q = p.getContext("2d"), f(); for (var b = Math.round(p.width * p.height / d.density), c = 0; b > c; c++) { var e = new l; e.setStackPos(c), x.push(e) } a(window).on("resize", function () { h() }), a(document).on("mousemove", function (a) { y = a.pageX, z = a.pageY }), B && !A && window.addEventListener("deviceorientation", function () { D = Math.min(Math.max(-event.beta, -30), 30), C = Math.min(Math.max(-event.gamma, -30), 30) }, !0), g(), o("onInit") } } function f() { p.width = v.width(), p.height = v.height(), q.fillStyle = d.dotColor, q.strokeStyle = d.lineColor, q.lineWidth = d.lineWidth } function g() { if (w) { s = a(window).width(), t = a(window).height(), q.clearRect(0, 0, p.width, p.height); for (var b = 0; b < x.length; b++)x[b].updatePosition(); for (var b = 0; b < x.length; b++)x[b].draw(); E || (r = requestAnimationFrame(g)) } } function h() { for (f(), i = x.length - 1; i >= 0; i--)(x[i].position.x > v.width() || x[i].position.y > v.height()) && x.splice(i, 1); var a = Math.round(p.width * p.height / d.density); if (a > x.length) for (; a > x.length;) { var b = new l; x.push(b) } else a < x.length && x.splice(a); for (i = x.length - 1; i >= 0; i--)x[i].setStackPos(i) } function j() { E = !0 } function k() { E = !1, g() } function l() { switch (this.stackPos, this.active = !0, this.layer = Math.ceil(3 * Math.random()), this.parallaxOffsetX = 0, this.parallaxOffsetY = 0, this.position = { x: Math.ceil(Math.random() * p.width), y: Math.ceil(Math.random() * p.height) }, this.speed = {}, d.directionX) { case "left": this.speed.x = +(-d.maxSpeedX + Math.random() * d.maxSpeedX - d.minSpeedX).toFixed(2); break; case "right": this.speed.x = +(Math.random() * d.maxSpeedX + d.minSpeedX).toFixed(2); break; default: this.speed.x = +(-d.maxSpeedX / 2 + Math.random() * d.maxSpeedX).toFixed(2), this.speed.x += this.speed.x > 0 ? d.minSpeedX : -d.minSpeedX }switch (d.directionY) { case "up": this.speed.y = +(-d.maxSpeedY + Math.random() * d.maxSpeedY - d.minSpeedY).toFixed(2); break; case "down": this.speed.y = +(Math.random() * d.maxSpeedY + d.minSpeedY).toFixed(2); break; default: this.speed.y = +(-d.maxSpeedY / 2 + Math.random() * d.maxSpeedY).toFixed(2), this.speed.x += this.speed.y > 0 ? d.minSpeedY : -d.minSpeedY } } function m(a, b) { return b ? void (d[a] = b) : d[a] } function n() { v.find(".pg-canvas").remove(), o("onDestroy"), v.removeData("plugin_" + c) } function o(a) { void 0 !== d[a] && d[a].call(u) } var p, q, r, s, t, u = b, v = a(b), w = !!document.createElement("canvas").getContext, x = [], y = 0, z = 0, A = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i), B = !!window.DeviceOrientationEvent, C = 0, D = 0, E = !1; return d = a.extend({}, a.fn[c].defaults, d), l.prototype.draw = function () { q.beginPath(), q.arc(this.position.x + this.parallaxOffsetX, this.position.y + this.parallaxOffsetY, d.particleRadius / 2, 0, 2 * Math.PI, !0), q.closePath(), q.fill(), q.beginPath(); for (var a = x.length - 1; a > this.stackPos; a--) { var b = x[a], c = this.position.x - b.position.x, e = this.position.y - b.position.y, f = Math.sqrt(c * c + e * e).toFixed(2); f < d.proximity && (q.moveTo(this.position.x + this.parallaxOffsetX, this.position.y + this.parallaxOffsetY), d.curvedLines ? q.quadraticCurveTo(Math.max(b.position.x, b.position.x), Math.min(b.position.y, b.position.y), b.position.x + b.parallaxOffsetX, b.position.y + b.parallaxOffsetY) : q.lineTo(b.position.x + b.parallaxOffsetX, b.position.y + b.parallaxOffsetY)) } q.stroke(), q.closePath() }, l.prototype.updatePosition = function () { if (d.parallax) { if (B && !A) { var a = (s - 0) / 60; pointerX = (C - -30) * a + 0; var b = (t - 0) / 60; pointerY = (D - -30) * b + 0 } else pointerX = y, pointerY = z; this.parallaxTargX = (pointerX - s / 2) / (d.parallaxMultiplier * this.layer), this.parallaxOffsetX += (this.parallaxTargX - this.parallaxOffsetX) / 10, this.parallaxTargY = (pointerY - t / 2) / (d.parallaxMultiplier * this.layer), this.parallaxOffsetY += (this.parallaxTargY - this.parallaxOffsetY) / 10 } switch (d.directionX) { case "left": this.position.x + this.speed.x + this.parallaxOffsetX < 0 && (this.position.x = v.width() - this.parallaxOffsetX); break; case "right": this.position.x + this.speed.x + this.parallaxOffsetX > v.width() && (this.position.x = 0 - this.parallaxOffsetX); break; default: (this.position.x + this.speed.x + this.parallaxOffsetX > v.width() || this.position.x + this.speed.x + this.parallaxOffsetX < 0) && (this.speed.x = -this.speed.x) }switch (d.directionY) { case "up": this.position.y + this.speed.y + this.parallaxOffsetY < 0 && (this.position.y = v.height() - this.parallaxOffsetY); break; case "down": this.position.y + this.speed.y + this.parallaxOffsetY > v.height() && (this.position.y = 0 - this.parallaxOffsetY); break; default: (this.position.y + this.speed.y + this.parallaxOffsetY > v.height() || this.position.y + this.speed.y + this.parallaxOffsetY < 0) && (this.speed.y = -this.speed.y) }this.position.x += this.speed.x, this.position.y += this.speed.y }, l.prototype.setStackPos = function (a) { this.stackPos = a }, e(), { option: m, destroy: n, start: k, pause: j } } var c = "particleground"; a.fn[c] = function (d) { if ("string" == typeof arguments[0]) { var e, f = arguments[0], g = Array.prototype.slice.call(arguments, 1); return this.each(function () { a.data(this, "plugin_" + c) && "function" == typeof a.data(this, "plugin_" + c)[f] && (e = a.data(this, "plugin_" + c)[f].apply(this, g)) }), void 0 !== e ? e : this } return "object" != typeof d && d ? void 0 : this.each(function () { a.data(this, "plugin_" + c) || a.data(this, "plugin_" + c, new b(this, d)) }) }, a.fn[c].defaults = { minSpeedX: .1, maxSpeedX: .7, minSpeedY: .1, maxSpeedY: .7, directionX: "center", directionY: "center", density: 1e4, dotColor: "#666666", lineColor: "#666666", particleRadius: 7, lineWidth: 1, curvedLines: !1, proximity: 100, parallax: !0, parallaxMultiplier: 5, onInit: function () { }, onDestroy: function () { } } }(jQuery),/**
 * requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
 * @see: http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 * @see: http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 * @license: MIT license
 */


    function () { for (var a = 0, b = ["ms", "moz", "webkit", "o"], c = 0; c < b.length && !window.requestAnimationFrame; ++c)window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[b[c] + "CancelAnimationFrame"] || window[b[c] + "CancelRequestAnimationFrame"]; window.requestAnimationFrame || (window.requestAnimationFrame = function (b) { var c = (new Date).getTime(), d = Math.max(0, 16 - (c - a)), e = window.setTimeout(function () { b(c + d) }, d); return a = c + d, e }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (a) { clearTimeout(a) }) }();
/**
 * Module for displaying "Waiting for..." dialog using Bootstrap
 *
 * @author Eugene Maslovich <ehpc@em42.ru>
 */

var waitingDialog = waitingDialog || (function ($) {
    'use strict';

    // Creating modal dialog's DOM
    var $dialog = $(
        '<div class="modal fade" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top:15%; overflow-y:visible;">' +
        '<div class="modal-dialog modal-m">' +
        '<div class="modal-content">' +
        '<div class="modal-header"><h3 style="margin:0;"></h3></div>' +
        '<div class="modal-body">' +
        '<div class="progress progress-striped active" style="margin-bottom:0;"><div class="progress-bar" style="width: 100%"></div></div>' +
        '</div>' +
        '</div></div></div>');

    return {
		/**
		 * Opens our dialog
		 * @param message Custom message
		 * @param options Custom options:
		 * 				  options.dialogSize - bootstrap postfix for dialog size, e.g. "sm", "m";
		 * 				  options.progressType - bootstrap postfix for progress bar type, e.g. "success", "warning".
		 */
        show: function (message, options) {
            // Assigning defaults
            if (typeof options === 'undefined') {
                options = {};
            }
            if (typeof message === 'undefined') {
                message = 'Loading';
            }
            var settings = $.extend({
                dialogSize: 'm',
                progressType: '',
                onHide: null // This callback runs after the dialog was hidden
            }, options);

            // Configuring dialog
            $dialog.find('.modal-dialog').attr('class', 'modal-dialog').addClass('modal-' + settings.dialogSize);
            $dialog.find('.progress-bar').attr('class', 'progress-bar');
            if (settings.progressType) {
                $dialog.find('.progress-bar').addClass('progress-bar-' + settings.progressType);
            }
            $dialog.find('h3').text(message);
            // Adding callbacks
            if (typeof settings.onHide === 'function') {
                $dialog.off('hidden.bs.modal').on('hidden.bs.modal', function (e) {
                    settings.onHide.call($dialog);
                });
            }
            // Opening dialog
            $dialog.modal();
        },
		/**
		 * Closes dialog
		 */
        hide: function () {
            $dialog.modal('hide');
        }
    };

})(jQuery);

$(function () {

    $('#particles').particleground({
        minSpeedX: 0.1,
        maxSpeedX: 0.7,
        minSpeedY: 0.1,
        maxSpeedY: 0.7,
        directionX: 'center', // 'center', 'left' or 'right'. 'center' = dots bounce off edges
        directionY: 'center', // 'center', 'up' or 'down'. 'center' = dots bounce off edges
        density: 10000, // How many particles will be generated: one particle every n pixels
        dotColor: '#6eacff',
        lineColor: '#6eacff',
        particleRadius: 7, // Dot size
        lineWidth: 1,
        curvedLines: true,
        proximity: 100, // How close two dots need to be before they join
        parallax: false
    });

});

$(document).ready(function () {

    $(".acidjs-css3-treeview").delegate("label input:checkbox", "change", function () {
        var
            checkbox = $(this),
            nestedList = checkbox.parent().next().next(),
            selectNestedListCheckbox = nestedList.find("label:not([for]) input:checkbox");

        if (checkbox.is(":checked")) {
            checkbox.val(true);
            selectNestedListCheckbox.val(true);
            selectNestedListCheckbox.prop("checked", true);
        } else {
            checkbox.val(false);
            selectNestedListCheckbox.val(false);
            selectNestedListCheckbox.prop("checked", false);
        }
        getparent($(this));

    });

    function getparent(parent) {
        var input_checkbox = parent.parent().parent().parent().parent().children(".parent").next().children("input:checkbox");
        if (input_checkbox.length > 0) {
            input_checkbox.val(true);
            input_checkbox.prop("checked", true);
            getparent(input_checkbox);
        }
    }

    $('#imprime').click(function () {
        $("#printf").get(0).contentWindow.print();
    });
    /*$('.main-panel').scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });*/
    $('.scrollup').fadeIn();
    $('.scrolldown').fadeIn();
    $('.scrollup').click(function () {
        $(".main-panel").animate({ scrollTop: '-=200' }, 100);
        return false;
    });
    $('.scrolldown').click(function () {
        $(".main-panel").animate({ scrollTop: '+=200' }, 100);
        return false;
    });


    $('.main-panel').scroll(function () {
        if ($(this).scrollTop() > 300) {
            $(".ag-header").css("position", "fixed");
            $(".ag-header").css("z-index", "1");
            $(".ag-header").css("top", $(this).scrollTop() + 50);
            $(".ag-header").css("transition", "all 1s ease 0s");
        } else {
            $(".ag-header").css("position", "initial");
        }
    });
<<<<<<< HEAD


    $('.main-panel').scroll(function () {
        if ($(".cab_analiseencomendas_1").is(":visible")) {
            w = $(".referenciacol").width();
        } else {
            w = '100%'
        }
        if ($(".cab_analiseencomendas_2").is(":visible")) {
            w2 = $(".cab_analiseencomendas_2 > div").width();
        } else {
            w2 = '100%'
        }

        if ($(".cab_analiseencomendas_3").is(":visible")) {
            w3 = $(".referenciacol").width();
        } else {
            w3 = '100%'
        }

        if ($(".cab_tabela_analise_dividas").is(":visible")) {
            w4 = $(".cab_tabela_analise_dividas > div").width();
        } else {
            w4 = '100%'
        }

        if ($(".cab_tabela_gestao_barras").is(":visible")) {
            w5 = $(".cab_tabela_gestao_barras > div").width();
        } else {
            w5 = '100%'
        }



        if ($(this).scrollTop() > 300) {

            $('.scrollleft').css("top", $(this).scrollTop() + 50);
            $('.scrollleft').css("position", 'fixed');

            $('.scrollright').css("top", $(this).scrollTop() + 50);
            $('.scrollright').css("position", 'fixed');
            $('.scrollright').css("right", 86);
            $('.scrollright').css("left", 'auto');


            if ($("#cab_analiseencomendas_copy").length == 0) {
                var div = $('.cab_analiseencomendas_2 thead > tr');
                var klon = div.clone().prop('id', 'cab_analiseencomendas_copy')
                    .css("position", "initial")
                    .css("width", "100%")
                    .css("display", "table-row");
                div.before(klon);
            }

            if ($("#cab_tabela_analise_dividas_copy").length == 0) {
                var div = $('.cab_tabela_analise_dividas thead > tr');
                var klon = div.clone().prop('id', 'cab_tabela_analise_dividas_copy')
                    .css("position", "initial")
                    .css("width", "100%")
                    .css("display", "table-row");
                div.before(klon);
            }

            if ($("#cab_tabela_gestao_barras_copy").length == 0) {
                var div = $('.cab_tabela_gestao_barras thead > tr');
                var klon = div.clone().prop('id', 'cab_tabela_gestao_barras_copy')
                    .css("position", "initial")
                    .css("width", "100%")
                    .css("display", "table-row");
                div.before(klon);
            }

            /*$("#cabsize1").css("display", "block")
                .css("min-height", ($(".filtros_analiseencomendas_1").height() + $(".cab_analiseencomendas_1").height()) + "px");
            $("#cabsize2").css("display", "block")
                .css("min-height", ($(".filtros_analiseencomendas_2").height() + $(".cab_analiseencomendas_2").height()) + "px");*/

            $(".filtros_analiseencomendas_1").width(w);
            $(".filtros_analiseencomendas_1").css("position", "fixed");
            $(".filtros_analiseencomendas_1").css("z-index", "1");
            $(".filtros_analiseencomendas_1").css("top", $(this).scrollTop() + 50);
            $(".filtros_analiseencomendas_1").css("transition", "top 0.6s ease 0s");
            $(".filtros_analiseencomendas_1").css("background", "#f5f5f5");

            $(".filtros_analiseencomendas_2").width(w2);
            $(".filtros_analiseencomendas_2").css("position", "fixed");
            $(".filtros_analiseencomendas_2").css("z-index", "1");
            $(".filtros_analiseencomendas_2").css("top", $(this).scrollTop() + 50);
            $(".filtros_analiseencomendas_2").css("transition", "top 0.6s ease 0s");
            $(".filtros_analiseencomendas_2").css("background", "#f5f5f5");


            $(".cab_analiseencomendas_1").width(w);
            $(".cab_analiseencomendas_1").css("position", "fixed");
            $(".cab_analiseencomendas_1").css("z-index", "1");
            $(".cab_analiseencomendas_1").css("top", $(this).scrollTop() + 182);
            $(".cab_analiseencomendas_1").css("transition", "top 0.6s ease 0s");

            var top3 = 0;
            if ($("#analises_prev_scroll").length != 0) {
                top3 = ($("#analises_prev_scroll").offset().top) * -1 + 50;
            }

            if (top3 < 0) top3 = 0;
            $(".cab_analiseencomendas_3").width(w);
            $(".cab_analiseencomendas_3").css("position", "relative");
            $(".cab_analiseencomendas_3").css("z-index", "1");
            $(".cab_analiseencomendas_3").css("top", top3);
            $(".cab_analiseencomendas_3").css("transition", "top 0.6s ease 0s");


            $(".cab_analiseencomendas_2 thead > tr").not("#cab_analiseencomendas_copy").width(w2)
                .css("position", "fixed")
                .css("z-index", "1")
                .css("top", $(this).scrollTop() + 182)
                .css("transition", "top 0.6s ease 0s")
                .css("background", "white")
                .css("display", "table");


            $(".cab_tabela_analise_dividas thead > tr").not("#cab_tabela_analise_dividas_copy").width(w4)
                .css("position", "fixed")
                .css("z-index", "1")
                .css("top", $(this).scrollTop() + 84)
                .css("transition", "top 0.6s ease 0s")
                .css("background", "white")
                .css("display", "table");

            $(".cab_tabela_analise_dividas .ui-datatable-header").width(w4)
                .css("position", "fixed")
                .css("z-index", "1")
                .css("top", $(this).scrollTop() + 50)
                .css("transition", "top 0.6s ease 0s")
                .css("background", "white")
                .css("display", "table");


            $(".cab_tabela_gestao_barras thead > tr").not("#cab_tabela_gestao_barras_copy").width(w5)
                .css("position", "fixed")
                .css("z-index", "1")
                .css("top", $(this).scrollTop() + 50)
                .css("transition", "top 0.6s ease 0s")
                .css("background", "white")
                .css("display", "table");

            $(".cab_tabela_gestao_barras .ui-datatable-header").width(w5)
                .css("position", "fixed")
                .css("z-index", "1")
                .css("top", $(this).scrollTop() + 50)
                .css("transition", "top 0.6s ease 0s")
                .css("background", "white")
                .css("display", "table");


        } else {


            $(".filtros_analiseencomendas_1").css("position", "initial");
            $(".filtros_analiseencomendas_1").css("width", "100%");

            $(".filtros_analiseencomendas_2").css("position", "initial");
            $(".filtros_analiseencomendas_2").css("width", "100%");

            $(".cab_analiseencomendas_1").css("position", "initial");
            $(".cab_analiseencomendas_1").css("width", "100%");

            $(".cab_analiseencomendas_3").css("position", "initial");
            $(".cab_analiseencomendas_3").css("width", "100%");



            if ($("#cab_analiseencomendas_copy").length != 0) {
                $("#cab_analiseencomendas_copy").remove();
            }

            $(".cab_analiseencomendas_2 thead > tr").css("position", "initial");
            $(".cab_analiseencomendas_2 thead > tr").css("width", "100%");
            $(".cab_analiseencomendas_2 thead > tr").css("display", "table-row");


            if ($("#cab_tabela_analise_dividas_copy").length != 0) {
                $("#cab_tabela_analise_dividas_copy").remove();
            }
            $(".cab_tabela_analise_dividas thead > tr").css("position", "initial");
            $(".cab_tabela_analise_dividas thead > tr").css("width", "100%");
            $(".cab_tabela_analise_dividas thead > tr").css("display", "table-row");

            $(".cab_tabela_analise_dividas .ui-datatable-header").css("position", "initial");
            $(".cab_tabela_analise_dividas .ui-datatable-header").css("width", "100%");
            $(".cab_tabela_analise_dividas .ui-datatable-header").css("display", "block");


            if ($("#cab_tabela_gestao_barras_copy").length != 0) {
                $("#cab_tabela_gestao_barras_copy").remove();
            }
            $(".cab_tabela_gestao_barras thead > tr").css("position", "initial");
            $(".cab_tabela_gestao_barras thead > tr").css("width", "100%");
            $(".cab_tabela_gestao_barras thead > tr").css("display", "table-row");

            $(".cab_tabela_gestao_barras .ui-datatable-header").css("position", "initial");
            $(".cab_tabela_gestao_barras .ui-datatable-header").css("width", "100%");
            $(".cab_tabela_gestao_barras .ui-datatable-header").css("display", "block");


            $("#cabsize1").css("display", "none");
            $("#cabsize2").css("display", "none");


            $('.scrollleft').css("position", 'absolute');
            $('.scrollleft').css("top", 20);
            $('.scrollright').css("position", 'absolute');
            $('.scrollright').css("top", 20);
            $('.scrollright').css("right", 'auto');
            $('.scrollright').css("left", 59);


        }
    });
=======
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea



});

/* ************************************************** */
type = ['', 'info', 'success', 'warning', 'danger'];


demo = {
    initPickColor: function () {
        $('.pick-class-label').click(function () {
            var new_class = $(this).attr('new-class');
            var old_class = $('#display-buttons').attr('data-class');
            var display_div = $('#display-buttons');
            if (display_div.length) {
                var display_buttons = display_div.find('.btn');
                display_buttons.removeClass(old_class);
                display_buttons.addClass(new_class);
                display_div.attr('data-class', new_class);
            }
        });
    },

    initFormExtendedDatetimepickers: function () {
        $('.datetimepicker').datetimepicker({
            icons: {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-chevron-up",
                down: "fa fa-chevron-down",
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-screenshot',
                clear: 'fa fa-trash',
                close: 'fa fa-remove'
            }
        });
    },

    initDocumentationCharts: function () {
        /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

        dataDailySalesChart = {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
                [12, 17, 7, 17, 23, 18, 38]
            ]
        };

        optionsDailySalesChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
        }

        var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

        md.startAnimationForLineChart(dailySalesChart);
    },

    initDashboardPageCharts: function () {

        /* ----------==========     Daily Sales Chart initialization    ==========---------- */

        dataDailySalesChart = {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
                [12, 17, 7, 17, 23, 18, 38]
            ]
        };

        optionsDailySalesChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
        }

        var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

        md.startAnimationForLineChart(dailySalesChart);



        /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

        dataCompletedTasksChart = {
            labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
            series: [
                [230, 750, 450, 300, 280, 240, 200, 190]
            ]
        };

        optionsCompletedTasksChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
        }

        var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

        // start animation for the Completed Tasks Chart - Line Chart
        md.startAnimationForLineChart(completedTasksChart);



        /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

        var dataEmailsSubscriptionChart = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [
                [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

            ]
        };
        var optionsEmailsSubscriptionChart = {
            axisX: {
                showGrid: false
            },
            low: 0,
            high: 1000,
            chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
        };
        var responsiveOptions = [
            ['screen and (max-width: 640px)', {
                seriesBarDistance: 5,
                axisX: {
                    labelInterpolationFnc: function (value) {
                        return value[0];
                    }
                }
            }]
        ];
        var emailsSubscriptionChart = Chartist.Bar('#emailsSubscriptionChart', dataEmailsSubscriptionChart, optionsEmailsSubscriptionChart, responsiveOptions);

        //start animation for the Emails Subscription Chart
        md.startAnimationForBarChart(emailsSubscriptionChart);

    },

    initGoogleMaps: function () {
        var myLatlng = new google.maps.LatLng(40.748817, -73.985428);
        var mapOptions = {
            zoom: 13,
            center: myLatlng,
            scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
            styles: [{ "featureType": "water", "stylers": [{ "saturation": 43 }, { "lightness": -11 }, { "hue": "#0088ff" }] }, { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "hue": "#ff0000" }, { "saturation": -100 }, { "lightness": 99 }] }, { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#808080" }, { "lightness": 54 }] }, { "featureType": "landscape.man_made", "elementType": "geometry.fill", "stylers": [{ "color": "#ece2d9" }] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "color": "#ccdca1" }] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#767676" }] }, { "featureType": "road", "elementType": "labels.text.stroke", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "poi", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape.natural", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#b8cb93" }] }, { "featureType": "poi.park", "stylers": [{ "visibility": "on" }] }, { "featureType": "poi.sports_complex", "stylers": [{ "visibility": "on" }] }, { "featureType": "poi.medical", "stylers": [{ "visibility": "on" }] }, { "featureType": "poi.business", "stylers": [{ "visibility": "simplified" }] }]

        }
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        var marker = new google.maps.Marker({
            position: myLatlng,
            title: "Hello World!"
        });

        // To add the marker to the map, call setMap();
        marker.setMap(map);
    },

    showNotification: function (from, align, messages, cor) {
        color = cor;

        $.notify({
            icon: "notifications",
            message: messages

        }, {
            type: type[cor],
            timer: 100,
            placement: {
                from: from,
                align: align
            }
        });
    }



}

//guardar ip nos cookies
function getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
    //compatibility for firefox and chrome
    var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var pc = new myPeerConnection({
        iceServers: []
    }),
        noop = function () { },
        localIPs = {},
        ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
        key;

    function iterateIP(ip) {
        if (!localIPs[ip]) onNewIP(ip);
        localIPs[ip] = true;
    }

    //create a bogus data channel
    var uaString = window.navigator.userAgent;
    var match = /\b(MSIE |Trident.*?rv:|Edge\/)(\d+)/.exec(uaString);

    if (match) // If Internet Explorer, return version number
    {
        $('#browseridmens').show()
    }
    else  // If another browser, return 0
    {
        $('#browseridmens').hide()
        pc.createDataChannel("");
    }


    // create offer and set local description
    pc.createOffer(function (sdp) {
        sdp.sdp.split('\n').forEach(function (line) {
            if (line.indexOf('candidate') < 0) return;
            line.match(ipRegex).forEach(iterateIP);
        });

        pc.setLocalDescription(sdp, noop, noop);
    }, noop);

    //listen for candidate events
    pc.onicecandidate = function (ice) {
        if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
    };
}

<<<<<<< HEAD
=======
//guardar ip nos cookies
function getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
    //compatibility for firefox and chrome
    var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var pc = new myPeerConnection({
        iceServers: []
    }),
        noop = function () { },
        localIPs = {},
        ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
        key;

    function iterateIP(ip) {
        if (!localIPs[ip]) onNewIP(ip);
        localIPs[ip] = true;
    }

    //create a bogus data channel
    pc.createDataChannel("");

    // create offer and set local description
    pc.createOffer(function (sdp) {
        sdp.sdp.split('\n').forEach(function (line) {
            if (line.indexOf('candidate') < 0) return;
            line.match(ipRegex).forEach(iterateIP);
        });

        pc.setLocalDescription(sdp, noop, noop);
    }, noop);

    //listen for candidate events
    pc.onicecandidate = function (ice) {
        if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
    };
}

>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
// Usage

getUserIP(function (ip) {
    document.cookie = "IP_CLIENT=" + ip;
});
<<<<<<< HEAD

$(document).ready(function () {
    var clicked = false, clickX;
    $('[id^=analises_prev_scroll]').on({
        'mousemove': function (e) {
            clicked && updateScrollPos(e, $(this));
        },
        'mousedown': function (e) {
            clicked = true;
            clickX = e.pageX;
        },
        'mouseup': function () {
            clicked = false;
            //$('#analises_prev_scroll').css('cursor', 'auto');
            $(this).css('cursor', 'auto');
        }
    });

    var updateScrollPos = function (e, element) {
        /* $('#analises_prev_scroll').css('cursor', 'pointer');
         $('#analises_prev_scroll').scrollLeft($('#analises_prev_scroll').scrollLeft() + (clickX - e.pageX));*/
        element.css('cursor', 'pointer');
        element.scrollLeft($('#analises_prev_scroll').scrollLeft() + (clickX - e.pageX));
    }

    $('.scrollleft').click(function () {
        //$("#analises_prev_scroll").animate({ scrollLeft: '-=20' }, 0);
        document.getElementById('analises_prev_scroll').scrollLeft -= 20;
        return false;
    });

    $('.scrollright').click(function () {
        //$("#analises_prev_scroll").animate({ scrollLeft: '+=20' }, 0);
        document.getElementById('analises_prev_scroll').scrollLeft += 20;
        return false;
    });
});
=======
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
