$('document').ready(function(e){

    $('a').click(function(a){
        a.preventDefault();
        var $section = $(this).attr('href');
        var $sectionTop = $($section).offset().top;
        if ($section=='#support') {
            $sectionTop += 30;
        } 
        
        
        $('body').animate({
           scrollTop: $sectionTop - $('header').outerHeight() + 1
        });
        
        $('nav.expand').slideUp();
    });
    
    var $featuresTop = $('.features').offset().top - $('header').outerHeight();
    var $techTop = $('.tech').offset().top - $('header').outerHeight();
    var $pricingTop = $('.pricing').offset().top - $('header').outerHeight();
    var $supportTop = $('.support').offset().top - $('header').outerHeight() - 85;
    
    var $navArray = [
        $('a[href="#features"]'),
		$('a[href="#tech"]'),
		$('a[href="#pricing"]'),
		$('a[href="#support"]')
    ]
    
    function toggleNav ( index ) {
        index.addClass('highlight').parent().siblings().children().removeClass('highlight');
    }
    
    $(document).scroll(function(){
        var $scrollTop = $(document).scrollTop();
        if ($scrollTop >= ($('.features').offset().top)/2) {
            $('.gotop').fadeIn();
        } else {
            $('.gotop').fadeOut();
        }
        
        if ($scrollTop >= $featuresTop){
            toggleNav($navArray[0]);
        } else if ($scrollTop < $featuresTop){
            $('.navlarge a').removeClass('highlight');
        }
        if ($scrollTop >= $techTop){
            toggleNav($navArray[1]);
        }
        if ($scrollTop >= $pricingTop){
            toggleNav($navArray[2]);
        }
        if ($scrollTop >= $supportTop){
            toggleNav($navArray[3]);
        }
        
    });
    
    $('.gotop').click(function(){
        $('html,body').animate({
            scrollTop: 0
        });
        return false;
    });
    
    $('.navsmall').click(function(){
       $('nav.expand').slideToggle();
    });
    
//    $('.banner').slick({
//        accessibility: true,
//        adaptiveHeight: false,
//        autoplay: false,
//        autoplaySpeed: (3000),
//        dots: true,
//        arrows: false,
//        keys: true,
//        mobileFirst: true
//    });
    
        var leftProp;
        var posLeft;
        var $outerWidth = $('.threeFeat').outerWidth();
    
    //messed up features section
    
//    $(".features article").click(function(){
//        $('.color1').fadeOut();
//        
//        if ($(this).attr('class') == 'status') {
//            leftProp = '0';
//            posLeft = 0;
//            
//        }else if ($(this).attr('class') == 'data') {
//            leftProp = '-100vw';
//            posLeft = $outerWidth * (-1);
//        } else if ($(this).attr('class') == 'goals') {
//            leftProp = '-200vw';
//            posLeft = $outerWidth * (-2);
//        }
//        
//       
//       
//        
////           }, {complete: function(){
////              if (posLeft === 0) {
////                $('.arrow_left').fadeOut();
////            } else if (posLeft > 0) {
////                $('.arrow_left').fadeIn();
////            }
////               if (posLeft === $outerWidth * (-2)) {
////                $('.arrow_right').fadeOut();
////            } else if (posLeft > $outerWidth * (-2)) {
////                $('.arrow_right').fadeIn();
////            }
////               
////            }
//              
//        
//        if ($(window).width() < 768) {
//            
//            
//            $('.content').animate({
//                width: '100%'
//            });
//        
//            $('.features article').animate({
//                width: '100vw',
//                height: '75vh',
//                display: 'inline-block',
//                'min-height': '525px'
//            });
//            
//            $('.threeFeat article figure').css({
//               position: 'absolute',
//                height: "40%",
//                bottom: 0,
//                
//            });
//            
//            $('.threeFeat article figure img').removeClass('blur_2');
//           
//           
//        } else {
//            $(this).parent().animate({
//                width: '300vw',
//                left: leftProp
//            });
//            
//             $('.features article >figure').animate({
//                width: '40%' 
//            });
//            
//            
//        }
//        
//         if ($(window).width() > 1024) {
//             $('img[alt="oldcouple3c"]').css({
//               right: '0px' 
//            });
//         }
//        
//        
//        
//        $('.features img').removeClass('blur');
//        
////        $('.features article figure').animate({
////           width: '40%'
////        });
//        
//        $('.features .content').delay(100).fadeIn();
//        
//        if ($(window).width() < 768) {
//            $('.exit').fadeIn();
//        } else {
//            $('.exit, .arrow_left, .arrow_right').fadeIn();
//        }
//        
//        
//        
//    
////        if (posLeft === 0) {
////            $('.arrow_left').hide();
////        } else {
////            $('.arrow_left').show();
////        }
//        
//    });
    
    $('.exit').click(function(){
        $('.features .content').fadeOut();
        $('.threeFeat').animate({
           width: '100vw',
            left: '0'}, {complete: function() {
                $('.features article >figure').animate({
                    width: '100%'});
                }
            });
                
        $('.features figure img').addClass('blur');
        $('.color1').css('display','block');
        
         $('.content').removeAttr('style');
        
       
        
//        if ($(window).width() < 768) {
//             $('.features article').animate({
//                height: '25vh' 
//            });
//        } 
        
        $('.features article').removeAttr('style');
        
        $('.threeFeat article figure img').addClass('blur_2');
        
        $('.arrow_left, .arrow_right').fadeOut();
        
        $('.threeFeat article figure').removeAttr('style');
        
        $('img[alt="oldcouple3c"]').removeAttr('style');
        
        
        
        $(this).fadeOut();
    });
    
    
    $(window).resize(function(){
       $('.threeFeat').css({
           left: 'auto'
       })
    });
    
    $('.arrow_left').click(function(){
        
        posLeft = posLeft + $('.features article').outerWidth();
        $('.threeFeat').animate({
           left: posLeft 
        });

        
    });
    
     $('.arrow_right').click(function(){
        
        posLeft = posLeft - $('.features article').outerWidth();
        $('.threeFeat').animate({
           left: posLeft
        });
        
    });
    
    $('.img1').parallax({
        imageSrc: "../pulseband/img/oldcouple1.jpg",
        positionX: '-200px'
    });
    
});