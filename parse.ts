export type aggregate = {
    ticker : String, // Stock identifier
    open   : number, // Price at open
    close  : number, // Price at close
    high   : number, // Highest price
    low    : number, // Lowest price
    amount : number, // Amount of trades
    volume : number, // Volume of trades
    vwa    : number  // Volume Weighted Average price ??
}

// Tar bara första datapunkten i stockens historia, for now
export function json_to_aggregate(json: string): aggregate {
    const object = JSON.parse(json);
    const result: aggregate = {
        ticker : "",
        open   : 0,
        close  : 0,
        high   : 0,
        low    : 0,
        amount : 0,
        volume : 0,
        vwa    : 0
    }
    result.ticker = object.ticker;
    result.open = object.results[0].o
    result.close = object.results[0].c
    result.high = object.results[0].h
    result.low = object.results[0].l
    result.amount = object.results[0].n
    result.volume = object.results[0].v
    result.vwa = object.results[0].vw
    return result;
}

// Testing purposes. Har blivit ersatt av parse.test.ts -D
const agg: aggregate = json_to_aggregate('{"ticker": "AAPL","queryCount": 853,"resultsCount": 853,"adjusted": true,"results": [{"v": 1755,"vw": 239.7725,"o": 239.63,"c": 239.92,"h": 239.92,"l": 239.63,"t": 1738227600000,"n": 98}]}')
console.log(agg.ticker)