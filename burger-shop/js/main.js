
class BurgerMaker {

	constructor (container = '.burger-information') {

		this.data = [];
		this.burgerData = {};
		this.container = container;
		this.init();
	}

	init() {
		this._getData();
		this._createBurger();
		this.getPrice();
		this.getEnergyValue();
		this._render();
	}

	_getData() {
		this.data = [
            {size: 'small', price: 50, energyValue: 20},
            {size: 'big', price: 100, energyValue: 40},
            {topping: 'cheese', price: 10, energyValue: 20},
            {topping: 'salat', price: 20, energyValue: 5},
            {topping: 'patatoes', price: 15, energyValue: 10},
            {additive: 'sauce', price: 20, energyValue: 5},
            {additive: 'spice', price: 15, energyValue: 0},
        ];
	}

	getSize(data) {
        const size = document.getElementById('select-size');
        return data[+size.value];
    }

    getTopping(data) {
        const topping = document.getElementById('select-topping');
        return data[+topping.value];
    }

    addAdditive(data) {
        const additiveSauce = document.getElementById('additive-sauce');
        const additiveSpice = document.getElementById('additive-spice');
        const additive = {};

        if (additiveSauce.checked) {
            additive.additiveSauce = data[+additiveSauce.value];
        } else {
            additive.additiveSauce = {
                price: 0,
                energyValue: 0,
            };
        }

        if (additiveSpice.checked) {
            additive.additiveSpice = data[+additiveSpice.value]
        } else {
            additive.additiveSpice = {
                price: 0,
                energyValue: 0,
            };
        }
        return additive;
    }

    _createBurger() {
    	this.burgerData = {
    		size: this.getSize(this.data),
			topping: this.getTopping(this.data),
			additive: this.addAdditive(this.data),
		};
	}

	getPrice() {
		this.burgerData['price'] = this.burgerData.size.price + this.burgerData.topping.price + this.burgerData.additive.additiveSauce.price + this.burgerData.additive.additiveSpice.price;
	}

    getEnergyValue() {
        this.burgerData['energyValue'] = this.burgerData.size.energyValue +
            this.burgerData.topping.energyValue +
            this.burgerData.additive.additiveSauce.energyValue +
            this.burgerData.additive.additiveSpice.energyValue;
    }

    _render() {
		const block = document.querySelector(this.container);
		const burg = new Burger(this.burgerData);
        block.insertAdjacentHTML('beforeend', burg.render());
	}

}

class Burger {

	constructor(data) {

		this.size = data.size;
		this.topping = data.topping;
		this.additiveSpice = data.additiveSpice;
        this.additiveSauce = data.additiveSauce;
		this.price = data.price;
		this.energyValue = data.energyValue;

	}

	render() {
		return `<div class="burger">
					<p>Стоимость: ${this.price}</p>
					<p>Калорийность: ${this.energyValue}</p>
				</div>`;
	}
}
document.querySelector('.create-burger').addEventListener('click', () => {
    const newBurger = new BurgerMaker();
});

