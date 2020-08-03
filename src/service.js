export default class CoinService {

    constructor() {
        _apiBase = "https://api.coinlore.net/api/tickers/";
    }


    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
    
        if (!res.ok) {
          throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`);
        }
        return await res.json();
    }



}