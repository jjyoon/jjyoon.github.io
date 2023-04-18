// time out message and submit starter trunks
setTimeout(function(){
  $("body .Message[data='0']").replaceWith(`
    <div class="Message" data="1">
      <div class="Message-icon">
        <div class="Message-icon">
          <div class="Message-iconImage"></div>
        </div>
      </div>
      <div class="Message-parts">
        <div class="Message-partHeader"><strong>Ashley</strong><small>${moment().format("h:mm a")}</small></div>
        <div class="Message-part"><span>Hi ${customerName}! I'm your stylist, Ashley. Your style profile looks awesome, thanks for filling that out.</span></div>
      </div>
    </div>
    <!-- starter trunk card -->
    <div class="Message" data="2">
      <div class="Message-icon" style="opacity: 0;">
        <div class="Message-icon">
          <div class="Message-iconImage"></div>
        </div>
      </div>
      <div class="Message-parts">
        <div class="Message-part">
          <span>Here are a few outfits I would love your feedback on. Give them a look and we'll begin creating your first trunk!</span>
        </div>
        <div class="Message-part">
          <div class="starter-trunk-card">
            <a href="curated-outfits.html" class="starter-trunk-card__link">
              <div class="starter-trunk-card__products">
                <div class="starter-trunk-product__container">
                  <img src="img/outfits/top1.png" alt="" class="starter-trunk-product__image">
                </div>
                <div class="starter-trunk-product__container">
                  <img src="img/outfits/bottom1.png" alt="" class="starter-trunk-product__image">
                </div>
                <div class="starter-trunk-product__container">
                  <img src="img/outfits/shoe1.png" alt="" class="starter-trunk-product__image">
                </div>
                <div class="starter-trunk-product__container">
                  <img src="img/outfits/top2.png" alt="" class="starter-trunk-product__image">
                </div>
              </div>
              <div class="starter-trunk-card__button">View your outfits</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  `);
},3000);

//if clicked view-details
$("a.outfit-item__details-link").click(function(e) {
  e.preventDefault()
  $(".outfit-item--modal").addClass("show-modal");
  $("body").addClass("no-scroll");
});

$(".outfit-item--modal .Trunk-back-arrow").click(function(e) {
  e.preventDefault();
  $(".outfit-item--modal").removeClass("show-modal");
  $("body").removeClass("no-scroll");
});

//add products from json
for (var products in outfitItems["ids"]) {
  let productItem = $(`#${outfitItems["ids"][products]["id"]}`);

  // change image
  productItem.find(".outfit-item__photo").attr("src", `img/outfits/${outfitItems["ids"][products]["imgPath"]}.png`);

  //change brand
  productItem.find(".outfit-item__brand").text(outfitItems["ids"][products]["brand"]);

  //change price
  productItem.find(".outfit-item__price").text(outfitItems["ids"][products]["price"]);
}



// if disliked clicked
$("body").on("click", "button.outfit-item__dislike", function(e) {
  e.preventDefault();
  let productItem = $(this).closest(".outfit-item");
  let productItemId = productItem.attr("id");

  productItem.replaceWith(`
    <div class="outfit-item--dislike" id="${productItemId}">
      <a href="" class="outfit-item__photo-link">
        <img src="img/outfits/${outfitItems["ids"][productItemId]["imgPath"]}.png" alt="" class="outfit-item__photo">
      </a>
      <form action="" class="outfit-item__feedback-form">
        <div class="outfit-item__form-options">
          <button class="outfit-item__feedback-option" data-value="not-my-style">Not my style</button>
          <button class="outfit-item__feedback-option" data-value="dont-need-now">Don't need it now</button>
          <button class="outfit-item__feedback-option" data-value="dislike-color">Dislike color</button>
          <button class="outfit-item__feedback-option" data-value="dislike-pattern">Dislike pattern</button>
          <button class="outfit-item__feedback-option" data-value="too-expensive">Too expensive</button>
          <button class="outfit-item__feedback-option" data-value="own-similar">Own similar</button>
        </div>
        <textarea class="outfit-item__form-textarea" placeholder="Leave a note about this item for your stylist"></textarea>
        <div class="outfit-item__buttons">
          <button class="outfit-item__cancel">Cancel</button>
          <button class="outfit-item__save">Save</button>
        </div>
      </form>
    </div>
  `)
});

