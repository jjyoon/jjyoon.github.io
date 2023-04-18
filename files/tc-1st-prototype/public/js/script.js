$(document).ready(function () {

    // check clothing categories

    var paneNum = 1;

    $("body .categories-list").on("click", 'input[type="checkbox"]', function () {
        if ($(this).prop("checked")) {

            var clothingCatName = $(this).attr("id");
            //            var feedbackCard = $('#tinderslide li .productName[data*="' + clothingCatName + '"]').parent("li");
            //
            //            feedbackCard.fadeIn();

            if (selectedGender == 'women') {

                var genderForJson = 'w' + clothingCatName;
                console.log(genderForJson);

                for (i = 1; i < 6; i++) {
                    $('#tinderslide ul').append(
                        ('<li class="pane' + paneNum + '">') +
                        ('<figure>') +
                        ('<img src="img/' + selectedGender + '/' + clothingCatName + '_' + [i] + '.png" alt="">') +
                        ('</figure>') +
                        ('<div class="productName" data="' + clothingCatName + [i] + '" data-set="' + clothingCatName + '"><p>' + window[genderForJson][i - 1].brand + '<br>$' + window[genderForJson][i - 1].price + '</p></div>') +
                        ('<div class="actions"><a href="#" class="dislike"><i></i></a><a href="#" class="like"><i></i></a></div></li>')
                    );

                    paneNum++;
                }

            } else if (selectedGender == 'men') {

                var genderForJson = 'm' + clothingCatName;
                console.log(genderForJson);

                for (i = 1; i < 6; i++) {
                    $('#tinderslide ul').append(
                        ('<li class="pane' + paneNum + '">') +
                        ('<figure>') +
                        ('<img src="img/' + selectedGender + '/' + clothingCatName + '_' + [i] + '.png" alt="">') +
                        ('</figure>') +
                        ('<div class="productName" data="' + clothingCatName + [i] + '" data-set="' + clothingCatName + '"><p>' + window[genderForJson][i - 1].brand + '<br>$' + window[genderForJson][i - 1].price + '</p></div>') +
                        ('<div class="actions"><a href="#" class="dislike"><i></i></a><a href="#" class="like"><i></i></a></div></li>')
                    );

                    paneNum++;
                }
            }

            if ($('.categories-list input[type="checkbox"]:checked').length >= 1) {
                $('.clothing-categories input[type="submit"]').addClass('ready-to-continue');
            }


        } else {
            var clothingCatName = $(this).attr("id");
            var feedbackCard = $('#tinderslide li .productName[data*="' + clothingCatName + '"]').parent("li");
            feedbackCard.remove();

            if ($('.categories-list input[type="checkbox"]:checked').length < 1) {
                $('.clothing-categories input[type="submit"]').removeClass('ready-to-continue');
            }

        }
    });

    // function if tinder list = 0

    function tinderZero() {

        if ($('#tinderslide ul li:visible').size() < 2) {
            $('#tinderslide ul').append('<li class="pane0"><div class="pane-container"><p>Thanks for your feedback! Continue to see your curated outfits!</p><button class="continue-to-outfits">Continue</button></div></li>');

            $('.counter').fadeOut();
            $('.actions').fadeOut();
        }

    }


    var outfitNum = 1;

    // function add outfit 
    function addOutfit() {
        $(".outfit-list").append('<li class="outfits" data="outfit' + outfitNum + '"><h3 class="outfit-number">Outfit ' + outfitNum + '</h3><div class="outfit-scroll-area"><ul class="outfit-scroll-area-inner"></ul></div><button class="add-outfit-trunk">Add entire outfit</button></li>');

        for (i = 0; i < outfits[selectedItem].length; i++) {

            $('.outfits[data="outfit' + outfitNum + '"] .outfit-scroll-area-inner').append(
                ('<li class="outfit-scroll-indiv"><article class="individual-product">') +
                ('<figure class="product-image">') +
                ('<img src="" alt="">') +
                ('<figcaption class="product-description">') +
                outfits[selectedItem][i].itemName + ("<br>") + outfits[selectedItem][i].brand +
                ("</figcaption></figure>") +
                ('<p class="price">$<span class="number-price">') +
                outfits[selectedItem][i].price +
                ('</p><button class="add-indiv-trunk">Add</button></article></li>'));

        }

        outfitNum = outfitNum + 1;

    }



    var likedProducts = {}

    var numLikedProducts = [];

    var selectedItem;

    var selectedItemSet;

    var remainProd = [];

    //shuffle list of products   

    $.fn.shuffle = function () {

        var allElems = this.get(),
            getRandom = function (max) {
                return Math.floor(Math.random() * max);
            },
            shuffled = $.map(allElems, function () {
                var random = getRandom(allElems.length),
                    randEl = $(allElems[random]).clone(true)[0];
                allElems.splice(random, 1);
                return randEl;
            });

        this.each(function (i) {
            $(this).replaceWith($(shuffled[i]));
        });

        return $(shuffled);

    };

    // sentence case

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    // go to that gender of clothing

    var selectedGender;

    $('.gender-clothing').click(function () {
        var womenClothing = ["tops", "jeans", "dresses", "shoes", "pants", "sweaters"];
        var menClothing = ["shirts", "jeans", "shoes", "sportcoats", "sweaters", "belts"];

        selectedGender = $(this).attr('data');

        if (selectedGender == 'women') {

            for (i = 0; i < womenClothing.length; i++) {
                $('.categories-list').append(
                    ('<li class="clothingCategory">') +
                    ('<i class="fa fa-check" aria-hidden="true"></i>') +
                    ('<input type="checkbox" name="clothingCat" id="' + womenClothing[i] + '">') +
                    ('<label for="' + womenClothing[i] + '">' + toTitleCase(womenClothing[i]) + '</label></li>')
                );
            }

        } else if (selectedGender == 'men') {

            for (i = 0; i < menClothing.length; i++) {
                $('.categories-list').append(
                    ('<li class="clothingCategory">') +
                    ('<i class="fa fa-check" aria-hidden="true"></i>') +
                    ('<input type="checkbox" name="clothingCat" id="' + menClothing[i] + '">') +
                    ('<label for="' + menClothing[i] + '">' + toTitleCase(menClothing[i]) + '</label></li>')
                );
            }
        }

        $(this).parents('.content-blocks').fadeOut(300).next().fadeIn(300);


    });

    //go to product feedback

    $('.clothing-categories input[type="submit"]').click(function (e) {
        e.preventDefault();

        $(this).parents('.content-blocks').fadeOut(300).next().fadeIn(300);

        $('.indiv-header:visible').fadeOut(300).next().fadeIn(300);

        $('#tinderslide ul li').shuffle();

        var numProdFeedbackLeft = $('#tinderslide ul li:visible').size();
        $('.counter .number-prod-left').text(numProdFeedbackLeft);

        //        var $hiddenTinder = $("#tinderslide ul").find(":hidden");
        //        $hiddenTinder.remove();
        /**
         * jTinder initialization
         */
        $("#tinderslide").jTinder({
            // dislike callback
            onDislike: function (item) {
                // set the status text
                var selectedItem = $("." + item[0].className).children(".productName").attr("data");
                $("#status").html("Dislike image " + (item.index() + 1));
                console.log(selectedItem);

                numProdFeedbackLeft--;
                $('.counter .number-prod-left').text(numProdFeedbackLeft);

                tinderZero();


            },
            // like callback
            onLike: function (item) {
                // set the status text
                selectedItem = $("." + item[0].className).children(".productName").attr("data");
                selectedItemSet = $("." + item[0].className).children(".productName").attr("data-set");
                $("#status").html("Like image " + (item.index() + 1));
                console.log(selectedItem);
                console.log(selectedItemSet);
                var appendProducts;

                // add to array of liked items

                likedProducts[selectedItemSet] = likedProducts[selectedItemSet] || [];
                likedProducts[selectedItemSet].push(selectedItem);
                numLikedProducts.push(selectedItem);

                console.log(numLikedProducts);

                numProdFeedbackLeft--;
                $('.counter .number-prod-left').text(numProdFeedbackLeft);

                //                console.log(Object.keys(likedProducts));
                //
                //                console.log(Object.keys(likedProducts).length);



                tinderZero();

            },
            animationRevertSpeed: 200,
            animationSpeed: 400,
            threshold: 1,
            likeSelector: ".like",
            dislikeSelector: ".dislike"
        });

        /**
         * Set button action to trigger jTinder like & dislike.
         */
        $(".actions .like, .actions .dislike").click(function (e) {
            e.preventDefault();
            $("#tinderslide").jTinder($(this).attr("class"));

            tinderZero();
        });

    });

    // add outfits through json

    function addOutfitsFromJson(jsonPath) {

        $('.outfits[data="outfit' + outfitNum + '"] .outfit-scroll-area-inner').append(
            ('<li class="outfit-scroll-indiv"><article class="individual-product" data="' + productId + '">') +
            ('<figure class="product-image">') +
            ('<img src="img/' + selectedGender + '/' + window[genderForOutfits][numLikedProducts[i]][j].imgPath + '" alt="">') +
            ('<figcaption class="product-description">') +
            window[genderForOutfits][numLikedProducts[i]][j].itemName + ("<br>") + window[genderForOutfits][numLikedProducts[i]][j].brand +
            ("</figcaption></figure>") +
            ('<p class="price">$<span class="number-price">') +
            window[genderForOutfits][numLikedProducts[i]][j].price +
            ('</p><button class="add-indiv-trunk">Add</button></article></li>'));

        productId++;

    }


    //go through array and see if it's less than 5 or more than 10

    function lessMoreOutfits() {

        var productId = 1;

        if (selectedGender == "women") {
            var genderForOutfits = 'wOutfits';
            var genderForOtherOutfits = 'wOutfitFill';

        } else if (selectedGender == "men") {
            var genderForOutfits = 'mOutfits';
            var genderForOtherOutfits = 'mOutfitFill';
        }


        if (numLikedProducts.length < 5) {

            for (i = 0; i < numLikedProducts.length; i++) {

                $(".outfit-list").append('<li class="outfits" data="outfit' + outfitNum + '"><h3 class="outfit-number">Outfit ' + outfitNum + '</h3><div class="outfit-scroll-area"><ul class="outfit-scroll-area-inner"></ul></div><button class="add-outfit-trunk">Add entire outfit</button></li>');


                for (j = 0; j < window[genderForOutfits][numLikedProducts[i]].length; j++) {

                    $('.outfits[data="outfit' + outfitNum + '"] .outfit-scroll-area-inner').append(
                        ('<li class="outfit-scroll-indiv"><article class="individual-product" data="' + productId + '">') +
                        ('<figure class="product-image">') +
                        ('<img src="img/' + selectedGender + window[genderForOutfits][numLikedProducts[i]][j].imgPath + '" alt="">') +
                        ('<figcaption class="product-description">') + window[genderForOutfits][numLikedProducts[i]][j].brand +
                        ("</figcaption></figure>") +
                        ('<p class="price">$<span class="number-price">') +
                        window[genderForOutfits][numLikedProducts[i]][j].price +
                        ('</p><button class="add-indiv-trunk">Add</button></article></li>'));

                    productId++;

                }


                outfitNum = outfitNum + 1;
            }

            for (k = 0; k < 5 - numLikedProducts.length; k++) {

                $(".outfit-list").append('<li class="outfits" data="outfit' + outfitNum + '"><h3 class="outfit-number">Outfit ' + outfitNum + '</h3><div class="outfit-scroll-area"><ul class="outfit-scroll-area-inner"></ul></div><button class="add-outfit-trunk">Add entire outfit</button></li>');

                for (l = 0; l < window[genderForOtherOutfits][k].length; l++) {

                    $('.outfits[data="outfit' + outfitNum + '"] .outfit-scroll-area-inner').append(
                        ('<li class="outfit-scroll-indiv"><article class="individual-product" data="' + productId + '">') +
                        ('<figure class="product-image">') +
                        ('<img src="img/' + selectedGender + window[genderForOtherOutfits][k][l].imgPath + '" alt="">') +
                        ('<figcaption class="product-description">') + window[genderForOtherOutfits][k][l].brand +
                        ("</figcaption></figure>") +
                        ('<p class="price">$<span class="number-price">') +
                        window[genderForOtherOutfits][k][l].price +
                        ('</p><button class="add-indiv-trunk">Add</button></article></li>'));

                    productId++;

                }

                outfitNum = outfitNum + 1;

            }

        } else if (numLikedProducts.length >= 5 && numLikedProducts.length <= 10) {

            for (i = 0; i < numLikedProducts.length; i++) {

                $(".outfit-list").append('<li class="outfits" data="outfit' + outfitNum + '"><h3 class="outfit-number">Outfit ' + outfitNum + '</h3><div class="outfit-scroll-area"><ul class="outfit-scroll-area-inner"></ul></div><button class="add-outfit-trunk">Add entire outfit</button></li>');


                for (j = 0; j < window[genderForOutfits][numLikedProducts[i]].length; j++) {

                    $('.outfits[data="outfit' + outfitNum + '"] .outfit-scroll-area-inner').append(
                        ('<li class="outfit-scroll-indiv"><article class="individual-product" data="' + productId + '">') +
                        ('<figure class="product-image">') +
                        ('<img src="img/' + selectedGender + window[genderForOutfits][numLikedProducts[i]][j].imgPath + '" alt="">') +
                        ('<figcaption class="product-description">') + window[genderForOutfits][numLikedProducts[i]][j].brand +
                        ("</figcaption></figure>") +
                        ('<p class="price">$<span class="number-price">') +
                        window[genderForOutfits][numLikedProducts[i]][j].price +
                        ('</p><button class="add-indiv-trunk">Add</button></article></li>'));

                    productId++;

                }


                outfitNum = outfitNum + 1;
            }


        } else if (numLikedProducts.length > 10) {



            for (var property in likedProducts) {


                $(".outfit-list").append('<li class="outfits" data="outfit' + outfitNum + '"><h3 class="outfit-number">Outfit ' + outfitNum + '</h3><div class="outfit-scroll-area"><ul class="outfit-scroll-area-inner"></ul></div><button class="add-outfit-trunk">Add entire outfit</button></li>');


                for (j = 0; j < window[genderForOutfits][likedProducts[property][0]].length; j++) {

                    $('.outfits[data="outfit' + outfitNum + '"] .outfit-scroll-area-inner').append(
                        ('<li class="outfit-scroll-indiv"><article class="individual-product" data="' + productId + '">') +
                        ('<figure class="product-image">') +
                        ('<img src="img/' + selectedGender + window[genderForOutfits][likedProducts[property][0]][j].imgPath + '" alt="">') +
                        ('<figcaption class="product-description">') + window[genderForOutfits][likedProducts[property][0]][j].brand +
                        ("</figcaption></figure>") +
                        ('<p class="price">$<span class="number-price">') +
                        window[genderForOutfits][likedProducts[property][0]][j].price +
                        ('</p><button class="add-indiv-trunk">Add</button></article></li>'));

                    productId++;

                }


                outfitNum = outfitNum + 1;

                likedProducts[property].shift();
                remainProd = remainProd.concat(likedProducts[property]);

                function shuffle(array) {
                    var currentIndex = array.length,
                        temporaryValue, randomIndex;

                    // While there remain elements to shuffle...
                    while (0 !== currentIndex) {

                        // Pick a remaining element...
                        randomIndex = Math.floor(Math.random() * currentIndex);
                        currentIndex -= 1;

                        // And swap it with the current element.
                        temporaryValue = array[currentIndex];
                        array[currentIndex] = array[randomIndex];
                        array[randomIndex] = temporaryValue;
                    }

                    return array;
                }

                var randProd = shuffle(remainProd);
                console.log(randProd);

            }

            for (i = 0; i < 10 - Object.keys(likedProducts).length; i++) {

                $(".outfit-list").append('<li class="outfits" data="outfit' + outfitNum + '"><h3 class="outfit-number">Outfit ' + outfitNum + '</h3><div class="outfit-scroll-area"><ul class="outfit-scroll-area-inner"></ul></div><button class="add-outfit-trunk">Add entire outfit</button></li>');


                for (k = 0; k < window[genderForOutfits][randProd[i]].length; k++) {

                    $('.outfits[data="outfit' + outfitNum + '"] .outfit-scroll-area-inner').append(
                        ('<li class="outfit-scroll-indiv"><article class="individual-product">') +
                        ('<figure class="product-image">') +
                        ('<img src="img/' + selectedGender + window[genderForOutfits][randProd[i]][k].imgPath + '" alt="">') +
                        ('<figcaption class="product-description">') + window[genderForOutfits][randProd[i]][k].brand +
                        ("</figcaption></figure>") +
                        ('<p class="price">$<span class="number-price">') +
                        window[genderForOutfits][randProd[i]][k].price +
                        ('</p><button class="add-indiv-trunk">Add</button></article></li>'));

                }


                outfitNum = outfitNum + 1;
            }


        }
    }
    //continue to curated outfits

    $('.body').on('click', '.continue-to-outfits', function (e) {
        console.log(numLikedProducts);
        lessMoreOutfits();

        $(this).parents('.content-blocks').fadeOut(300).next().fadeIn(300);
        $('.trunk-cart').fadeIn(300);
    });

    $('body').on('touchstart click', '.continue-to-outfits', function (e) {
        console.log(numLikedProducts);
        lessMoreOutfits()

        $(this).parents('.content-blocks').fadeOut(300).next().fadeIn(300);
        $('.view-trunk').fadeIn(300);
    });

    //view cart
    $('.view-trunk').click(function () {
        $('.trunk-cart').toggleClass('cart-top');

        var viewTrunkHeader = $(this).find('h1');

        $(viewTrunkHeader).text() == "View trunk" ? $(viewTrunkHeader).text("Close trunk") : $(viewTrunkHeader).text("View trunk");
    });

    //add item to trunk

    var totalTrunkPrice = 0;

    $('body .outfit-list').on('click', '.add-indiv-trunk', function (e) {
        var $selectedProduct = $(this).parents('.individual-product');
        var clonedProduct = $selectedProduct.clone();

        $(this).text('Added');

        $('.trunk-content').append(clonedProduct);
        $('.trunk-content .add-indiv-trunk').text('Remove');

        var productPrice = parseInt($($selectedProduct).find('.number-price').text());

        totalTrunkPrice = totalTrunkPrice + productPrice;

        console.log(totalTrunkPrice);

        $('.trunk-price-number').text(totalTrunkPrice);


        //        $('.trunk-content .individual-product').each(function () {
        //            if ($(this).find('.product-description').text() == $selectedProduct.find('.product-description').text() && $(this).find('.number-price').text() == $selectedProduct.find('.number-price').text()) {
        //
        //            } else {
        //                $('.trunk-content').append(clonedProduct);
        //                $('.trunk-content .add-indiv-trunk').text('Remove');
        //
        //                var productPrice = parseInt($($selectedProduct).find('.number-price').text());
        //
        //                totalTrunkPrice = totalTrunkPrice + productPrice;
        //
        //                console.log(totalTrunkPrice);
        //
        //                $('.trunk-price-number').text(totalTrunkPrice);
        //            }
        //        });


    });

    //add outfit to trunk

    $('body .outfit-list').on('click', '.add-outfit-trunk', function (e) {
        var $selectedProduct = $(this).siblings('.outfit-scroll-area').find('.individual-product');
        var clonedProduct = $selectedProduct.clone();

        $(this).text('Added outfit');
        $selectedProduct.find('.add-indiv-trunk').text('Added');

        $('.trunk-content').append(clonedProduct);
        $('.trunk-content .add-indiv-trunk').text('Remove');

        var productPrice = 0;

        $($selectedProduct).find('.number-price').each(function () {
            productPrice += parseInt($(this).html());
        });


        totalTrunkPrice = totalTrunkPrice + productPrice;

        $('.trunk-price-number').text(totalTrunkPrice);
    });

    //remove item

    $('body .trunk-content').on('click', '.add-indiv-trunk', function (e) {
        var $selectedProduct = $(this).parents('.individual-product');
        var selectedProductDataNum = $selectedProduct.attr('data');
        $selectedProduct.slideUp();
        setTimeout(function () {
            $selectedProduct.remove();
        }, 500);

        var productPrice = parseInt($($selectedProduct).find('.number-price').text());

        totalTrunkPrice = totalTrunkPrice - productPrice;

        console.log(totalTrunkPrice);

        $('.trunk-price-number').text(totalTrunkPrice);

        $('.outfit-scroll-indiv .individual-product[data="' + selectedProductDataNum + '"] ').find('.add-indiv-trunk').text('Add');
    });



});

// make sure when first continue is hit, those that are not showing are gone