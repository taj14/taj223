let productList = document.getElementById('product-list');
let addProductForm = document.getElementById('add-product-form');
let addProductBtn = document.getElementById('add-product-btn');

addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let productName = document.getElementById('product-name').value;
    let productImage = document.getElementById('product-image').files[0];
    let productQuantity = document.getElementById('product-quantity').value;
    let productHTML = `
        <div class="product">
            <img src="${URL.createObjectURL(productImage)}" alt="${productName}">
            <span class="product-name">${productName}</span>
            <span class="product-quantity">Quantity: ${productQuantity}</span>
            <div class="product-actions">
                <input type="number" class="sell-quantity" value="1" min="1" max="${productQuantity}">
                <button class="sell-btn">Sell</button>
                <button class="add-quantity-btn">Add Quantity</button>
                <button class="delete-btn">Delete</button>
            </div>
        </div>
    `;
    productList.innerHTML += productHTML;
    addProductForm.reset();
});

productList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        e.target.parentNode.parentNode.remove();
    } else if (e.target.classList.contains('sell-btn')) {
        let product = e.target.parentNode.parentNode;
        let productName = product.querySelector('.product-name').textContent;
        let productQuantity = product.querySelector('.product-quantity').textContent.match(/\d+/)[0];
        let sellQuantity = product.querySelector('.sell-quantity').value;
        if (sellQuantity <= productQuantity) {
            let newQuantity = parseInt(productQuantity) - parseInt(sellQuantity);
            product.querySelector('.product-quantity').textContent = `Quantity: ${newQuantity}`;
            console.log(`Sold ${sellQuantity} ${productName}(s)`);
            // add logic to update the product quantity here
        } else {
            alert(`Not enough quantity to sell ${sellQuantity} ${productName}(s)`);
        }
    } else if (e.target.classList.contains('add-quantity-btn')) {
        let product = e.target.parentNode.parentNode;
        let productName = product.querySelector('.product-name').textContent;
        let currentQuantity = product.querySelector('.product-quantity').textContent.match(/\d+/)[0];
        let addQuantity = parseInt(prompt(`Enter quantity to add to ${productName}:`));
        if (addQuantity > 0) {
            let newQuantity = parseInt(currentQuantity) + addQuantity;
            product.querySelector('.product-quantity').textContent = `Quantity: ${newQuantity}`;
            console.log(`Added ${addQuantity} to ${productName} - New Quantity: ${newQuantity}`);
            // add logic to update the product quantity here
        } else {
            alert(`Invalid quantity to add to ${productName}`);
        }
    }
});