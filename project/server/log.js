const moment = require('moment');

let addLog = (req, cart, logs, action) => {
    if (!req.params.id) {
        logs.push({
            data: moment().format('LLL'),
            action: action,
            content: {id: req.body.id_product, name: req.body.product_name, quantity: req.body.quantity},

        });
        return JSON.stringify(logs, null, 4);
    } else {
        let find = cart.contents.find(el => el.id_product === +req.params.id);
        if(find) {
            logs.push({
                data: moment().format('LLL'),
                action: action,
                content: {id: find.id_product, name: find.product_name, quantity: find.quantity},

            });
        } else {
            logs.push({
                data: moment().format('LLL'),
                action: action,
                content: {id: req.params.id, name: req.body.name, quantity: 0},

            });
        }
        return JSON.stringify(logs, null, 4);
    }
};

module.exports = addLog;
