import axios from 'axios';

const headers = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': 'ecd51a7c8cmsh3ac51f3b2909282p117782jsn30d4d7b8b3aa'
    //ecd51a7c8cmsh3ac51f3b2909282p117782jsn30d4d7b8b3aa
}

class CoinbaseService {
    
    async GetCoin(coin) {

        const paramsCoin = {
            referenceCurrencyUuid: 'yhjMzLPhuIDl', 
            timePeriod: '24h'
        };

        const response = await axios.get(`https://coinranking1.p.rapidapi.com/coin/${coin}`,{headers, params: paramsCoin });
        const data = await response.data;
        return data.data.coin;
    }

    async GetCoins() {

        const paramsCoins = {
            referenceCurrencyUuid: 'yhjMzLPhuIDl',
            timePeriod: '24h',
            tiers: '1',
            orderBy: 'marketCap',
            orderDirection: 'desc',
            limit: '100',
            offset: '0'
          }

        const response = await axios.get(`https://coinranking1.p.rapidapi.com/coins`,{headers, params: paramsCoins });
        const data = await response.data;
        return data.data;
    }

    /*
        period : 3h 24h 7d 30d 3m 1y 3y 5y
    */
   async GetCoinHistory (coin, period) {

      const paramsCoin = {referenceCurrencyUuid: 'yhjMzLPhuIDl', timePeriod: period}

       const response = await axios.get(`https://coinranking1.p.rapidapi.com/coin/${coin}/history`,{headers, params : paramsCoin});
       const data = await response.data;
       return data.data.history;
   }
    
}

const coinbaseService = new CoinbaseService();

export default coinbaseService;