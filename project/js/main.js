const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
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

class ProductsList {
    constructor(container = '.products'){
        this.data = [];
        this.container = container;
        this.productsAll = [];
        this._getProducts()
            .then(() => {
                this._render()
            });
    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .then(data => {
                this.data = [...data];
            })
            .catch(error => console.log(error));
    }

    _render() {
        const block = document.querySelector(this.container);
        for (let product of this.data){
            const prod = new ProductItem(product);
            this.productsAll.push(prod);
            block.insertAdjacentHTML('beforeend', prod.render());
        }
    }

    _getProductsSum() {
        let productSum = 0;
        for (let product of this.productsAll) {
            productSum += product.price;
        }
        return productSum;
    }
}


class ProductItem {
    constructor(product, img = `https://placehold.it/200x150`) {
        this.product_name = product.product_name;
        this.price = product.price;
        this.id_product = product.id_product;
        this.img = img
    }

    render() {
        return `<div class="products__item">
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

class Cart {
    constructor(container = '.cart') {

        this.cartList = [];
        this.amount = 0;
        this.countGoods = 0;
        this.container = container;
        this._getCartProducts()
            .then(() => {
                this._render()
            });
    }

    _getCartProducts() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .then(data => {
                this.amount = data.amount;
                this.countGoods = data.countGoods;
                this.data = [...data.contents];
                this.cartList = [...data.contents];
            })
            .catch(error => console.log(error));
    }

    addCartItem(id) {
        fetch(`${API}/addToBasket.json`)
            .then(result => result.json())
            .then(data => {
                if (data.result === 1) {
                    const choseProd = products.productsAll.find(item => item.id_product === id);
                    if (this.data.find(item => item.id_product === choseProd.id_product)) {
                        this.data.find(item => item.id_product === choseProd.id_product).quantity++;
                    } else {
                        choseProd.quantity = 1;
                        this.data.push(choseProd);
                        this.cartList.push(choseProd);
                    }
                    this._render();
                }
            })
            .catch(error => console.log(error));
    }

    delCartItem(id) {
        fetch(`${API}/deleteFromBasket.json`)
            .then(result => result.json())
            .then(data => {
                if (data.result === 1) {
                    if (this.data.find(item => item.id_product === id) && this.data.find(item => item.id_product === id).quantity > 1) {
                        this.data.find(item => item.id_product === id).quantity--;
                    } else {
                        this.data.splice(this.data.findIndex(item => item.id_product === id),1);
                        this.cartList.splice(this.cartList.findIndex(item => item.id_product === id),1);
                    }
                    if (this.cartList.length === 0) {
                        const block = document.querySelector(this.container);
                        document.querySelector('.count').classList.add('count_hidden');
                        block.innerHTML = 'Корзина пуста';
                    } else {
                        this._render();
                    }
                }
            })
            .catch(error => console.log(error));
    }

    _getTotalCount() {
        let productCount = 0;
        for (let product of this.cartList) {
            productCount += product.quantity;
        }
        return productCount;
    }

    _getCartSum() {
            let productSum = 0;
            for (let product of this.cartList) {
                productSum += product.price * product.quantity;
            }
            return productSum;
    }

    renderCount() {
        const count = document.querySelector('.count');
        if (this._getTotalCount() > 0) {
            count.classList.remove('count_hidden');
        }
        count.innerHTML = this._getTotalCount();
    }

    _render() {
        const block = document.querySelector(this.container);
        block.innerHTML = `<div class="cart__title">
                                Сумма товаров: ${this._getCartSum()},  Кол-во товаров: ${this._getTotalCount()}
                           </div>`;
        this.renderCount();
        for (let product of this.data){
            const prod = new CartItem(product);
            block.insertAdjacentHTML('beforeend', prod.render());
        }
    }
}

class CartItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.product_name = product.product_name;
        this.price = product.price;
        this.id_product = product.id_product;
        this.img = img;
        this.quantity = product.quantity;
    }
    render() {
        return `<div class="cart-products__item">
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

const products = new ProductsList();
const cart = new Cart();

const cartBtn = document.querySelector('.header__btn-cart');
const cartBlock = document.querySelector('.cart');
cartBtn.addEventListener('click', () => {
    cartBlock.classList.toggle('cart-hidden');
});

cartBlock.addEventListener('click', el => {
    const target = el.target;
    if (target.classList.contains('close-btn')) {
        cart.delCartItem(+target.dataset.id);
    }
});

const prodList = document.querySelector('.products');
const count = document.querySelector('.count');
prodList.addEventListener('click', el => {
    const target = el.target;
    if (target.classList.contains('buy-btn')) {
        cart.addCartItem(+target.dataset.id);
        count.classList.remove('count_hidden');
    }
});