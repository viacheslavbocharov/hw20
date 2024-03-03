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
  if (event.target.closest('.btn')) {
    clearFieldProducts()
    clearFieldProduct()
    showMessageAfterBuy();
  }

});

//Не пойму почему не работала такая конструкция:
// document.getElementById('buy').addEventListener('click', () => {
//   showMessageAfterBuy()
// });