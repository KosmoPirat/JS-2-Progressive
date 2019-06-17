const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        statusOk: true,

    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => {
                    if(!result.ok) {
                        this.statusOk = false;
                    }
                    console.log(this.statusOk);
                    return result.json()
                })
                .catch(error => console.log('There has been a problem with your fetch operation: ' + error.message));
        },
    },

});

// let getRequest = (url, cb) => {
//    return new Promise((resolve, reject) => {
//        let xhr = new XMLHttpRequest();
//        // window.ActiveXObject ->  xhr = new ActiveXObject();
//        xhr.open('GET', url, true);
//        xhr.onreadystatechange = () => {
//            if (xhr.readyState === 4) {
//                if (xhr.status !== 200) {
//                    reject('error');
//                } else {
//                    resolve(cb(xhr.responseText));
//                }
//            }
//        }
//    });
// };

/*class List {
    constructor(url, container){
        this.container = container;
        this.url = url;
        this.data = [];
        this.allProducts = [];
        this.filtered = [];
        this._init();
    }

    getJson(url) {
        return fetch(url ? url : `${API + this.url}`)
            .then(result => result.json())
            .catch(error => console.log(error));
    }
    handleData(data) {
        this.data = [...data];
        this.render();
    }
    getItemSum() {
        return this.allProducts.reduce((sum, item) => sum += item.price, 0);
    }
    getItem(id) {
        return this.allProducts.find(el => el.id_product === id);
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.data) {
            const prod = new lists[this.constructor.name](product);
            this.allProducts.push(prod);
            block.insertAdjacentHTML('beforeend', prod.render());
        }
    }
    filter(value) {
        const regexp = new RegExp(value, 'i');
        this.filtered = this.allProducts.filter(el => regexp.test(el.product_name));
        this.allProducts.forEach(el => {
            const block = document.querySelector(`.products__item[data-id="${el.id_product}"]`);
            if (this.filtered.includes(el)) {
                block.classList.remove('invisible')
            } else {
                block.classList.add('invisible')
            }
        });
    }
    _init() {
        return false;
    }
}

class Item {
    constructor(el, img = `https://placehold.it/200x150`) {
        this.product_name = el.product_name;
        this.price = el.price;
        this.id_product = el.id_product;
        this.img = img
    }

    render() {
        return `<div class="products__item" data-id="${this.id_product}">
                  <img src="${this.img}" alt="${this.product_name}">
                  <div class="desc">
                      <h3 class='item__title'>${this.product_name}</h3>
                      <span class='price-wrap'>
                        Цена: <span class="price">${this.price}</span>
                      </span>
                      <button class="buy-btn btn" data-id="${this.id_product}">Купить</button>
                  </div>
              </div>`
    }
}

class ProductsList extends List{
    constructor(cart, url = '/catalogData.json', container = '.products'){
        super (url, container);
        this.cart = cart;
        this.getJson()
            .then(data => this.handleData(data));
    }

    _init() {
        document.querySelector(this.container).addEventListener('click', el => {
            if (el.target.classList.contains('buy-btn')) {
                let id = +el.target.dataset.id;
                this.cart.addCartItem(this.getItem(id));
            }
        });

        document.querySelector('.search-form').addEventListener('submit', e => {
            e.preventDefault();
            this.filter(document.querySelector('.search-field').value);
        });
    }
}

class ProductItem extends Item {}

class Cart extends List{
    constructor(url = '/getBasket.json', container = '.cart') {
        super(url, container);
        this.getJson()
            .then(data => this.handleData(data.contents));
    }

    addCartItem(item) {
        this.getJson(`${API}/addToBasket.json`)
            .then(data => {
                if (data.result) {
                    let findProd = this.allProducts.find(el => el.id_product === item.id_product);
                    if (findProd) {
                        findProd.quantity++;
                        this._updateCart(findProd);
                    } else {
                        const newProd = Object.assign({quantity: 1}, item);
                        this.data = [newProd];
                        this.render();
                        this._renderCount();
                        this._renderCartData();
                    }
                } else {
                    console.log('Error: can\'t add product');
                }
            });

    }


    delCartItem(el) {
        this.getJson(`${API}/deleteFromBasket.json`)
            .then(data => {
                if (data.result) {
                    let id = +el.dataset.id;
                    let findProd = this.allProducts.find(item => item.id_product === id);
                    if (findProd.quantity > 1) {
                        findProd.quantity--;
                        this._updateCart(findProd);
                    } else {
                        this.allProducts.splice(this.allProducts.indexOf(findProd), 1);
                        document.querySelector(`.cart-products__item[data-id="${id}"]`).remove();
                        this._renderCount();
                        this._renderCartData();
                    }
                } else {
                    console.log('Error: can\'t delete product');
                }
            });
    }

    _updateCart(item) {
        const block = document.querySelector(`.cart-products__item[data-id="${item.id_product}"]`);
        block.querySelector('.quantity').textContent = `Кол-во: ${item.quantity}`;
        this._renderCount();
        this._renderCartData();
    }

    _init() {
        document.querySelector(this.container).addEventListener('click', el => {
            if (el.target.classList.contains('close-btn')) {
                this.delCartItem(el.target);
            }
        });
        document.querySelector('.header__btn-cart').addEventListener('click', () => {
            document.querySelector('.cart').classList.toggle('cart_hidden');
        });
    }

    _getTotalCount() {
        let productCount = 0;
        for (let product of this.allProducts) {
            productCount += product.quantity;
        }
        return productCount;
    }

    _getCartSum() {
        let productSum = 0;
        for (let product of this.allProducts) {
            productSum += product.price * product.quantity;
        }
        return productSum;
    }

    _renderCartData() {
        const cartData = document.querySelector('.cart__title');
        if (this._getCartSum() > 0) {
            cartData.classList.remove('cart__title_hidden');
        } else {
            cartData.classList.add('cart__title_hidden');
        }
        cartData.innerHTML = `Сумма вашей покупки: ${this._getCartSum()} <br\> Общее кол-во товаров в корзине: ${this._getTotalCount()}`;
    }

    _renderCount() {
        const count = document.querySelector('.count');
        if (this._getTotalCount() > 0) {
            count.classList.remove('count_hidden');
        } else {
            count.classList.add('count_hidden');
        }
        count.innerHTML = this._getTotalCount();
    }
}

class CartItem extends Item{
    constructor(el, img = 'https://placehold.it/150x150') {
        super(el, img);
        this.quantity = el.quantity;
    }
    render() {
        return `<div class="cart-products__item" data-id="${this.id_product}">
                  <img src="${this.img}" alt="${this.product_name}">
                  <div class="cart-desc">
                      <h3 class='cart-item__title'>${this.product_name}</h3>
                      <span class='cart-price-wrap'>
                        Цена: <span class="cart-price">${this.price}</span> за шт.
                      </span>
                      <span class="quantity">Кол-во: ${this.quantity}</span>
                      <button class="close-btn btn " data-id="${this.id_product}"></button>
                  </div>
              </div>`;
    }
}
const lists = {
    ProductsList: ProductItem,
    Cart: CartItem,
};
const cart = new Cart();
const products = new ProductsList(cart);
products.getJson('getProducts.json').then(data => products.handleData(data));*/

