window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
const hamburgerIcon = document.getElementById('hamburger');
const mainMenu = document.getElementById('main-menu');

hamburgerIcon.addEventListener('click', () =>{
    mainMenu.style.display = mainMenu.style.display === "block" ? 'none' : 'block';
});


const searchIcon = document.getElementById('search-icon');
searchIcon.addEventListener('click', () => {
    showSearchForm();
});

function showSearchForm() {
    const navBar = document.querySelector('.nav-bar');
    const cartAndSearch = document.getElementById('cart-and-search');
    const logoDiv = document.querySelector('#logo-div');
    const hamburgerIcon = document.getElementById('hamburger');
    
    navBar.removeChild(cartAndSearch);
    navBar.removeChild(logoDiv);

    const formForSearch = document.createElement('form');
    const formTextField = document.createElement('input');
    const searchButton = document.createElement('button');


    formTextField.setAttribute('id', 'search-field');
    formTextField.setAttribute('placeholder', 'Input a Keyword');
    formTextField.addEventListener('input', searchForKeyWord);
    searchButton.setAttribute('type', 'search');
    searchButton.setAttribute('id', 'search');
    searchButton.setAttribute('onload', 'searchForKeyWord()')

    searchButton.textContent = 'Search';
    searchButton.style.border = 'none';
    searchButton.style.borderRadius = '5px';
    searchButton.style.backgroundColor = '#afafaf';
    searchButton.style.cursor = 'pointer';
    formTextField.style.borderRadius = '5px';
    formTextField.style.border = 'none';
    formTextField.style.backgroundColor = '#afafaf';
    formForSearch.style.marginTop = '0.1em';
    hamburgerIcon.style.display = 'none';

    formForSearch.style.opacity = '0';
    formForSearch.style.transform = 'translateY(-20px)';
    formForSearch.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    formForSearch.style.display = 'flex';

    navBar.appendChild(formForSearch);
    formForSearch.appendChild(formTextField);
    formForSearch.appendChild(searchButton);

    setTimeout(() => {
        formForSearch.style.margin = 'auto';
        formForSearch.style.marginTop = '2em';
        formForSearch.style.opacity = '1';
        formForSearch.classList.add('fade-slide-in');
    }, 10);
}


function searchForKeyWord() {
    const keyword = document.getElementById('search-field').value.toLowerCase();
    const allProductDescriptions = document.querySelectorAll('.description');
    let hasMatch = false;

    allProductDescriptions.forEach((description) => {
        const text = description.innerHTML.toLowerCase();
        const productLink = description.closest('.product-link');

        if (text.includes(keyword)) {
            productLink.style.display = '';
            hasMatch = true;
        } else {
            if (productLink) {
                productLink.style.display = 'none';
            }
        }
    });

    if (!hasMatch) {
        document.querySelectorAll('.product-link').forEach((product) => {
            if (product) {
                 product.style.display = 'none';
            }
        });
    }
}

document.querySelectorAll('.product-link').forEach((productLink) => {
    productLink.addEventListener('click', (e) => {
        e.preventDefault();

        const productImage = productLink.querySelector('div img').src;
        const productDescription = productLink.querySelector('div .description');
        const productPrice = productLink.querySelector('.price');

        sessionStorage.setItem('selectedProductImage', productImage);
        sessionStorage.setItem('selectedProductDescription', productDescription.innerText);
        sessionStorage.setItem('selectedProductPrice', productPrice.innerText);

        window.location.href = 'order.html';
    })
});

document.querySelector('#cart-icon').addEventListener('click', () => {
    window.location.href = 'cart.html';
});

if (document.querySelector('.minus-btn') && document.querySelector('.plus-btn')) {
    document.querySelector('.minus-btn').addEventListener('click', () => {
        let quantityElement = document.getElementById('quantity-value');
        let quantityInput = Number(quantityElement.value.replace(/[^0-9.]/g, ''));
        let itemPrice = Number(document.getElementById('item-price').innerText.replace(/[^0-9.]/g, ''));
        let subTotalElement = document.getElementById('sub-total');
        
        if (quantityInput > 1) {
            quantityInput -= 1;
        } else {
            quantityInput = 1;
        }
    
        quantityElement.value = quantityInput;
    
        let newSubTotal = itemPrice * quantityInput;
        subTotalElement.innerText = newSubTotal.toFixed(2);
    });
    
    document.querySelector('.plus-btn').addEventListener('click', () => {
        let quantityElement = document.getElementById('quantity-value');
        let quantityInput = Number(quantityElement.value.replace(/[^0-9.]/g, ''));
        let itemPrice = Number(document.getElementById('item-price').innerText.replace(/[^0-9.]/g, ''));
        let subTotalElement = document.getElementById('sub-total');
        
        if (quantityInput >= 1) {
            quantityInput += 1;
        } else {
            quantityInput = 1;
        }
    
        quantityElement.value = quantityInput;
    
        let newSubTotal = itemPrice * quantityInput;
        subTotalElement.innerText = newSubTotal.toFixed(2);
    });
}

const cartProducts = [];

if (document.querySelector('.add-to-cart-btn')) {
    document.querySelector('.add-to-cart-btn').addEventListener('click', () => {
        const date = Date.now();
        const productImage = document.querySelector('.product-image img').src;
        const productDescription = document.querySelector('.description-div #order-page-description');
        const productPrice = document.querySelector('.product-price');

        const productInfo = {
            image: productImage,
            description: productDescription.innerHTML,
            price: productPrice.innerText
        }

        cartProducts.push(productInfo);
        localStorage.setItem('cartProduct_' + date, JSON.stringify(cartProducts));

        alert('You have successfully added an item to the cart');
    });
}

