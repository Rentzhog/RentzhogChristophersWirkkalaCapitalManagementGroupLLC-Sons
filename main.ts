import { json_to_timeline, timeline } from "./parse";
import { get_response } from "./api"
import { Bot } from "./actions"
import { Random } from "random";

const prompt = require("prompt-sync")();

/**
 * Initialises the program with stock tickers to be tracked
 * @example
 * // result is dependent
 * start_up(['AAPL, 'MSFT']);
 * @param tracked_stocks stock tickers to be tracked in the NASDAQ stock exchange
 */
function start_up(): void {
    console.log("  RENTZHOG     Capital")
    console.log("CHRISTOPHERS   Management")
    console.log("  WIRKKALA     Group LLC.")
    console.log("                        & Sons")

    const date_input: string = prompt('Enter simulation date (YYYY-MM-DD): ');
    const stock_input: string = prompt('Enter stock ticker (ex. AAPL, GOOG): ');
    const capital_input: string = prompt('Enter starting capital: ');
    const api_key: string = "ycT2akQvJ7n6FDhD99q3oB6ypvqbYaBg";

    get_response(api_key, stock_input, date_input, 1, 'minute').then(result => {
        const json = JSON.stringify(result);
        const timeline: timeline = json_to_timeline(json);

        const bot = new Bot(stock_input, timeline, parseInt(capital_input));

        main_loop(bot);
    });
}

function main_loop(bot: Bot){
    for(let time_idx: number = 0; time_idx < bot.timeline.length; time_idx++){
        algorithm(bot, time_idx);

        bot.update_stock(time_idx);
        bot.account_status(time_idx);
    }
}

function algorithm(bot: Bot, time_idx: number){
    const currentData = bot.timeline[time_idx].aggregate;

    // Check if we're at the first data point; nothing to do
    if (time_idx === 0) {
        return;
    }

    const previousData = bot.timeline[time_idx - 1].aggregate;

    // Buy if the current price is below the VWAP and we have enough cash
    if (currentData.close < currentData.vwa && bot.account.capital >= currentData.close) {
        const amountToBuy = bot.account.capital * 0.5;
        if (amountToBuy / currentData.close > 0) {
            bot.buy(amountToBuy);
            console.log(`Buying`, Math.round(amountToBuy * 100) / 100, `worth of ${currentData.ticker} at ${currentData.close}`);
        }
    }

    // Sell if the current price is above the VWAP
    else if (currentData.close > currentData.vwa) {
        const amountToSell = bot.account.capital * 0.5;
        bot.sell(amountToSell);
        console.log(`Selling`, Math.round(amountToSell * 100) / 100, `worth of ${currentData.ticker} at ${currentData.close}`);
    }

    // Wait condition
    else {
        console.log(`Waiting at index ${time_idx}, no action taken.`);
    }
}

//INSERT MORE CODE HERE

start_up();