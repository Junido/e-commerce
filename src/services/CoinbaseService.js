import axios from 'axios';

const headers = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '***'
}



class CoinbaseService {
    
    async GetCoins() {

        const paramsCoins = {
            referenceCurrencyUuid: 'yhjMzLPhuIDl',
            timePeriod: '24h',
            tiers: '1',
            orderBy: 'marketCap',
            orderDirection: 'desc',
            limit: '50',
            offset: '0'
          }

        const response = await axios.get(`https://coinranking2.p.rapidapi.com/coins`,{headers, params: paramsCoins });
        const data = await response.data;
        return data.data.coins;
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