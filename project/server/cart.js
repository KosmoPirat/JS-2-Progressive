
let add = (cart, req) => {
    cart.contents.push(req.body);
    cartParamSet(cart);
    return {newCart: JSON.stringify(cart, null, 4), prodItem: req.body};
};
let change = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    find.quantity += req.body.quantity;
    cartParamSet(cart);
    return {newCart: JSON.stringify(cart, null, 4), prodItem: find};
};

let del = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    cart.contents.splice(cart.contents.indexOf(find), 1);
    cartParamSet(cart);
    return {newCart: JSON.stringify(cart, null, 4), name: find};
};

const cartParamSet = cart => {
    cart.amount = cart.contents.reduce((priseSum, item) => priseSum + item.price * item.quantity, 0);
    cart.countGoods = cart.contents.reduce((priseSum, item) => priseSum + item.quantity, 0);
};

module.exports = {
    add,
    change,
    del,

};
