"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.start_up = void 0;
const parse_1 = require("./parse");
const api_1 = require("./api");
const actions_1 = require("./actions");
/**
 * Initialises the program with stock tickers to be tracked
 */
function start_up(date_input, stock_input, capital_input) {
    console.log("  RENTZHOG     Capital");
    console.log("CHRISTOPHERS   Management");
    console.log("  WIRKKALA     Group LLC.");
    console.log("                        & Sons");
    const api_key = "ycT2akQvJ7n6FDhD99q3oB6ypvqbYaBg";
    (0, api_1.get_response)(api_key, stock_input, date_input, 1, 'minute').then(result => {
        const json = JSON.stringify(result);
        const timeline = (0, parse_1.json_to_timeline)(json);
        const bot = new actions_1.Bot(stock_input, timeline, parseInt(capital_input));
        main_loop(bot);
    });
}
exports.start_up = start_up;
/**
 * Main loop of the program, runs the algorithm for the bots timeline
 * @param bot Bot to run
 */
function main_loop(bot) {
    for (let time_idx = 0; time_idx < bot.timeline.length; time_idx++) {
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
function algorithm(bot, time_idx) {
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
//# sourceMappingURL=main.js.map