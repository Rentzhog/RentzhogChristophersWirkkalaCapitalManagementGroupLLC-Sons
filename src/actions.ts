import { timeline } from "./types";

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

    /**
     * Theoretically purchases an amount of stock with the bot's account.
     * @example
     * // 400 subtracted from capital and 400 worth of assets added
     * bot.buy(400);
     * @param value intended value to buy of the stock.
     * @precondition bot capital is greater than value
     * @complexity Theta(1)
     * @returns void
     */
    buy(value: number): void{
        if (this.account.capital < value) {
            console.log('Not enough capital to complete transaction.');
            return;
        }

        this.account.capital = this.account.capital - value;

        this.account.stock.worth += value;
    }

    /**
     * Theoretically sells an amount of stock with the bot's account.
     * @example
     * // 400 added to capital and 400 worth of assets removed
     * bot.sell(400);
     * @param value intended value to buy of the stock.
     * @precondition worth of assets greater than value
     * @complexity Theta(1)
     * @returns void
     */
    sell(value: number): void {

        if (this.account.stock.worth < value) {
            console.log('Account does not own enough of selected stock')
            return;
        }

        this.account.stock.worth -= value;
        this.account.capital += value;
    }

    /**
     * Updates worth of account based on market development.
     * @example
     * // increases bot asset worth by the change from snapshot 44 to 45
     * update_portfolio(45);
     * @param time number of the currently simulated snapshot.
     * @precondition time is shorter than bot timeline.
     * @complexity Theta(1)
     * @returns void
     */
    update_stock(time_idx: number): void {
        if(time_idx == 0){ return; }
        const change: number = (this.timeline[time_idx].aggregate.close / this.timeline[time_idx - 1].aggregate.close);
        this.account.stock.worth *= change;
    }

    /**
     * Logs the status of the account compared to initialisation.
     * @param time_idx current simulation time as index of timeline.
     */
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

    /**
     * Calculates the total value of the account
     * Including value of stock and capital
     * @returns calculated value
     */
    get_total_value(): number{
        return this.account.capital + this.account.stock.worth;
    }
}