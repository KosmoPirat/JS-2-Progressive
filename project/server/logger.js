const fs = require('fs');
const moment = require('moment');

const logger = (prodItem, action) => {
    fs.readFile('server/log_data/stats.json', 'utf8', (err, data) => {
        if(err){
            console.log('Can`t read file')
        } else {
            const stat = JSON.parse(data);
            stat.push({
                time: moment().format('MMMM Do YYYY, h:mm:ss a'),
                id: prodItem.id_product,
                prod_name: prodItem.product_name,
                quantity: prodItem.quantity,
                action: action
            });
            fs.writeFile('server/log_data/stats.json', JSON.stringify(stat, null, 4), (err) => {
                if(err){
                    console.log('Can`t write file')
                }
            })
        }
    })
};

module.exports = logger;