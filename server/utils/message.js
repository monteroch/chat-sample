var moment = require('moment');

var generateMessage = (from, text) => {
    return{
        from,
        text,
        createAt: moment().valueOf()
    };
};

module.exports = { generateMessage };