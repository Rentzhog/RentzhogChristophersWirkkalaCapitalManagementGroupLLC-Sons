// Represents a timeline of aggregates in a timespan
export type timeline = Array<snapshot>

// An aggregate at a timestamp
export type snapshot = {
    time : number
    aggregate : aggregate
}

// Information about a stock
export type aggregate = {
    ticker : string, // Stock identifier
    open   : number, // Price at open
    close  : number, // Price at close
    high   : number, // Highest price
    low    : number, // Lowest price
    amount : number, // Amount of trades
    volume : number, // Volume of trades
    vwa    : number  // Volume Weighted Average price
}



// Result of the trading bot
export type trading_result = {
    account_timeline : account_timeline,
    stock_timeline: timeline,
    trade_actions : trade_action[]
}

// Represents a trading action
export type trade_action = {
    time: number;
    action: string;
};

// Represents a timeline over the bots account
export type account_timeline = Array<account_snapshot>

// Represents the bots account at a specific time
export type account_snapshot = {
    time: number,
    value: number
}