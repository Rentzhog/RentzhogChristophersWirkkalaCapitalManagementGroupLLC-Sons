//Stuff the bot can do

// A stock in account portfolio
export type owned_stock = {
    ticker : string,
    worth  : number
}

// An account with liquid cash and asset portfolio
export type account = {
    capital: number,
    portfolio: Map<string, owned_stock>
}

//Buys amount of stock
export function buy(account: account, ticker: string, value: number): void{

    if (value < account.capital) {

        console.log('Not enough capital to complete transaction.');
        return;
    }

    if (TICKER FINNS PÅ MARKNADEN) {

        account.capital = account.capital - value;

        const fuck_ts = account.portfolio.get(ticker)
        if (fuck_ts != undefined) {
            fuck_ts.worth = fuck_ts.worth + value;

        } else {
            let new_purchase: owned_stock = {ticker: ticker, worth: value};
            account.portfolio.set(ticker, new_purchase);

        }
    }
    return;

}

//Sells amount of an owned stock
export function sell(account: account, ticker: string, value: number): void {

    const fuck_ts = account.portfolio.get(ticker)

    if (fuck_ts === undefined) {
        console.log('Account does not own selected stock')
        return;

    }

    if (fuck_ts.worth < value) {
        console.log('Account does not own enough of selected stock')

    }

   fuck_ts.worth = fuck_ts.worth - value;
    account.capital = account.capital + value;

    if (fuck_ts.worth < 1) {
        account.portfolio.delete(ticker);

    }
}

//Updates worth of all stocks in portfolio
export function update_portfolio(account: account): void {
    account.portfolio.forEach (function(value, key) {
        const change: number = MARKET NU.key / MARKET DÅ.key;
        value.worth = value.worth * change;
    })
}

//Calculates total value of an account, excluding liquid capital
export function calc_worth(account: account): number {
    let total: number = 0;
    account.portfolio.forEach ( function(value, key) {
        total = total + value.worth;
    })
    return total;
}

//Prints the status of the account
export function account_status(account: account): void {
    const total_worth: number = calc_worth(account)
    const change: number = (total_worth / 1000) - 1
    console.log('The account has a worth of'
                + total_worth
                + 'across' 
                + account.portfolio.size
                + 'stocks, and' 
                + account.capital 
                + 'in additional funds.')
    if (change >= 0) {
        console.log('The account value has increased by %d%.', change)
    } else {
        console.log('The account value has decreased by %d%.', change)
    }
}