$(function () {

    var currPage = $(".selected_line").index();

    $(".next").click(function (e) {


        currPage += 1;

        var nextPage = $(".rec_nest li").eq(currPage).children("a").attr("href");

        $(this).attr("href", nextPage);

    });

    $(".yn_buttons button").click(function (e) {
        $(this).removeClass("fade").siblings().addClass("fade");

    });
    // OTHER
    $("input[name='Others']").change(function (e) {
        $(".other_selected, .add_another").slideToggle();

    });

    $("input[type='checkbox']:not(input[name='Others'])").change(function (e) {
        $(this).siblings($("input[type='number']")).not($("label")).toggleClass("fade");
    });

    $(".add_another").click(function (e) {
        e.preventDefault();

        var clone = $(".other_selected:last").clone();

        clone.children("input").each(function () {
            $(this).val("");
        });

        clone.hide().insertBefore($(".add_another")).slideDown();
    });

    //ASIDE
    var currSec = $(".selected_line").index();

    function asideDrop() {
        currSec += 1;
        $(".sum_inv section:nth-of-type(" + currSec + ") >h4").addClass("sum_inv_selected");
        $(".sum_inv section:nth-of-type(" + currSec + ") >h4 .fa").addClass("arrow_rotate_up");
    }

    setTimeout(asideDrop, 500);

    function showAside() {
        $(".sum_inv section:nth-of-type(" + currSec + ") .aside_content").slideDown("slow");
    }

    setTimeout(showAside, 1000);

    $(".sum_inv section >h4").click(function () {
        $(this).siblings(".aside_content").slideToggle();

        var $arrow = $(this).children(".fa");

        if ($arrow.hasClass("arrow_rotate_up")) {
            $arrow.toggleClass("arrow_rotate_up");
            $arrow.toggleClass("arrow_rotate_down");
        } else if ($(this).children(".fa").hasClass("arrow_rotate_down")) {
            $arrow.toggleClass("arrow_rotate_up");
            $arrow.toggleClass("arrow_rotate_down");
        }

        if (!$arrow.hasClass("arrow_rotate_up")) {
            $arrow.addClass("arrow_rotate_up");
        }




    });


    //ASIDE LIST CLICK
    $(".fa-list-alt").click(function () {
        $("section .sum_inv").toggleClass("right_hide");
        $("section .sum_inv").toggleClass("right_show");
    });

    $(".fa-lightbulb-o").click(function () {
        $("section .things_consider").toggleClass("left_hide")
        $("section .things_consider").toggleClass("left_show");
    });

    //NAV_SMALL
    $(".fa-bars").click(function () {
        $('header >nav:first').slideToggle();
    });
    
    $(window).resize(function(){
        if ( $(this).width() > 768 ) {
            $("header >nav:first").removeAttr("style");
        }
    });


});