/** 
 * An {aggregate} is a Record
 * It contains information about a stock over a specific timespan.
 * Invariant: ticker must be a valid stock ticker.
 */
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

/**
 * A {snapshot} is a Record.
 * It contains the aggregate of a stock and the point in time the snapshot
 * was taken.
 * Invariant: {time} must be a valid UNIX timestamp with milliseconds.
 */
export type snapshot = {
    time : number
    aggregate : aggregate
}

/**
 * A {timeline} is an Array.
 * It represents all snapshots taken across a given day.
 * Invariant: must only contain snapshots, ordered chronologically.
 */
export type timeline = Array<snapshot>

/**
 * An {owned_stock} is a Record.
 * It represents the ownership of a given stock with its ticker and the amount
 * of value owned.
 * Invariant: {ticker} must be a valid stock ticker.
 * Invariant: {worth} cannot be negative.
 */
export type owned_stock = {
    ticker : string,
    worth  : number
}

/**
 * An {account} is a Record.
 * It represents a stock trading account, with amount of liquid capital, and
 * stock assets.
 * Invariant: {capital} cannot be negative.
 */
export type account = {
    capital: number,
    stock: owned_stock
}

/**
 * A {trading_result} is a Record.
 * It represents the result of the trading bot.
 */
export type trading_result = {
    account_timeline : account_timeline,
    stock_timeline: timeline,
    trade_actions : trade_action[]
}

/**
 * A {trade_action} is a Record.
 * It represents a trading action.
 * Invariant: {time} must be a valid UNIX timestamp with milliseconds.
 * Invariant: {action} must be either "buy", "sell", or "wait".
 */
export type trade_action = {
    time: number;
    action: string;
};

/**
 * An {account_snapshot} is a Record.
 * It represents the status of the bot account at a specific time.
 * Invariant: {time} must be a valid UNIX timestamp with milliseconds.
 * Invariant: {value} cannot be negative.
 */
export type account_snapshot = {
    time: number,
    value: number
}

/**
 * An {account_timeline} is an Array.
 * It is a timeline of the account status over time.
 * Invariant: must contain account_snapshots only, in chronological order.
 */
export type account_timeline = Array<account_snapshot>