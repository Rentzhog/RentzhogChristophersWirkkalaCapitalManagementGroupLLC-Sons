export type market = Map<string, timeline>

export type timeline = Array<snapshot>

export type snapshot = {
    time : number
    aggregate : aggregate
}

export type aggregate = {
    ticker : string, // Stock identifier
    open   : number, // Price at open
    close  : number, // Price at close
    high   : number, // Highest price
    low    : number, // Lowest price
    amount : number, // Amount of trades
    volume : number, // Volume of trades
    vwa    : number  // Volume Weighted Average price ??
}

export function json_to_timeline(json: string): timeline {
    const object = JSON.parse(json);
    const ticker: string = object.ticker;
    const timeline: timeline = [];
    for (let i = 0; i < object.resultsCount; i++) {
        const aggregate: aggregate = {
            ticker : "",
            open   : 0,
            close  : 0,
            high   : 0,
            low    : 0,
            amount : 0,
            volume : 0,
            vwa    : 0
        }
        
        aggregate.ticker = object.ticker;
        aggregate.open = object.results[i].o
        aggregate.close = object.results[i].c
        aggregate.high = object.results[i].h
        aggregate.low = object.results[i].l
        aggregate.amount = object.results[i].n
        aggregate.volume = object.results[i].v
        aggregate.vwa = object.results[i].vw

        const time: number = object.results[i].t
        timeline.push({time, aggregate});
    }
    return timeline;
}

export function timelines_to_market(timelines: Array<timeline>): market {
    const result: market = new Map;
    for (let i = 0; i < timelines.length; i++) {
        const ticker: string = timelines[0][0].aggregate.ticker
        result.set(ticker, timelines[0])
    }
    return result;
}

// Testing purposes. Har blivit ersatt av parse.test.ts -D
// Deprecated
// const agg: aggregate = json_to_timeline('{"ticker": "AAPL","queryCount": 853,"resultsCount": 853,"adjusted": true,"results": [{"v": 1755,"vw": 239.7725,"o": 239.63,"c": 239.92,"h": 239.92,"l": 239.63,"t": 1738227600000,"n": 98}]}')
// console.log(agg.ticker)