const retrievedCartProducts = [];

if (window.location.href.includes('cart.html')) {
    window.addEventListener('load', () => {
        for (let i = 0; i < localStorage.length; i++) {
            const cartProductKey = localStorage.key(i);
            
            if (cartProductKey.startsWith('cartProduct_')) {
                const items = JSON.parse(localStorage.getItem(cartProductKey));

                items.forEach(item => {
                    retrievedCartProducts.push(item);
                });
            }
        }

        retrievedCartProducts.forEach(cartProduct => {
            const cartProductDiv = document.querySelector('.cart-item');

            const itemDetailsDiv = document.createElement('div');
            itemDetailsDiv.className = 'item-details';

            cartProductDiv.appendChild(itemDetailsDiv);

            const mainDiv = document.createElement('div');
            mainDiv.className = 'main-div';

            itemDetailsDiv.appendChild(mainDiv);

            const productImage = document.createElement('img');
            productImage.src = cartProduct.image;
            productImage.className = 'cart-product-image';

            mainDiv.appendChild(productImage);

            const productDescriptionDiv = document.createElement('div');
            productDescriptionDiv.className = 'cart-page-description';
            productDescriptionDiv.textContent = cartProduct.description;

            mainDiv.appendChild(productDescriptionDiv);

            const quantitySelectorDiv = document.createElement('div');
            quantitySelectorDiv.className = 'quantity-selector';
            quantitySelectorDiv.style.display = 'flex';
            quantitySelectorDiv.style.width = '30%';
            quantitySelectorDiv.style.justifyContent = 'space-between';
            quantitySelectorDiv.style.float = 'right';
            quantitySelectorDiv.style.margin = '0';
            quantitySelectorDiv.style.marginTop = '10px';


            const minusButton = document.createElement('button');
            minusButton.className = 'minus-btn';
            minusButton.textContent = '-';

            quantitySelectorDiv.appendChild(minusButton);

            const quantityInput =  document.createElement('input');
            quantityInput.type = 'text';
            quantityInput.value = '1';
            quantityInput.id = 'quantity-value';

            quantitySelectorDiv.appendChild(quantityInput);

            const plusButton = document.createElement('button');
            plusButton.textContent = '+';
            plusButton.className = 'plus-btn';

            quantitySelectorDiv.appendChild(plusButton);

            const productPriceDiv = document.createElement('div');
            productPriceDiv.className = 'item-price';
            productPriceDiv.id = 'product-price';
            productPriceDiv.textContent = `${cartProduct.price}`;
            
            productDescriptionDiv.appendChild(productPriceDiv);
            productDescriptionDiv.appendChild(quantitySelectorDiv);
        });
        const cartContainer = document.querySelectorAll('.main-div');
    
        cartContainer.forEach(div => {
            const quantitySelectorDiv = div.querySelector('.quantity-selector');
            const productDescriptionDiv = div.querySelector('.cart-page-description');
            const plusButton = quantitySelectorDiv.querySelector('.plus-btn');
            const minusButton = quantitySelectorDiv.querySelector('.minus-btn');
            const quantityInput = quantitySelectorDiv.querySelector('#quantity-value');
            const itemPrice = Number(productDescriptionDiv.querySelector('.item-price').innerText.replace(/[^0-9.]/g, ''));

            plusButton.addEventListener('click', () => {
                let subtotal = Number(document.querySelector('#sub-total').innerText.replace(/[^0-9.]/g, ''));
                const quantity = Number(quantityInput.value);
                const subtotalElement = document.querySelector('#sub-total');
                if (!isNaN(quantity) && quantityInput.value > 0) {
                    quantityInput.value = quantity + 1;
                    const newItemPrice = quantityInput.value * itemPrice;
                    subtotal += newItemPrice;
                    subtotalElement.innerText = `$${subtotal}`;
                    
                console.log(subtotal);
                }
            });

            minusButton.addEventListener('click', () => {
                let subtotal = Number(document.querySelector('#sub-total').innerText.replace(/[^0-9.]/g, ''));
                const quantity = Number(quantityInput.value);
                const subtotalElement = document.querySelector('#sub-total');
                if (!isNaN(quantity) && quantityInput.value > 1) {
                    quantityInput.value = quantity - 1;
                    const newItemPrice = quantityInput.value * itemPrice;
                    subtotal -= newItemPrice;
                    subtotalElement.innerText = `$${subtotal}`;
                    
                console.log(subtotal);
                }
            })
        });

        console.log(retrievedCartProducts);
    });
}

if (window.location.href.includes('cart.html')) {
    window.addEventListener('load', () => {
        const cartContainer = document.querySelectorAll('.main-div');
        cartContainer.forEach(div => {
            const description = div.querySelector('.cart-page-description');
            const price = Number(description.querySelector('.item-price').innerText.replace(/[^0-9.]/g, ''));
            const quantitySelectorDiv = div.querySelector('.quantity-selector');
            const quantityInput = Number(quantitySelectorDiv.querySelector('#quantity-value').value);
            let subtotal = Number(document.querySelector('#sub-total').innerText.replace(/[^0-9.]/g, ''));
            const subtotalElement = document.querySelector('#sub-total');
            const newSubtotal = (price * quantityInput) + subtotal;
            subtotalElement.innerText = `$${newSubtotal}`;
            console.log(newSubtotal);
        })
    });
}

const sections = document.querySelectorAll('.product-link');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

sections.forEach(section => {
    observer.observe(section);
})