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