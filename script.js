const productInfo = "https://api.jsonbin.io/v3/b/66dc7b91e41b4d34e42b9def";
const apiKey = "$2a$10$sTKU6rZChswPcKFZFFkmwONolnDcWb7mAogz1feJa.AtX7SMQ68Oi";

fetch(productInfo, {
    headers: {
        "X-Master-key": apiKey
    }
})
.then(response => response.json())
.then(data => {
    const products = data.record;
    console.log(products);
    products.forEach(product => {
        const mainDiv = document.querySelector('.featured-collection-div');
        const productDiv = document.createElement('div');
        productDiv.className = 'product';

        const productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.className = 'image';

        const productDescription = document.createElement('p');
        productDescription.innerText = product.description;
        productDescription.className = 'description'

        const productPrice = document.createElement('p');
        productPrice.innerText = product.price;
        productPrice.className = 'price';

        productDiv.appendChild(productImage);
        productDiv.appendChild(productDescription);
        productDiv.appendChild(productPrice);

        mainDiv.appendChild(productDiv);
    });
})