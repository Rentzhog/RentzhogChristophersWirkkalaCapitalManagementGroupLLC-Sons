import { json_to_timeline, timeline } from "./parse";
import { get_response } from "./api"
import { Bot } from "./actions"

/**
 * Initialises the program with stock tickers to be tracked
 */
export function start_up(date_input: string, stock_input: string, capital_input: string): void {
    console.log("  RENTZHOG     Capital")
    console.log("CHRISTOPHERS   Management")
    console.log("  WIRKKALA     Group LLC.")
    console.log("                        & Sons")

    const api_key: string = "ycT2akQvJ7n6FDhD99q3oB6ypvqbYaBg";

    get_response(api_key, stock_input, date_input, 1, 'minute').then(result => {
        const json = JSON.stringify(result);
        const timeline: timeline = json_to_timeline(json);

        const bot = new Bot(stock_input, timeline, parseInt(capital_input));

        main_loop(bot);
    });
}


/**
 * Main loop of the program, runs the algorithm for the bots timeline
 * @param bot Bot to run
 */
function main_loop(bot: Bot){
    for(let time_idx: number = 0; time_idx < bot.timeline.length; time_idx++){
        algorithm(bot, time_idx);

        bot.update_stock(time_idx);
        bot.account_status(time_idx);
    }

    // HERE I WILL RETURN THE ARRAY
}

/**
 * Buy/Sell algorithm, determines if we should buy or sell based on current stock information
 * @param bot Bot to run algorithm on
 * @param time_idx What index of the bot's timeline we are on
 * @precondition time_idx should be in the bounds of the bots timeline
 */
function algorithm(bot: Bot, time_idx: number){
    const currentData = bot.timeline[time_idx].aggregate;

    if (time_idx === 0) {
        return;
    }

    if (currentData.close < currentData.vwa && bot.account.capital >= currentData.close) {
        const amountToBuy = bot.account.capital * 0.5;
        if (amountToBuy / currentData.close > 0) {
            bot.buy(amountToBuy);
            console.log(`Buying`, Math.round(amountToBuy * 100) / 100, `worth of ${currentData.ticker} at ${currentData.close}`);
        }
    }

    else if (currentData.close > currentData.vwa) {
        const amountToSell = bot.account.capital * 0.5;
        bot.sell(amountToSell);
        console.log(`Selling`, Math.round(amountToSell * 100) / 100, `worth of ${currentData.ticker} at ${currentData.close}`);
    }

    else {
        console.log(`Waiting at index ${time_idx}, no action taken.`);
    }
}