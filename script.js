// Array to store product details (not currently used but can be for additional features)
const productDetails = [];

// Fetch products and initialize functionality on document ready
$(function () {
  const productInfoUrl = 'https://api.jsonbin.io/v3/b/66dc7b91e41b4d34e42b9def';
  const apiKey = '$2a$10$sTKU6rZChswPcKFZFFkmwONolnDcWb7mAogz1feJa.AtX7SMQ68Oi';

  // Fetch product data using AJAX
  $.ajax({
    url: productInfoUrl,
    type: 'GET',
    headers: { 'X-Master-Key': apiKey },
    success: function (response) {
      const products = response.record;
      displayProducts(products);
    },
    error: function (xhr, status, error) {
      alert(`Error fetching products: ${status}`);
    }
  });

  // Sticky navigation bar functionality on scroll
  $(window).on('scroll', function () {
    const headerHeight = $('header').outerHeight();
    const currentScrollY = $(window).scrollTop();
    const navbar = $('.nav-bar');
    currentScrollY >= headerHeight ? navbar.addClass('sticky') : navbar.removeClass('sticky');
  });

  // Hamburger menu toggle
  $('.harmburger-icon').click(() => $('.overlay').css('display', 'block'));
  $('.close-menu').click(() => $('.overlay').css('display', 'none'));

  // Show search form on clicking search icon
  $('#search-icon').click(showSearchForm);

  // Show cart when clicking the cart icon
  $('#cart-icon').on('click', showCart);

  // Close cart when clicking the close button
  $('.close-cart').on('click', closeCart);

  // Checkout button functionality
  $('.checkout-btn').on('click', handleCheckout);

  // Redirect to product page when clicking "View All" (on index.html only)
  if (window.location.href.includes('index.html')) {
    $('.veiw-all-button').on('click', () => {
      window.location.href = 'products.html';
    });
  }
});

// Function to display products
function displayProducts(products) {
  const $mainDiv = $('.featured-collection-div');
  products.forEach(product => {
    const $productDiv = $('<div></div>').addClass('product');
    const $productImage = $('<img>').attr('src', product.image).addClass('image');
    const $productDescription = $('<p></p>').text(product.description).addClass('description');
    const $productPrice = $('<p></p>').text(product.price).addClass('price');
    const $quickViewButton = $('<button></button>').text('Quick view').addClass('quick-view-button');

    $productDiv.append($productImage, $productDescription, $productPrice, $quickViewButton);
    $mainDiv.append($productDiv);

    // Quick view functionality
    $productDiv.on('click', () => showQuickView(product));
  });
}

// Function to show quick view modal
function showQuickView(product) {
  const $overlay = $('<div></div>').addClass('quick-view-overlay').css('display', 'flex');
  const $quickView = $('<div></div>').addClass('quick-view');
  const $image = $('<img>').attr('src', product.image).addClass('selected-product-img');
  const $info = $('<div></div>').addClass('quick-view-info');
  const $closeButton = $('<p></p>').text('×').addClass('close-quick-view');
  const $description = $('<h2></h2>').text(product.description).addClass('cart-description');
  const $price = $('<p></p>').text(product.price).addClass('quick-view-price');
  const $addToCart = $('<button></button>').text('ADD TO CART').addClass('add-to-cart-btn');
  const $buyNow = $('<button></button>').text('BUY NOW').addClass('buy-now-btn');
  const $viewMore = $('<button></button>').text('MORE DETAILS').addClass('view-more-btn');

  // Append elements to modal
  $info.append($closeButton, $description, $price, $addToCart, $buyNow, $viewMore);
  $quickView.append($image, $info);
  $overlay.append($quickView);
  $('body').append($overlay).css('overflow', 'hidden');

  // Close quick view
  $closeButton.on('click', () => {
    $overlay.remove();
    $('body').css('overflow', '');
  });

  // Add to cart functionality
  $addToCart.on('click', () => {
    const productInfo = {
      description: product.description,
      image: product.image,
      price: product.price
    };
    localStorage.setItem(product.description, JSON.stringify(productInfo));
    showMessage('Product added to cart');
    showCart();
  });

  // Buy now functionality
  $buyNow.on('click', () => {
    alert('You have successfully purchased this product');
  });

  // View more details
  $viewMore.on('click', () => {
    const encodedProduct = encodeURIComponent(JSON.stringify(product));
    window.location.href = `quick-view.html?product=${encodedProduct}`;
  });
}

// Function to show search form
function showSearchForm() {
  // Logic for replacing nav bar with search form
}

// Function to close cart
function closeCart() {
  $('.cartOverlay').css('display', 'none');
  $('body').css('overflow', '');
}

// Function to show cart
function showCart() {
  // Logic for displaying cart items and updating subtotal
}

// Function to handle checkout
function handleCheckout() {
  $('.cart-item-container').empty();
  $('.subtotal').text('$0');
  localStorage.clear();
  closeCart();
  showMessage('You have successfully checked out');
}

// Utility function to display messages
function showMessage(message) {
  alert(message);
      }
    
