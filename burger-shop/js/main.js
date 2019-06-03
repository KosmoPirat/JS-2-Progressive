
function getValue() {
        var select = document.getElementById("select-size");
        var value = select.value;
        console.log(value);
}

class BurgerMaker {

	constructor (container = '.burger-information') {

		this.data = [];
		this.burgerData = {};
		this.container = container;
		this.init();
	}

	init() {
		getData();
		getSize();
		getTopping();
		getAdditive();
		getPrice();
		getEnergyValue();
		render();
	}

	getData() {
		this.data = [
			{size: small, price: 50, energyValue: 20},
			{size: big, price: 100, energyValue: 40},
			{topping: cheese, price: 10, energyValue: 20},
			{topping: salat, price: 20, energyValue: 5},
			{topping: patatoes, price: 15, energyValue: 10},
			{additive: sauce, price: 20, energyValue: 5},
			{additive: spice, price: 15, energyValue: 0},
		];
	}

}

class Burger {

	constructor(data) {
		this.size = data.size;
		this.topping = data.topping;
		this.additive = data.additive;
		this.price = data.price;
		this.energyValue = data.energyValue;
		this.init();
	}

	render() {

	}
}
