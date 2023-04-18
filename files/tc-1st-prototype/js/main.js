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

    },
    // like callback
    onLike: function (item) {
        // set the status text
        var selectedItem = $("." + item[0].className).children(".productName").attr("data");
        $("#status").html("Like image " + (item.index() + 1));
        console.log(selectedItem);
        var appendProducts;
        
        var outfitNum = 1;
        
        $(".outfit-list").append("<li class="outfits" data="outfit"+outfitNum+""></li>");

//        for (i = 0; i <= outfits[selectedItem].length; i++) {
//            $("<li class="outfits" data="outfit"+outfitNum+""></li>").append(
//
//                ("<li class="outfits">") +
//                ("<div class="outfit-scroll-area">") +
//                ("<article class="individual-product">") +
//                ("<figure>") +
//                ("<img src=""+outfits[selectedItem][i].imgPath+"" alt="" class="product-image">") +
//                ("<figcaption class="product-description">")+
//                outfits[selectedItem][i].itemName + ("<br>") +  outfits[selectedItem][i].brand + 
//                ("</figcaption></figure>") +
//                ("<p class="price">$<span class="number-price">")+
//                outfits[selectedItem][i].price + 
//                ("</p><button class="add-indiv-trunk">Add</button></article></div><button class="add-outfit-trunk">Add entire outfit</button></li>")
//
//
//            );
//        }




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
});