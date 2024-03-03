function showCategories() {
  const parent = document.getElementById('categories');

  data.forEach(category => {
    const myCategoryElement = document.createElement('div');
    myCategoryElement.textContent = category.name;
    myCategoryElement.setAttribute('data-category', category.key);

    parent.append(myCategoryElement);
  });
}

function showProductsByCategory(categoryId) {
  const selectedCategory = data.find(category => category.key === categoryId);
  
  clearFieldProducts()
  clearFieldProduct()
  
  const parent = document.getElementById('products');

  selectedCategory.products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.textContent = product.name;
    productElement.setAttribute('data-product', product.id);
    productElement.setAttribute('data-category', categoryId);

    parent.append(productElement);
  });
}

function showProductInfo(categoryId, productId) {
  const selectedCategory = data.find(category => category.key === categoryId);
  const selectedProduct = selectedCategory.products.find(product => product.id == productId);

  const parent = document.getElementById('product');
  parent.innerHTML = `
    <h2>${selectedProduct.name}</h2>
    <p>Price: $${selectedProduct.price}</p>
    <p>${selectedProduct.description}</p>
  `;

  const buyButton = document.createElement('input');
  buyButton.setAttribute('type', 'button');
  buyButton.setAttribute('value', 'Buy');
  buyButton.setAttribute('id', 'buy');
  buyButton.classList.add('btn');


  parent.append(buyButton);
}

//home work 20
function clearFieldProducts() {
  const products = document.getElementById('products');
  products.innerHTML = '';
}


function clearFieldProduct() {
  const product = document.getElementById('product');
  product.innerHTML = '';
}


function showMessageAfterBuy() {

  const parent = document.getElementById('info');
  parent.innerHTML = `Congrats! You've bought the product`;

  setTimeout(function () {
    parent.innerHTML = '';
  }, 2000);

};