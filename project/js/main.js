class ProductsList {
    constructor(container = '.products'){
        this.data = [];
        this.container = container;
        this.productsAll = [];
        this.init();
    }
    init(){
        this._fetchProducts();
        this._render();
        this._getProductsSum();
    }
    _fetchProducts(){
        this.data = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 30},
            {id: 3, title: 'Keyboard', price: 55},
            {id: 4, title: 'Gamepad', price: 65},
            {id: 5, title: 'Chair', price: 120, template: 1},
        ];
    }
    _render(){
        const block = document.querySelector(this.container);
        for (let product of this.data){
            const prod = new ProductItem(product);
            this.productsAll.push(prod);
            block.insertAdjacentHTML('beforeend', prod.render());
        }
    }
    _getProductsSum() {
        let productSum = 0;
        for (let i = 0; i < this.productsAll.length; i++) {
            productSum += this.productsAll[i].price;
        }
        console.log(productSum);
    }
}


class ProductItem {
    constructor(product, img = `https://placehold.it/200x150`) {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img
    }

    render(){
        return `<div class="products__item">
                  <img src="${this.img}" alt="${this.title}">
                  <div class="desc">
                      <h3 class='item__title'>${this.title}</h3>
                      <span class='price-wrap'>
                        Price: <span class="price">${this.price}</span>
                      </span>
                      <button class="buy-btn btn">Купить</button>
                  </div>
              </div>`
    }
}

class Cart {
    constructor(container = '.header__btn-cart') {

        this.cartList = [];
        this.container = container
        this.init();

    }

    init() {

    }

    _addCartItem(item) {

    }

    _delCartItem(item) {

    }

    _getTotalCount() {

    }

    _getCartSum() {

    }

    _render() {
        
    }
}

class CartItem {
    constructor(product) {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = product.img
    }
    render() {
        return `<div class="products__item">
                  <img src="${this.img}" alt="${this.title}">
                  <div class="desc">
                      <h3 class='item__title'>${this.title}</h3>
                      <span class='price-wrap'>
                        Price: <span class="price">${this.price}</span>
                      </span>
                      <button class="buy-btn btn">Купить</button>
                  </div>
              </div>`;
    }
}

const products = new ProductsList();