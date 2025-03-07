import { json_to_timeline } from "./parse";
import { account_snapshot, account_timeline, timeline, trade_action, trading_result } from "./types";
import { get_response } from "./api"
import { Bot } from "./actions"

/**
 * Starts and runs the trading bot simulation.
 * Retrieves stock data for the given date and ticker, 
 * and runs the trading bot using the specified capital.
 * @param date_input The date for the stock data
 * @param stock_input The stock symbol (ticker)
 * @param capital_input The initial capital for the bot
 * @returns The result of the trading simulation
 */
export async function run(date_input: string, stock_input: string, capital_input: string): Promise<trading_result> {
    console.log("  RENTZHOG     Capital")
    console.log("CHRISTOPHERS   Management")
    console.log("  WIRKKALA     Group LLC.")
    console.log("                        & Sons")

    const result = await get_response(stock_input, date_input, 1, 'minute');
        
    const json = JSON.stringify(result);
    const timeline: timeline = json_to_timeline(json);

    const bot = new Bot(stock_input, timeline, parseInt(capital_input));

    const trade_res: trading_result = main_loop(bot);

    return trade_res;
}

/**
 * Main loop of the program, runs the algorithm for the bots timeline
 * @param bot Bot to run
 * @returns A result of the trading, including timeline over account,
 *          stock timeline and trading actions (buy/sell)
 */
function main_loop(bot: Bot) : trading_result {
    const value_timeline: account_timeline = [];
    const actions: trade_action[] = [];

    for(let time_idx: number = 0; time_idx < bot.timeline.length; time_idx++){
        const action: trade_action = algorithm(bot, time_idx);

        bot.update_stock(time_idx);
        bot.account_status(time_idx);

        const snapshot: account_snapshot = {
            time: bot.timeline[time_idx].time,
            value: bot.get_total_value()
        }

        value_timeline[value_timeline.length] = snapshot;
        actions[actions.length] = action;
    }

    const trade_res: trading_result = {
        account_timeline: value_timeline,
        stock_timeline: bot.timeline,
        trade_actions: actions
    }

    return trade_res;
}

/**
 * Buy/Sell algorithm, determines if we should buy or sell based on current stock information
 * @param bot Bot to run algorithm on
 * @param time_idx What index of the bot's timeline we are on
 * @precondition time_idx should be in the bounds of the bots timeline
 * @returns an action of either buy sell or wait
 */
function algorithm(bot: Bot, time_idx: number) : trade_action {
    const current_data = bot.timeline[time_idx].aggregate;

    const current_action: trade_action = {
        time: bot.timeline[time_idx].time,
        action: "wait"
    }

    if (time_idx === 0) {
        return current_action;
    }

    if (current_data.close < current_data.vwa && bot.account.capital >= current_data.close) {
        const amountToBuy = bot.account.capital * 0.5;
        if (amountToBuy / current_data.close > 0) {
            bot.buy(amountToBuy);
            current_action.action = "buy";
            console.log(`Buying`, Math.round(amountToBuy * 100) / 100, `worth of ${current_data.ticker} at ${current_data.close}`);
        }
    }

    else if (current_data.close > current_data.vwa) {
        const amountToSell = bot.account.capital * 0.5;
        bot.sell(amountToSell);
        current_action.action = "sell";
        console.log(`Selling`, Math.round(amountToSell * 100) / 100, `worth of ${current_data.ticker} at ${current_data.close}`);
    }

    else {
        console.log(`Waiting at index ${time_idx}, no action taken.`);
    }

    return current_action;
}