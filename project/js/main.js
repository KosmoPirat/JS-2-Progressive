const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 30},
    {id: 3, title: 'Keyboard', price: 55},
    {id: 4, title: 'Gamepad', price: 65},
    {id: 5, title: 'Chair', price: 165},
    {id: 6, title: 'Notebook', price: 2000},
    {id: 7, title: 'Mouse', price: 30},
    {id: 8, title: 'Keyboard', price: 55},
    {id: 9, title: 'Gamepad', price: 65},
    {id: 10, title: 'Chair', price: 165},
    {id: 11, title: 'Gamepad', price: 65},
    {id: 12, title: 'Chair', price: 165},
];

const renderProduct = (title = 'No title specified', price = 'Price not specified') =>`<div class="products__item">
                                                                                       <h3 class="item__title">${title}</h3>
                                                                                            <span class="price">${price}</span>
                                                                                            <button class="buy-btn btn">Купить</button>
                                                                                       </div>`;

const renderPage = list => {
    const productsList = list.map(item => renderProduct(item.title, item.price)).join('');
    document.querySelector('.products').innerHTML = productsList;
};

renderPage(products);