Vue.component('cart', {
    data() {
        return {
            cartUrl: `/getBasket.json`,
            isShow: false,
            cartItems: [],
            imgCart: `https://placehold.it/100x100`
        }
    },
    methods: {
        addProduct(product){
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result){
                        let find = this.cartItems.find(el => el.id_product === product.id_product);
                        if(find){
                            find.quantity++;
                        } else {
                            let prod = Object.assign({quantity: 1}, product);
                            this.cartItems.push(prod);
                        }
                    } else {
                        console.log('error');
                    }
                })
        },
        remove(product){
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if(data.result){
                        if(product.quantity > 1){
                            product.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        }
                    } else {
                        console.log('error');
                    }
                })
        },
    },
    mounted(){
        this.$parent.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for(let el of data.contents){
                    this.cartItems.push(el)
                }
            });
    },

    computed: {
        getTotalCount() {
            let productCount = 0;
            for (let product of this.cartItems) {
                productCount += product.quantity;
            }
            return productCount;
        },
        getCartSum() {
            let productSum = 0;
            for (let product of this.cartItems) {
                productSum += product.price * product.quantity;
            }
            return productSum;
        },

    },

    template: `<div class="cart-wrap">
                    <button class="header__btn-cart btn" type="button" @click="isShow = !isShow">
                        <span class="count" v-if="getTotalCount">{{ getTotalCount }}</span>Корзина
                    </button>
                    <div class="cart" v-show="isShow"">
                        <div class="cart__title" v-if="getTotalCount">
                            Сумма вашей покупки: {{ getCartSum }} <br> Общее кол-во товаров в корзине: {{ getTotalCount }}
                        </div>
                        <div class="cart__title" v-else>Корзина пуста!</div>
                        <cart-item 
                            v-for="item of cartItems" 
                            :key="item.id_product"
                            :cart-item="item"
                            :img="imgCart"
                            @remove="remove">
                        </cart-item>
                    </div>
                </div>`
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `<div class="cart-products__item">
                    <img :src="img" :alt="cartItem.product_name">
                <div class="cart-desc">
                    <h3 class='cart-item__title'>{{ cartItem.product_name }}</h3>
                    <span class='cart-price-wrap'>
                        Цена: <span class="cart-price">{{ cartItem.price }}</span> за шт.
                      </span>
                    <span class="quantity">Кол-во: {{ cartItem.quantity }}</span>
                    <button class="close-btn btn" @click="$emit('remove', cartItem)"></button>
                </div>
            </div>`
});