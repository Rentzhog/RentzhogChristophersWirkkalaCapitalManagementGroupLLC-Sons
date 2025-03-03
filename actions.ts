import { timeline } from "./parse";

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

export class Bot {
    account: account;
    timeline: timeline;
    start_capital: number;

    constructor(stock: string, timeline: timeline, start_capital: number) {
        this.account = {
            capital: start_capital,
            stock: {ticker: stock, worth: 0}
        }
        this.timeline = timeline;
        this.start_capital = start_capital;
    }

    buy(value: number): void{
        if (this.account.capital < value) {
            console.log('Not enough capital to complete transaction.');
            return;
        }

        this.account.capital = this.account.capital - value;

        this.account.stock.worth += value;
    }

    //Sells amount of an owned stock
    sell(value: number): void {

        if (this.account.stock.worth < value) {
            console.log('Account does not own enough of selected stock')
            return;
        }

        this.account.stock.worth -= value;
        this.account.capital += value;
    }

    //Updates worth of stock
    update_stock(time_idx: number): void {
        if(time_idx == 0){ return; }
        const change: number = (this.timeline[time_idx].aggregate.close / this.timeline[time_idx - 1].aggregate.close);
        this.account.stock.worth *= change;
    }

    //Prints the status of the account
    account_status(time_idx: number): void {
        const date = new Date(this.timeline[time_idx].time);

        const change: number = ((this.account.stock.worth + this.account.capital) / this.start_capital) - 1;
        console.log("");
        console.log('Current simulation time:', date.toTimeString())
        console.log('The account has a worth of' , Math.round(this.account.stock.worth * 100) / 100);
        console.log('across one stock');
        console.log('and', Math.round(this.account.capital * 100) / 100, 'in additional funds.');
        console.log('The account value has changed by', Math.round(change * 100 * 1000) / 1000, "%");
    }
}