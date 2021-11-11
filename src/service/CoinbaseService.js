import axios from 'axios';

class CoinbaseService {
    
    async GetProductTrades(product_id) {

        const response = await axios.get(`https://api.exchange.coinbase.com/products/${product_id}/trades`)
        const data = await response.data;
        // .then(function (response) {
        //     // handle success
        //     //console.log(response.data);
        // })
        // .catch(function (error) {
        //     // handle error
        //     console.log(error);
        // })
        // .then(function () {
        //     // always executed
        //     console.log("coucou");
        // });
        return data;
    }

    async GetProductCandles(product_id) {

        const response = await axios.get(`https://api.exchange.coinbase.com/products/${product_id}/candles`)
        const data = await response.data;
        return data;
    }

    // async GetPrice() {

    //     const response = await axios.get(`https://www.coinbase.com/price/xrp`)
    //     const data = await response.data;
    //     return data;
    // }
    
}

const coinbaseService = new CoinbaseService();

export default coinbaseService;