const moment = require('moment');

let addLog = (req, cart, logs, action) => {
    if (!req.params.id) {
        logs.push({
            data: moment().format('LLL'),
            action: action,
            content: req.body});
        return JSON.stringify(logs, null, 4);
    } else {
        let find = cart.contents.find(el => el.id_product === +req.params.id);
        logs.push({
            data: moment().format('LLL'),
            action: action,
            content: find});
        return JSON.stringify(logs, null, 4);
    }
};

module.exports = addLog;
