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

        sessionStorage.setItem('selectedProductImage', productImage);
        sessionStorage.setItem('selectedProductDescription', productDescription.innerText);

        window.location.href = 'order.html';
    })
});