// if cancel from disliked clicked
$("body").on("click", "button.outfit-item__cancel", function(e) {
  e.preventDefault();
  let productItem = $(this).closest(".outfit-item--dislike");
  let productItemId = productItem.attr("id");

  productItem.replaceWith(`
    <div class="outfit-item" id="${productItemId}">
      <a href="" class="outfit-item__photo-link">
        <img src="img/outfits/${outfitItems["ids"][productItemId]["imgPath"]}.png" alt="" class="outfit-item__photo">
      </a>
      <div class="outfit-item__details">
        <div class="outfit-item__text">
          <div class="outfit-item__brand">${outfitItems["ids"][productItemId]["brand"]}</div>
          <div class="outfit-item__price">${outfitItems["ids"][productItemId]["price"]}</div>
          <a href="" class="outfit-item__details-link">View details</a>
        </div>
        <div class="outfit-item__buttons">
          <button class="outfit-item__dislike">
            <img src="img/dislike.svg" alt="">
          </button>
          <button class="outfit-item__try-on">Try on</button>
        </div>
      </div>
    </div>
  `)
});

//if feedback options are selected
$("body").on("click", "button.outfit-item__feedback-option", function(e) {
  e.preventDefault();
  let productItem = $(this).closest(".outfit-item--dislike");
  let productItemId = productItem.attr("id");

  $(this).toggleClass("active");

  //add feedback to object


});

//save dislike feedback
$("body").on("click", "button.outfit-item__save", function(e) {
  e.preventDefault();
  let productItem = $(this).closest(".outfit-item--dislike");
  let productItemId = productItem.attr("id");
  outfitItems["ids"][productItemId]["feedback"] = [];
  outfitItems["ids"][productItemId]["feedbackText"] = [];
  let connectedFeedback = "";

  //add feedback to object
  $(`div#${productItemId} button.outfit-item__feedback-option`).each(function(e){
    if ($(this).hasClass('active')) {
      let feedbackValue = $(this).attr("data-value");
      let feedbackText = $(this).text();
      outfitItems["ids"][productItemId]["feedbackText"].push(feedbackText);
      connectedFeedback = '"' + outfitItems["ids"][productItemId]["feedbackText"].join(', ') + '"';
      outfitItems["ids"][productItemId]["feedback"].push(feedbackValue);
    }
  });

  let negativeFeedbackElement = `
  <div class="outfit-item--negative" id="${productItemId}">
    <a href="" class="outfit-item__photo-link">
      <img src="img/outfits/${outfitItems["ids"][productItemId]["imgPath"]}.png" alt="" class="outfit-item__photo">
    </a>
    <div class="outfit-item__details">
      <div class="outfit-item__confirmed">
        <div class="outfit-item__negative-feedback">
          <span>Disliked</span>
          <div class="outfit-item__negative-feedback-specific">${connectedFeedback}</div>
        </div>
      </div>
        <button class="outfit-item__change">Change</button>
    </div>
  </div>
  `

  productItem.replaceWith(negativeFeedbackElement);
});

