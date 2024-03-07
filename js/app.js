window.addEventListener('DOMContentLoaded', showCategories);

document.getElementById('categories').addEventListener('click', event => {
  const categoryId = event.target.getAttribute('data-category');
  showProductsByCategory(categoryId);
});

document.getElementById('products').addEventListener('click', event => {
  const productId = event.target.getAttribute('data-product');
  const categoryId = event.target.getAttribute('data-category');

  showProductInfo(categoryId, productId);
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



document.addEventListener('click', event => {

  const productId = event.target.getAttribute('data-product');
  const categoryId = event.target.getAttribute('data-category');

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

    const allFields = {
      surname: orderSurname,
      name: orderName,
      midlename: orderMidlename,
      city: orderCity,
      post: orderNewpost,
      payment: orderPayment,
      qty: orderQty,
      note: orderDescription
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
      showBoughtProductInfo(categoryId, productId);
      showDeliveryInfo(allFields);
    } else {
      alert('Please fill in all field');
    }

  }
});

// console.log('Surname:', orderSurname);
// console.log('Name:', orderName);
// console.log('Midlename:', orderMidlename);
// console.log('City:', orderCity);
// console.log('New Poste Branch:', orderNewpost);
// console.log('Payment:', orderPayment);
// console.log('Qty:', orderQty);
// console.log('Description:', orderDescription);


{/* <h2>Order details:</h2>
<p>Surname: ${allFields.surname}</p>
<p>Name: ${orderName}</p>
<p>Midlename: ${orderMidlename}</p>
<p>City: ${orderCity}</p>
<p>Post Brunch: ${orderNewpost}</p>
<p>Payment method: ${orderPayment}</p>
<p>Qty: ${orderQty}</p>
<p>Your notes: ${orderDescription}</p> */}