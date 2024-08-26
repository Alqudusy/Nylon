const hamburgerIcon = document.getElementById('hamburger');
const mainMenu = document.getElementById('main-menu');

hamburgerIcon.addEventListener('click', () =>{
    mainMenu.style.display = mainMenu.style.display === "block" ? 'none' : 'block';
});


const searchIcon = document.getElementById('search-icon');
searchIcon.addEventListener('click', () => {
    showSearchForm();
})

function showSearchForm() {
    const navBar = document.getElementById('nav-bar');
    const cartAndSearch = document.getElementById('cart-and-search');
    const logoDiv = document.getElementById('logo-div');
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

    searchButton.textContent = 'Search';
    searchButton.style.border = 'none';
    searchButton.style.marginLeft = '5px';
    searchButton.style.borderRadius = '5px';
    searchButton.style.backgroundColor = '#454545';
    searchButton.style.cursor = 'pointer';
    formTextField.style.borderRadius = '5px';
    formTextField.style.border = 'none';
    formTextField.style.backgroundColor = '#454545';
    formForSearch.style.marginTop = '0.1em';
    formForSearch.style.display = 'flex';
    hamburgerIcon.style.width = '5%';

    navBar.appendChild(formForSearch);
    formForSearch.appendChild(formTextField);
    formForSearch.appendChild(searchButton);
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
            if (productLink) {
                 productLink.style.display = 'none'
            }
        });
    }
}

document.querySelectorAll('.product-link').forEach((productLink) => {
    productLink.addEventListener('click', (e) => {
        e.preventDefault();

        const productImage = productLink.querySelector('div img').src;
        const productDescription = productLink.querySelector('div .description');
        const productPrice = document.querySelector('.price');

        sessionStorage.setItem('selectedProductImage', productImage);
        sessionStorage.setItem('selectedProductDescription', productDescription.innerText);
        sessionStorage.setItem('selectedProductPrice', productPrice.innerHTML);

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
        let itemPrice = Number(document.getElementById('product-price').innerText.replace(/[^0-9.]/g, ''));
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
        let itemPrice = Number(document.getElementById('product-price').innerText.replace(/[^0-9.]/g, ''));
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
        const productImage = document.querySelector('.product-image img').src;
        const productDescription = document.querySelector('.description-div #order-page-description');
        const productPrice = document.querySelector('.product-price');

        const productInfo = {
            image: productImage,
            description: productDescription.innerHTML,
            price: productPrice.innerText
        }

        cartProducts.push(productInfo);
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));

        console.log(localStorage.getItem('cartProducts'));
    })
}
