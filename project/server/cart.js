
let add = (cart, req) => {
    cart.contents.push(req.body);
    cartParamSet(cart);
    return JSON.stringify(cart, null, 4);
};
let change = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    find.quantity += req.body.quantity;
    cartParamSet(cart);
    return JSON.stringify(cart, null, 4);
};

let del = (cart, req) => {
    cart.contents.splice(cart.contents.indexOf(+req.body.id), 1);
    cartParamSet(cart);
    return JSON.stringify(cart, null, 4);
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