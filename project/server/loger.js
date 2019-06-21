const fs = require('fs');
const moment = require('moment');

const loger = (req, cart, action, file) => {
    if (!req.params.id) {
        fs.appendFile(file, `${moment().format('LLL')}: action: ${action}, id: ${req.body.id_product}, name: ${req.body.product_name}, quantity: ${req.body.quantity};\n`,
            err => {
            if (err) {
                fs.appendFileSync(file, `${moment().format('LLL')}: action: ${action}, ${err};`);
            }
        });
    } else {
        let find = cart.contents.find(el => el.id_product === +req.params.id);
        fs.appendFile(file, `${moment().format('LLL')}: action: ${action}, id: ${find.id_product}, name: ${find.product_name}, quantity: ${find.quantity};\n`,
            err => {
            if (err) {
                fs.appendFileSync(file, `${moment().format('LLL')}: ${action} ${err}`);
            }
        });
    }

};

module.exports = loger;