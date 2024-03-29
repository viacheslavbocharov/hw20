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

function showFormAfterBuy(categoryId, productId) {
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


function showBoughtProductInfo(categoryId, productId, order) {
  const selectedCategory = data.find(category => category.key === categoryId);
  const selectedProduct = selectedCategory.products.find(product => product.id == productId);

  const parent = document.getElementById('info');
  const productInfo = document.createElement('div')

  productInfo.innerHTML = `
    <h2>Order details</h2>
    <p>${selectedProduct.name}</p>
    <p>${selectedProduct.description}</p>
    <p>Price: $${selectedProduct.price}</p>    
    <p>Qty: ${order.qty}</p>
    <p>Total price: $${order.total}</p>
    <p>Date: ${order.date.toUTCString()}</p>
    <h2>Delivery details</h2>
    <p>Surname: ${order.surname}</p>
    <p>Name: ${order.name}</p>
    <p>Midlename: ${order.midlename}</p>
    <p>City: ${order.city}</p>
    <p>Post Brunch: ${order.post}</p>
    <p>Payment method: ${order.payment}</p>
    <p>Your notes: ${order.note}</p>
  `;
  parent.innerHTML = '';
  parent.prepend(productInfo);
}

function clearFieldInfo() {
  const info = document.getElementById('info');
  info.innerHTML = ''
}

function getMyCartFromLocalStorage() {
  let myCartJSON = localStorage.getItem('myCart');
  let myCart;
  if (myCartJSON === null) {
    myCart = [];
  } else {
    myCart = JSON.parse(myCartJSON)
  }
  return myCart;
};

function saveOrderInCart(order) {
  myCart.push(order);
};

function PushCartToLocalStorage(myCart) {
  localStorage.setItem('myCart', JSON.stringify(myCart))
};


function showOrHideOrderPanel() {
  let orders = document.querySelector('.orders-container');
  orders.classList.toggle('isDisabled');
};

function showOrHideShopPanel() {
  let shop = document.querySelector('.shop-container');
  shop.classList.toggle('isDisabled');
};

function showOrHideOrderDetails() {
  let orderDetails = document.querySelector('.order-details');
  orderDetails.classList.toggle('isDisabled');
};

function refreshOrdersInMyCart(myCart) {
  const ordersList = document.querySelector('.orders-list');
  ordersList.innerHTML = '';

  if (myCart.length === 0) {
    const noOrdersElement = document.createElement('div');
    noOrdersElement.innerHTML = `
    <h2>You don't have any orders</h2>`
    ordersList.append(noOrdersElement);
  } else {
    for (let i = 0; i < myCart.length; i++) {

      const selectedCategory = data.find(category => category.key === myCart[i].categoryId);
      const selectedProduct = selectedCategory.products.find(product => product.id == myCart[i].productId);

      const orderElement = document.createElement('div')
      orderElement.innerHTML = `
    <h2>Order from: ${myCart[i].date}</h2>
    <p>${selectedProduct.name}</p>
    <p>Price: $${selectedProduct.price}</p>    
    <p>Qty: ${myCart[i].qty}</p>
    <p>Total price: $${myCart[i].total}</p>

    <p><input type="button" value="Details" class="btn-details" data-deteils="order${i}"></p>
    <div id="order${i}" class="order-details isDisabled">
    <p>Surname: ${myCart[i].surname}</p>
    <p>Name: ${myCart[i].name}</p>
    <p>Midlename: ${myCart[i].midlename}</p>
    <p>City: ${myCart[i].city}</p>
    <p>Post Brunch: ${myCart[i].post}</p>
    <p>Payment method: ${myCart[i].payment}</p>
    <p>Your notes: ${myCart[i].note}</p>   
    </div>
    <p><input type="button" value="Delete" class="btn-delete" data-delete="${i}"></p>
    `
      ordersList.append(orderElement);
    }
  }
};



function getAllFieldsFromForm(orderForm, selectedProduct, categoryId, productId) {
  const orderSurname = orderForm.surname.value;
  const orderName = orderForm.name.value;
  const orderMidlename = orderForm.midlename.value;
  const orderCity = orderForm.city.value;
  const orderNewpost = orderForm.newpost.value;
  const orderPayment = orderForm.payment.value;
  const orderQty = orderForm.qty.value;
  const orderDescription = orderForm.description.value;
  const orderTotalPrice = orderQty * selectedProduct.price;
  const orderDate = new Date();
  orderDate.setTime(orderDate.getTime())

  return {
    categoryId: categoryId,
    productId: productId,
    surname: orderSurname,
    name: orderName,
    midlename: orderMidlename,
    city: orderCity,
    post: orderNewpost,
    payment: orderPayment,
    qty: orderQty,
    note: orderDescription,
    total: orderTotalPrice,
    date: orderDate
  };
};



function getMandatoryFieldsFromForm(orderForm, selectedProduct) {
  const orderSurname = orderForm.surname.value;
  const orderName = orderForm.name.value;
  const orderMidlename = orderForm.midlename.value;
  const orderCity = orderForm.city.value;
  const orderNewpost = orderForm.newpost.value;
  const orderPayment = orderForm.payment.value;
  const orderQty = orderForm.qty.value;
  const orderDescription = orderForm.description.value;
  const orderTotalPrice = orderQty * selectedProduct.price;
  const orderDate = new Date();
  orderDate.setTime(orderDate.getTime())

  return {
    surname: orderSurname,
    name: orderName,
    midlename: orderMidlename,
    city: orderCity,
    post: orderNewpost,
    qty: orderQty
  };
};





