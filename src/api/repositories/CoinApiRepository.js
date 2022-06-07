const axios = require("axios").default;

const getCurrencyInfo = async (currentCoin) => {
    const { data } = await axios.get(`https://economia.awesomeapi.com.br/json/last/${currentCoin}`);
    let result;

    if (currentCoin === 'USD') {
        const { USDBRL } = data;

        result = USDBRL;
    }

    if (currentCoin === 'BTC') {
        const { BTCBRL } = data;

        result = BTCBRL;
    }

    return result;
}

module.exports = {
    getCurrencyInfo
};