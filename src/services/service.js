export default class CoinService {

    constructor() {
        _apiBase = "https://api.coinlore.net/api/tickers/";
    }


    getCoins = async (start, limit) => {
        const data = await fetch(`${this._apiBase}?start=${start}&limit=${limit}`);
    
        if (!data.ok) {
          throw new Error(`Could not fetch ${url}` +
            `, received ${data.status}`);
        }
        return await data.json();
    }



}