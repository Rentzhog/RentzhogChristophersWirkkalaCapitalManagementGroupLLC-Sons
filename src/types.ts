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

// An aggregate at a timestamp
export type snapshot = {
    time : number
    aggregate : aggregate
}

// Represents a timeline of aggregates in a timespan
export type timeline = Array<snapshot>

// A stock in account portfolio
export type owned_stock = {
    ticker : string,
    worth  : number
}

// An account with liquid cash and asset portfolio
export type account = {
    capital: number,
    stock: owned_stock
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

// Represents the bots account at a specific time
export type account_snapshot = {
    time: number,
    value: number
}

// Represents a timeline over the bots account
export type account_timeline = Array<account_snapshot>