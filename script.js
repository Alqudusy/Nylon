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
              
              const $productDiv = $('<div></div>').addClass('product');
              
              const $productImage = $('<img>').attr('src', product.image).addClass('image');
              
              const $productDescription = $('<p></p>').text(product.description).addClass('description');
              
              const $productPrice = $('<p></p>').text(product.price).addClass('price');
              
              const $quickViewButton = $('<button></button>').text('Quick view').addClass('quick-view-button');
              
              $productDiv.append($productImage, $productDescription, $productPrice, $quickViewButton);
              
              $mainDiv.append($productDiv);

              $productDiv.on('click', () => {
                const $quickViewOverlay = $('<div></div>').addClass('quick-view-overlay');
                const $quickView = $('<div></div>').addClass('quick-view');
                const $quickViewImage = $('<img>').attr('src', product.image).addClass('selected-product-img');
                const $quickViewInfo = $('<div></div>').addClass('quick-view-info');
                const $closeQuickView = $('<p></p>').append('&times;').addClass('close-quick-view');
                const $quickViewDescription = $('<h2></h2>').text(product.description).addClass('cart-description');
                const $numberOfOrders = $('<p></p>').text('36 orders').addClass('numbers-of-orders');
                const $quickViewprice = $('<p></p>').text(product.price).addClass('quick-view-price');
                const $addToCartBtn = $('<button></button>').text('ADD TO CART').addClass('add-to-cart-btn');
                const $buyNowBtn = $('<button></button>').text('BUY NOW').addClass('buy-now-btn');
                const $viewMoreBtn = $('<button></button>').text('MORE DETAILS').addClass('view-more-btn');

                $quickViewInfo.append($closeQuickView, $quickViewDescription, $numberOfOrders, $quickViewprice, $addToCartBtn, $buyNowBtn, $viewMoreBtn);
                $quickView.append($quickViewImage, $quickViewInfo);
                $quickViewOverlay.append($quickView);
                $('body').append($quickViewOverlay);
                $quickViewOverlay.css('display', 'flex');
                $('body').css('overflow', 'hidden');
                $closeQuickView.on('click', () => {
                  $quickViewOverlay.css('display', 'none');
                  $('body').css('overflow', 'scroll');
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
                });
                $addToCartBtn.on('click', () => {
                  const descriptionToAddToCart = $quickViewDescription.text();
                  const imageToAddToCart = $quickViewImage.attr('src');
                  const priceToAddToCart = $quickViewprice.text();
                  const info = {
                    description: descriptionToAddToCart,
                    image: imageToAddToCart,
                    price: priceToAddToCart
                  }
                  localStorage.setItem(descriptionToAddToCart, JSON.stringify(info));
                  showMessage('Product Added to cart');
                  showCart();
                });
                $buyNowBtn.on('click', () => {
                  alert('You have successfully purchase this product');
                });
              });
          });
      },
      error: function (xhr, status, error) {
          alert(`Please check your internet connection ${status}`);
      }
  });
});


