window.onload = function() {
  setTimeout(function(){
       $(".loader").fadeOut();
        $('svg').attr("class", "mylogo loadout");
        $('body').removeClass('noscroll');
    }, 2300);
};

$(function () {

    $(".computer").mousemove(function (e) {
        var windowWidth = $(window).width();
        var contentWidth = $(".macbook_svg").width();
        var marginWidth = (windowWidth - contentWidth);
        var mouseX = e.clientX;
        var newWidth = mouseX / windowWidth * 100;


        $(".illustrate").css({
            width: newWidth + "%"
        })
    });

    var scene = document.getElementById('scene');
    var parallax = new Parallax(scene);

    $('.parallax').parallax();



    $(".piece .button").click(function (e) {
        e.preventDefault();
        var $pieceContainer = $(this).closest(".piece_container");
        var $piece = $(this).closest(".piece");
        var topSpace = $(window).height() * 0.025;

        var piecePos = $pieceContainer.offset().top;

        var $pieceBody = $pieceContainer.children(".body");

        var pieceNum = $pieceContainer.index() - 1;
        var bodyNum = $(".work_overlay").children(".body").get(pieceNum);

        //        console.log(bodyNum);
        //        
        //        $("body,html").animate({ scrollTop: piecePos - topSpace });

        //        
        //        $pieceContainer.addClass("top");
        //        
        //        setTimeout(function(){
        //            $piece.addClass("piece_expand");
        //            $piece.children(".body").fadeIn(200);
        //        }, 500);


        setTimeout(function () {
            $(".work_overlay").fadeIn();
            $(bodyNum).fadeIn();
            $("section, body>header").addClass("blur");
            $("body").addClass("noscroll");
            $(".work_overlay").scrollTop(0);
        }, 500);



    });

    function closeProj() {
        $("section, header").removeClass("blur");
        $(".work_overlay, .body").fadeOut();
        $("body").removeClass("noscroll");
    }

    $(document).keyup(function (e) {
        if (e.keyCode == 27) {

            //            $(".piece").children(".body").fadeOut();
            //            $(".piece").removeClass("piece_expand");

            closeProj();
        }

        //         setTimeout(function(){
        //             $(".piece_container").removeClass("top");
        //        }, 500);
    });

    $(".exit_contain, .return").click(function () {
        closeProj();
    })

    $(".right_arrow").click(function () {
        var $img = $(this).siblings("ul");
        var imgLength = $img.children().length - 1; // for index
        var $imgActive = $img.children(".active");
        var imgNum = $imgActive.index();
        var nextNum = imgNum + 1;
        var nextImg = $img.children().eq(nextNum);

        nextImg.addClass("active").siblings().removeClass("active");

        if (nextNum > imgLength) {
            $img.children().eq(0).addClass("active").siblings().removeClass("active");
        }

        console.log(nextNum, imgLength);
    });

    $(".left_arrow").click(function () {
        var $img = $(this).siblings("ul");
        var imgLength = $img.children().length - 1; // for index
        var $imgActive = $img.children(".active");
        var imgNum = $imgActive.index();
        var nextNum = imgNum - 1;
        var nextImg = $img.children().eq(nextNum);

        nextImg.addClass("active").siblings().removeClass("active");

        //        if (nextNum > imgLength) {
        //            imgNum = 0;
        //        }

        console.log(nextNum, imgLength);
    });

    $('nav a, .explore').click(function (e) {
        e.preventDefault();
        var navHeight = $('nav').height();
        var $section = $(this).attr("href");
        var sectionPos = $($section).offset().top;
        var newScrollTop = sectionPos - navHeight;

        $('body,html').animate({
            scrollTop: newScrollTop
        });
    });
    
    $('.nav_bars').click(function(){
        $(this).toggleClass('close');
        $('.nav_expand').fadeToggle();
    });
    
    $('.nav_expand a').click(function(){
       $('.nav_bars').removeClass('close');
        $('.nav_expand').fadeOut();
    });


});