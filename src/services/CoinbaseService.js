import axios from 'axios';

const headers = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': 'c1383aa2cdmshe0f0c5e7ce5493dp129a37jsnd2dc0802ab41'
}

class CoinbaseService {
    
    async GetCoins() {
        const response = await axios.get(`https://coinranking2.p.rapidapi.com/coins`,{headers : headers});
        const data = await response.data;
        return data.data.coins;
    }

    /*
        period : 3h 24h 7d 30d 3m 1y 3y 5y
    */
   async GetCoinHistory (coin, period) {
       const response = await axios.get(`https://coinranking2.p.rapidapi.com/coin/${coin}/history/${period}`,{headers : headers});
       const data = await response.data;
       return data.data.history;
   }
    
}

const coinbaseService = new CoinbaseService();

export default coinbaseService;