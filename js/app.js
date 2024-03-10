window.addEventListener('DOMContentLoaded', showCategories);

document.getElementById('categories').addEventListener('click', event => {
  const categoryId = event.target.getAttribute('data-category');
  showProductsByCategory(categoryId);
  clearFieldInfo()

});

document.getElementById('products').addEventListener('click', event => {
  const productId = event.target.getAttribute('data-product');
  const categoryId = event.target.getAttribute('data-category');

  showProductInfo(categoryId, productId);
  clearFieldInfo()
});



//При натисканні на “купити” з'являється повідомлення, 
//що товар куплений і повернення у вихідний стан програми 
//( коли відображається лише список категорій).

document.getElementById('product').addEventListener('click', event => {
  const productId = event.target.getAttribute('data-product');
  const categoryId = event.target.getAttribute('data-category');

  if (event.target.closest('.btn')) {
    clearFieldProducts()
    clearFieldProduct()
    showMessageAfterBuy();
    showFormAfterBuy(categoryId, productId)
  }

});

// Модифицировать приложение интернет-магазин 

// В информации товара - кнопка “купить”
// При клике на “купить” ниже появляется форма оформления заказа с следующими полями:
// ФИО покупателя
// Город (выбор из списка)
// Склад Новой почты для отправки
// Наложенный платеж или оплата банковской картой
// Количество приобретаемой продукции
// Комментарий к заказу
// Реализовать проверку всех пользовательских данных при подтверждении заказа- обязательные поля заполнены. 
// В противном случае, выводить ошибку на страницу
// Выводить информацию о заказе на страницу (информация о товаре и о доставке)


//console.log(myCartJSON)
let myCart = getMyCartFromLocalStorage()

document.querySelector('.btn-myorder').addEventListener('click', () => {
  refreshOrdersInMyCart(myCart);
  showOrHideOrderPanel();
  showOrHideShopPanel();
});

document.querySelector('.btn-back').addEventListener('click', () => {
  showOrHideOrderPanel();
  showOrHideShopPanel();
});

document.querySelector('.orders-list').addEventListener('click', event => {
  const clickedElement = event.target;
  const orderNumberToShowDetails = clickedElement.getAttribute('data-deteils');
  const orderNumberToDelete = clickedElement.getAttribute('data-delete');
  if (orderNumberToShowDetails !== null) {
    document.getElementById(orderNumberToShowDetails).classList.toggle('isDisabled');
  }

  if (orderNumberToDelete !== null) {
    const deleteIndex = parseInt(orderNumberToDelete);
    if (!isNaN(deleteIndex)) {
      myCart.splice(deleteIndex, 1);
      PushCartToLocalStorage(myCart);
      refreshOrdersInMyCart(myCart);
    }
  }

});


document.addEventListener('click', event => {

  const productId = event.target.getAttribute('data-product');
  const categoryId = event.target.getAttribute('data-category');
  const selectedCategory = data.find(category => category.key === categoryId);
  const selectedProduct = selectedCategory.products.find(product => product.id == productId);

  if (event.target.classList.contains('btn-send')) {
    const orderForm = document.forms.orderForm;

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

    let order = {
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

    const mandatoryFields = {
      surname: orderSurname,
      name: orderName,
      midlename: orderMidlename,
      city: orderCity,
      post: orderNewpost,
      qty: orderQty
    };

    // Логика для проверки введения данных в форму.
    const inputFields = document.querySelectorAll('input');

    alertInputsIfNotFilled(inputFields);


    if (isMandatoryFieldsFilled(mandatoryFields)) {
      saveOrderInCart(order);
      PushCartToLocalStorage(myCart);
      showBoughtProductInfo(categoryId, productId, order);
    } else {
      alert('Please fill in all field');
    }

  }
  
});


