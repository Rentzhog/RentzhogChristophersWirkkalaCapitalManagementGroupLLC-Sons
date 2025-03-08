import { timeline } from "./types";
import { trade_action, account } from "./types";

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
     * Buy/Sell algorithm, determines if we should buy or sell based on current stock information
     * @param bot Bot to run algorithm on
     * @param time_idx What index of the bot's timeline we are on
     * @precondition time_idx should be in the bounds of the bots timeline
     * @returns an action of either buy sell or wait
     */
    algorithm(time_idx: number) : trade_action {
        const current_data = this.timeline[time_idx].aggregate;

        const current_action: trade_action = {
            time: this.timeline[time_idx].time,
            action: "wait"
        }

        if (time_idx === 0) {
            return current_action;
        }

        if (current_data.close < current_data.vwa) {
            const amountToBuy = this.account.capital * 0.5;
            this.buy(amountToBuy);
            current_action.action = "buy";
            console.log(`Buying`, Math.round(amountToBuy * 100) / 100, `worth of ${current_data.ticker} at ${current_data.close}`);
        }

        else if (current_data.close > current_data.vwa) {
            const amountToSell = this.account.capital * 0.5;
            this.sell(amountToSell);
            current_action.action = "sell";
            console.log(`Selling`, Math.round(amountToSell * 100) / 100, `worth of ${current_data.ticker} at ${current_data.close}`);
        }

        else {
            console.log(`Waiting at index ${time_idx}, no action taken.`);
        }

        return current_action;
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
    log_account_status(time_idx: number): void {
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