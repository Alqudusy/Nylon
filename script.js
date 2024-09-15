// const productInfo = "https://api.jsonbin.io/v3/b/66dc7b91e41b4d34e42b9def";
// const apiKey = "$2a$10$sTKU6rZChswPcKFZFFkmwONolnDcWb7mAogz1feJa.AtX7SMQ68Oi";

// fetch(productInfo, {
//     headers: {
//         "X-Master-key": apiKey
//     }
// })
// .then(response => response.json())
// .then(data => {
//     const products = data.record;
//     console.log(products);
//     products.forEach(product => {
//         const mainDiv = document.querySelector('.featured-collection-div');
//         const productDiv = document.createElement('div');
//         productDiv.className = 'product';

//         const productImage = document.createElement('img');
//         productImage.src = product.image;
//         productImage.className = 'image';

//         const productDescription = document.createElement('p');
//         productDescription.innerText = product.description;
//         productDescription.className = 'description'

//         const productPrice = document.createElement('p');
//         productPrice.innerText = product.price;
//         productPrice.className = 'price';

//         const quickVeiwButton = document.createElement('button');
//         quickVeiwButton.textContent = 'Quick veiw'
//         quickVeiwButton.className = "quick-veiw-button";

//         productDiv.appendChild(productImage);
//         productDiv.appendChild(productDescription);
//         productDiv.appendChild(productPrice);
//         productDiv.appendChild(quickVeiwButton);

//         mainDiv.appendChild(productDiv);
//     });
// })
// .catch(error => {
//     console.error('Error fetching the products data', error);
//     alert('Please check your internet connetion' + " " + error);
// });
const productDetails = [];

$(function () {
  const productInfo = 'https://api.jsonbin.io/v3/b/66dc7b91e41b4d34e42b9def';
  const apiKey = '$2a$10$sTKU6rZChswPcKFZFFkmwONolnDcWb7mAogz1feJa.AtX7SMQ68Oi';

  $.ajax({
      url: productInfo,
      type: 'get',
      headers: {
          'X-Master-Key': apiKey
      },
      success: function (response) {
          const products = response.record;
          console.log(products);
          products.forEach(product => {
              const $mainDiv = $('.featured-collection-div');
              
              // Create product div
              const $productDiv = $('<div></div>').addClass('product');
              
              // Create product image
              const $productImage = $('<img>').attr('src', product.image).addClass('image');
              
              // Create product description
              const $productDescription = $('<p></p>').text(product.description).addClass('description');
              
              // Create product price
              const $productPrice = $('<p></p>').text(product.price).addClass('price');
              
              // Create quick view button
              const $quickViewButton = $('<button></button>').text('Quick view').addClass('quick-view-button');
              
              // Append all elements to the productDiv
              $productDiv.append($productImage, $productDescription, $productPrice, $quickViewButton);
              
              // Append the productDiv to the mainDiv
              $mainDiv.append($productDiv);

              // Attach click event to the productDiv to log product details
              $productDiv.on('click', () => {
                const $quickViewOverlay = $('<div></div>').addClass('quick-view-overlay');
                const $quickView = $('<div></div>').addClass('quick-view');
                const $quickViewImage = $('<img>').attr('src', product.image);
                const $quickViewInfo = $('<div></div>').addClass('quick-view-info');
                const $closeQuickView = $('<p></p>').append('&times;').addClass('close-quick-view');
                const $quickViewDescription = $('<h2></h2>').text(product.description).addClass('cart-description');
                const $numberOfOrders = $('<p></p>').text('36 orders').addClass('numbers-of-orders');
                const $quickViewprice = $('<p></p>').text(product.price).addClass('quick-view-price');
                const $addToCartBtn = $('<button></button>').text('ADD TO CART').addClass('add-to-cart-btn');
                const $buyNowBtn = $('<button></button>').text('BUY NOW').addClass('buy-now-btn');
                const $viewMoreBtn = $('<button></button>').text('VIEW MORE').addClass('view-more-btn');

                $quickViewInfo.append($closeQuickView, $quickViewDescription, $numberOfOrders, $quickViewprice, $addToCartBtn, $buyNowBtn, $viewMoreBtn);
                $quickView.append($quickViewImage, $quickViewInfo);
                $quickViewOverlay.append($quickView);
                $('body').append($quickViewOverlay);
                $quickViewOverlay.css('display', 'flex');
                $closeQuickView.on('click', () => {
                  $quickViewOverlay.css('display', 'none');
                });
                const $productInfo = {
                  description: product.description,
                  image: product.image,
                  price: product.price
                }
                const $encodedProductInfo = encodeURIComponent(JSON.stringify($productInfo));
                $viewMoreBtn.on('click', () => {
                  const url = `quick-view.html?product=${$encodedProductInfo}`;
                  window.location.href = url;
                })
              });
          });
      },
      error: function (xhr, status, error) {
          alert(`Please check your internet connection ${error}`);
      }
  });
});