$(window).on("scroll", function() {
    const headerHeight = $("header").outerHeight();
    const currentScrollY = $(window).scrollTop();
    const navbar = $(".nav-bar");
  
    if (currentScrollY >= headerHeight) {
      navbar.addClass("sticky");
    } else {
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

$('#search-icon').click(function () {
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

  const $image = $('<i></i>').attr('class', 'fa-solid fa-magnifying-glass');
  $image.attr('style', $logoStyle);
  $image.attr('width', '30');
  $image.css({'margin-top': '1rem', 'color': 'black', 'font-size': '25px'});

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
  $cancelButton.attr('id', 'cancel-button');
  $cancelButton.css({
    'width': '10%',
    'text-align': 'center',
    'margin': '0',
    'font-size': '50px',
    'cursor': 'pointer',
    'color': 'black'
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

  const $searchIcon = $('.nav-bar #search-icon');
  $searchIcon.on('click', function () {
    showSearchForm();
  });
  const $cartIcon = $('.nav-bar .cart-icon');
  $cartIcon.on('click', () => {
    showCart();
  });
}

const convertValueToNumber = (value) => {
  const cleanedValue = value.replace(/[^0-9.]/g, '');
  return parseFloat(cleanedValue);
}

function showCart() {
  $('.cartOverlay').css('display', 'flex');
  $('body').css('overflow', 'hidden');

  function updateSubtotal() {
    let newSubTotal = 0;
    $('.cart-item-container').find('.quantity-and-price-div').each(function () {
      const $quantitySelector = $(this).find('.quantity-selector');
      const $cartPrice = $(this).find('.cart-price');
      const quantity = parseFloat($quantitySelector.val());
      const price = parseFloat($cartPrice.text().replace('$', ''));
      const itemTotal = quantity * price;
      newSubTotal += itemTotal;
    });
    $('.subtotal').text(`$${newSubTotal.toFixed(2)}`);
  }

  const $cartItemContainer = $('.cart-item-container');
  $cartItemContainer.empty();

  Object.keys(localStorage).forEach((key) => {
    const value = localStorage.getItem(key);
    try {
      const product = JSON.parse(value);
      const $imageAndDescriptionDiv = $('<div></div>').addClass('image-and-description-div');
      const $image = $('<img>').attr('src', product.image).addClass('image');
      const $cartDescription = $('<p></p>').text(product.description).addClass('cart-description');
      const $quantityAndPriceDiv = $('<div></div>').addClass('quantity-and-price-div');
      const $cartPrice = $('<p></p>').text(product.price).addClass('cart-price');
      const $quantitySelectorDiv = $('<div></div>').addClass('quantity-selector-div');
      const $plusBtn = $('<button></button>').text('+').addClass('plus-btn');
      const $quantitySelector = $('<input>').attr({ 'type': 'text', 'value': '1' }).addClass('quantity-selector');
      const $minusBtn = $('<button></button>').text('-').addClass('minus-btn');

      $imageAndDescriptionDiv.append($image, $cartDescription);
      $quantitySelectorDiv.append($minusBtn, $quantitySelector, $plusBtn);
      $quantityAndPriceDiv.append($cartPrice, $quantitySelectorDiv);
      $cartItemContainer.append($imageAndDescriptionDiv, $quantityAndPriceDiv);

      $plusBtn.on('click', () => {
        let quantity = parseFloat($quantitySelector.val());
        quantity += 1;
        $quantitySelector.val(quantity);
        updateSubtotal();
      });

      $minusBtn.on('click', () => {
        let quantity = parseFloat($quantitySelector.val());
        if (quantity > 1) {
          quantity -= 1;
          $quantitySelector.val(quantity);
          updateSubtotal();
        }
      });

    } catch (e) {
      console.log(`Key: ${key}, Value: ${value}`);
    }
  });

  updateSubtotal();
}


function closeCart() {
  $('.cartOverlay').css('display', 'none');
  $('body').css('overflow', '');
}

$('#cart-icon').on('click', () => {
  showCart();
});

$('.close-cart').on('click', () => {
  closeCart();
});

function filterProducts(searchQuery) {
  $('.product').each(function () {
    const description = $(this).find('.description').text().toLowerCase();
    if (description.includes(searchQuery.toLowerCase())) {
      $(this).show();
    } else {
      $(this).hide();
    }
  });
}

$(document).on('input', '#search-field', function () {
  const searchQuery = $(this).val();
  filterProducts(searchQuery);
});

function showMessage(message) {
  alert(message);
}

document.querySelector('.checkout-btn').addEventListener('click', () => {
  document.querySelector('.cart-item-container').innerHTML = '';
  document.querySelector('.subtotal').innerText = '$0';
  
  localStorage.clear();

  closeCart();
  
  showMessage('You have successfully checked out');
});

if (window.location.href.includes('index.html')) {
  document.querySelector('.veiw-all-button').addEventListener('click', () => {
    window.location.href = 'products.html';
  })
}