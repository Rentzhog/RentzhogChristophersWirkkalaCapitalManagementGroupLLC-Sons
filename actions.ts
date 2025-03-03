import { market } from "./parse"

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

export class Bot {
    account: account;
    market: market;

    constructor(market: market) {
        this.market = market;
        this.account = {
            capital: 0,
            portfolio: new Map()
        }
    }

    buy(ticker: string, value: number): void{

        if (value < this.account.capital) {

            console.log('Not enough capital to complete transaction.');
            return;
        }

        if (!this.market.has(ticker)) {
            console.log("Ticker does not exist in market")
            return;
        }

        this.account.capital = this.account.capital - value;

        const fuck_ts = this.account.portfolio.get(ticker)
        if (fuck_ts != undefined) {
            fuck_ts.worth = fuck_ts.worth + value;

        } else {
            let new_purchase: owned_stock = {ticker: ticker, worth: value};
            this.account.portfolio.set(ticker, new_purchase);

        }
    }

    //Sells amount of an owned stock
    sell(ticker: string, value: number): void {

        const fuck_ts = this.account.portfolio.get(ticker)

        if (fuck_ts === undefined) {
            console.log('Account does not own selected stock')
            return;

        }

        if (fuck_ts.worth < value) {
            console.log('Account does not own enough of selected stock')

        }

        fuck_ts.worth = fuck_ts.worth - value;
        this.account.capital = this.account.capital + value;

        if (fuck_ts.worth < 1) {
            this.account.portfolio.delete(ticker);
        }
    }

    //Updates worth of all stocks in portfolio
    update_portfolio(this: Bot, time: number): void {
        this.account.portfolio.forEach((value, key) => {
            const timeline = this.market.get(key)!;
            const change: number = timeline[time].aggregate.close / timeline[time - 1].aggregate.close;
            value.worth = value.worth * change;
        });
    }

    //Calculates total value of an account, excluding liquid capital
    calc_worth(account: account): number {
        let total: number = 0;
        account.portfolio.forEach ( function(value, key) {
            total = total + value.worth;
        })
        return total;
    }

    //Prints the status of the account
    account_status(account: account): void {
        const total_worth: number = this.calc_worth(account)
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
}