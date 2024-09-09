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

$(function () {
    const productInfo = 'https://api.jsonbin.io/v3/b/66dc7b91e41b4d34e42b9def';
    const apiKey = '$2a$10$sTKU6rZChswPcKFZFFkmwONolnDcWb7mAogz1feJa.AtX7SMQ68Oi';

    $.ajax({
        url: productInfo,
        type: 'get',
        headers: {
            'X-Master-Key': apiKey
        },
        success:
        function (response) {
            const products = response.record;
            console.log(products);
            products.forEach(product => {
            // Select the main container div
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
        });
        },
        error: function (xhr, status, error) {
            alert(`Please check your internet connection` + error);
        }
    });
});

$(window).scroll(function() {
    console.log($(window).scrollTop());
    if ($(window).scrollTop() > 900) {
        $('.nav-bar').addClass('sticky');
    }
    if ($(window).scrollTop < 900) {
        $('.nav-bar').removeClass('sticky');
    }
});