//change from disliked feedback
$("body").on("click", "button.outfit-item__change", function(e) {
  e.preventDefault();

  if ($(this).parents().hasClass('outfit-item--positive')) {
    let productItem = $(this).closest(".outfit-item--positive");
    let productItemId = productItem.attr("id");
    productItem.replaceWith(`
      <div class="outfit-item" id="${productItemId}">
        <a href="" class="outfit-item__photo-link">
          <img src="img/outfits/${outfitItems["ids"][productItemId]["imgPath"]}.png" alt="" class="outfit-item__photo">
        </a>
        <div class="outfit-item__details">
          <div class="outfit-item__text">
            <div class="outfit-item__brand">${outfitItems["ids"][productItemId]["brand"]}</div>
            <div class="outfit-item__price">${outfitItems["ids"][productItemId]["price"]}</div>
            <a href="" class="outfit-item__details-link">View details</a>
          </div>
          <div class="outfit-item__buttons">
            <button class="outfit-item__dislike">
              <img src="img/dislike.svg" alt="">
            </button>
            <button class="outfit-item__try-on">Try on</button>
          </div>
        </div>
      </div>
    `)
  } else if ($(this).parents().hasClass('outfit-item--negative')) {
    let productItem = $(this).closest(".outfit-item--negative");
    let productItemId = productItem.attr("id");
    outfitItems["ids"][productItemId]["feedback"];

    productItem.replaceWith(`
      <div class="outfit-item--dislike" id="${productItemId}">
        <a href="" class="outfit-item__photo-link">
          <img src="img/outfits/${outfitItems["ids"][productItemId]["imgPath"]}.png" alt="" class="outfit-item__photo">
        </a>
        <form action="" class="outfit-item__feedback-form">
          <div class="outfit-item__form-options">
            <button class="outfit-item__feedback-option" data-value="not-my-style">Not my style</button>
            <button class="outfit-item__feedback-option" data-value="dont-need-now">Don't need it now</button>
            <button class="outfit-item__feedback-option" data-value="dislike-color">Dislike color</button>
            <button class="outfit-item__feedback-option" data-value="dislike-pattern">Dislike pattern</button>
            <button class="outfit-item__feedback-option" data-value="too-expensive">Too expensive</button>
            <button class="outfit-item__feedback-option" data-value="own-similar">Own similar</button>
          </div>
          <textarea class="outfit-item__form-textarea" placeholder="Leave a note about this item for your stylist"></textarea>
          <div class="outfit-item__buttons">
            <button class="outfit-item__delete-feedback">Delete Feedback</button>
            <button class="outfit-item__save">Save</button>
          </div>
        </form>
      </div>
    `)

    for (i=0; i<outfitItems["ids"][productItemId]["feedback"].length; i++) {
      $(`#${productItemId} .outfit-item__feedback-option[data-value="${outfitItems["ids"][productItemId]["feedback"][i]}"]`).addClass("active");
    }
  }
});

// delete feedback
$("body").on("click", "button.outfit-item__delete-feedback", function(e) {
  e.preventDefault();
  let productItem = $(this).closest(".outfit-item--dislike");
  let productItemId = productItem.attr("id");

  productItem.replaceWith(`
    <div class="outfit-item" id="${productItemId}">
      <a href="" class="outfit-item__photo-link">
        <img src="img/outfits/${outfitItems["ids"][productItemId]["imgPath"]}.png" alt="" class="outfit-item__photo">
      </a>
      <div class="outfit-item__details">
        <div class="outfit-item__text">
          <div class="outfit-item__brand">${outfitItems["ids"][productItemId]["brand"]}</div>
          <div class="outfit-item__price">${outfitItems["ids"][productItemId]["price"]}</div>
          <a href="" class="outfit-item__details-link">View details</a>
        </div>
        <div class="outfit-item__buttons">
          <button class="outfit-item__dislike">
            <img src="img/dislike.svg" alt="">
          </button>
          <button class="outfit-item__try-on">Try on</button>
        </div>
      </div>
    </div>
  `)
});

// tryon item
$("body").on("click", "button.outfit-item__try-on", function(e) {
  e.preventDefault();
  let productItem = $(this).closest(".outfit-item");
  let productItemId = productItem.attr("id");

  productItem.replaceWith(`
    <div class="outfit-item--positive" id="${productItemId}">
      <a href="" class="outfit-item__photo-link">
        <img src="img/outfits/${outfitItems["ids"][productItemId]["imgPath"]}.png" alt="" class="outfit-item__photo">
      </a>
      <div class="outfit-item__details">
        <div class="outfit-item__confirmed">
          <div class="outfit-item__positive">
            &#10004; Added to trunk
          </div>
        </div>
          <button class="outfit-item__change">Change</button>
      </div>
    </div>
  `)
});

//messages scroll to bottom of container
$('.ThreadView-body').scrollTop($('.ThreadView-body')[0].scrollHeight);
