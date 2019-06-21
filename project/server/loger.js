const fs = require('fs');
const addLog = require('./log');

//Вариант с записью в файл txt рабочий

// const loger = (req, cart, action, file) => {
//     if (!req.params.id) {
//         fs.appendFile(file, `${moment().format('LLL')}: action: ${action}, id: ${req.body.id_product}, name: ${req.body.product_name}, quantity: ${req.body.quantity};\n`, err => {
//             if (err) {
//                 fs.appendFileSync(file, `${moment().format('LLL')}: action: ${action}, ${err};`);
//             }
//         });
//     } else {
//         let find = cart.contents.find(el => el.id_product === +req.params.id);
//         fs.appendFile(file, `${moment().format('LLL')}: action: ${action}, id: ${find.id_product}, name: ${find.product_name}, quantity: ${find.quantity};\n`, err => {
//             if (err) {
//                 fs.appendFileSync(file, `${moment().format('LLL')}: ${action} ${err}`);
//             }
//         });
//     }
//
// };

const loger = (req, cart, action, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let newLog = addLog(req, cart, JSON.parse(data), action);
            fs.writeFile(file, newLog, (err) => {
                if(err){
                    console.log(err);
                } else {
                    console.log(`log recording completed successfully`);
                }
            });
        }
    });
};

module.exports = loger;