$(window).on("scroll", function() {
    const headerHeight = $("header").outerHeight();
    const currentScrollY = $(window).scrollTop();
    const navbar = $(".nav-bar");
  
    if (currentScrollY >= headerHeight) {
      // The header is out of view, make nav sticky
      navbar.addClass("sticky");
    } else {
      // The header is still in view, remove sticky behavior
      navbar.removeClass("sticky");
    }
});
  
$('.harmburger-icon').click(function () {
  $('.overlay').css("display","block");
});

$('.close-menu').click(function () {
   $('.overlay').css("display", "none");
});

const $originalNavBar = $('.nav-bar').clone(true);

$('.search-icon').click(function () {
  showSearchForm();
});

function showSearchForm() {
  const originalNavBar = document.querySelector('.nav-bar');
  $('.nav-bar').css('padding', '1rem 0rem 1rem 0rem');
  $('.logo-container').css('width', '10%');
  $('main').css('margin-top', '-5.8rem');
  
  const $logo = $('.logo');
  const $logoStyle = $logo.attr('style');

  const $menu = $('.main-menu');
  const $menuStyle = $menu.attr('style');

  const $cartandsearchdiv = $('.cart-and-search-div');
  const $cartandsearchdivStyle = $cartandsearchdiv.attr('style');

  const $image = $('<img>').attr('src', 'pngwing.com (6).png');
  $image.attr('style', $logoStyle);
  $image.attr('width', '30');
  $image.css('margin-top', '1rem');

  const $searchField = $('<input>').attr('type', 'text');
  $searchField.attr({
    'id': 'search-field',
    'style': $menuStyle,
    'placeholder': `Search our store`
  });
  $searchField.css({
    'width': '80%',
    'height': '2rem',
    'border': '0',
    'background-color': 'rgba(0, 0, 0, 0)',
    'margin-top': '0.9rem'
  });

  const $cancelButton = $('<p>').append('&times;');
  $cancelButton.attr('class', 'cancel-button');
  $cancelButton.css({
    'width': '10%',
    'text-align': 'center',
    'margin': '0',
    'font-size': '50px',
    'cursor': 'pointer'
  });

  $cancelButton.on('click', () => {
      closeSearchForm();
  });

  $logo.replaceWith($image);
  $menu.replaceWith($searchField);
  $cartandsearchdiv.replaceWith($cancelButton);
}

function closeSearchForm() {
  $('.nav-bar').replaceWith($originalNavBar.clone(true));

  const $searchIcon = $('.nav-bar .search-icon');
  $searchIcon.on('click', function () {
    showSearchForm();
  });
}

function showCart() {
  $('.cartOverlay').css('display', 'flex');
  $('body').css('overflow', 'hidden');
}

function closeCart() {
  $('.cartOverlay').css('display', 'none');
  $('body').css('overflow', '');
}

$('.cart-icon').on('click', () => {
  showCart();
});

$('.close-cart').on('click', () => {
  closeCart();
});