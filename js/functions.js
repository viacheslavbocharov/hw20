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
  buyButton.setAttribute('data-product', productId);
  buyButton.setAttribute('data-category', categoryId);
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
  const newElement = document.createElement('div')
  newElement.innerHTML = `Congrats! You've bought the product`;
  parent.prepend(newElement);

  setTimeout(function () {
    //newElement.innerHTML = '';
    newElement.remove();
  }, 2000);

};

function showFormAfterBuy(categoryId, productId){
  const parent = document.getElementById('info');
  const newElement = document.createElement('form')
  newElement.setAttribute('name', 'orderForm');
  newElement.innerHTML = `
  <p><input type="text" name="surname" placeholder="Surname*" /></p>
  <p><input type="text" name="name" placeholder="Name*" /></p>
  <p><input type="text" name="midlename" placeholder="Midlename" /></p>
  <select name="city">
    <option value="not selected">--select city--</option>
    <option value="Odessa">Odessa</option>
    <option value="New-York">New-York</option>
    <option value="Toronto">Toronto</option></select
  ><br />
  <p>
    <input type="text" name="newpost" placeholder="New Poste Branch*" />
  </p>
  <label><input type="radio" name="payment" value="Card" /> Card </label
  ><br />
  <label
    ><input type="radio" name="payment" value="Post" checked/> At Post
    Branch</label
  ><br />
  <p><input type="number" name="qty" placeholder="Qty" min="0" /></p>
  <p>
    <textarea
      name="description"
      placeholder="Enter your comments"
    ></textarea>
  </p>
  <p><input type="button" class="btn-send" data-product="${productId}" data-category="${categoryId}" value="Send" /></p>
  `;
  parent.append(newElement);
};


function alertInputsIfNotFilled(inputFields) {
  inputFields.forEach(input => {
    if (!input.value) {
      // Если поле не заполнено, добавляем div с сообщением об ошибке
      if (!input.nextElementSibling || input.nextElementSibling.className !== 'error-message') {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = 'This is a required field';
        input.parentNode.insertBefore(errorMessage, input.nextElementSibling);
      }
    } else {
      // Если поле заполнено, удаляем сообщение об ошибке (если оно было)
      if (input.nextElementSibling && input.nextElementSibling.className === 'error-message') {
        input.nextElementSibling.remove();
      }
    }
  });
};



function isMandatoryFieldsFilled(mandatoryFields) {
  for (const key in mandatoryFields) {
    if (!mandatoryFields[key] && mandatoryFields[key] !== 0) {
      // Если значение пусто или undefined, возвращаем false
      return false;
    }
  }
  // Если все значения не пустые, возвращаем true
  return true;
};


function showBoughtProductInfo(categoryId, productId) {
  const selectedCategory = data.find(category => category.key === categoryId);
  const selectedProduct = selectedCategory.products.find(product => product.id == productId);

  const parent = document.getElementById('info');
  const productInfo = document.createElement('div')
  
  productInfo.innerHTML = `
    <h2>Product:</h2>
    <p>${selectedProduct.name}</p>
    <p>Price: $${selectedProduct.price}</p>
    <p>${selectedProduct.description}</p>
  `;
  parent.innerHTML = '';
  parent.prepend(productInfo);
}

function showDeliveryInfo(allFields) {
  const parent = document.getElementById('info');
  const deliveryInfo = document.createElement('div')
  //parent.innerHTML = '';
  deliveryInfo.innerHTML = `
<h2>Order details:</h2>
<p>Surname: ${allFields.surname}</p>
<p>Name: ${allFields.name}</p>
<p>Midlename: ${allFields.midlename}</p>
<p>City: ${allFields.city}</p>
<p>Post Brunch: ${allFields.post}</p>
<p>Payment method: ${allFields.payment}</p>
<p>Qty: ${allFields.qty}</p>
<p>Your notes: ${allFields.note}</p>
`;
  parent.append(deliveryInfo);
};



// function showDeliveryInfo() {
//   const parent = document.getElementById('info');
//   const deliveryInfo = document.createElement('div')
//   //parent.innerHTML = '';
//   deliveryInfo.innerHTML = `
// <h2>Order details:</h2>
// <p>Surname: ${orderSurname}</p>
// <p>Name: ${orderName}</p>
// <p>Midlename: ${orderMidlename}</p>
// <p>City: ${orderCity}</p>
// <p>Post Brunch: ${orderNewpost}</p>
// <p>Payment method: ${orderPayment}</p>
// <p>Qty: ${orderQty}</p>
// <p>Your notes: ${orderDescription}</p>
// `;
//   parent.append(deliveryInfo);
// };





