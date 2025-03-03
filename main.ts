import { json_to_timeline, timeline, timelines_to_market } from "./parse";
import { get_response } from "./api"
import { Bot } from "./actions"

const tracked_stocks: Array<string> = ['AAPL', 'MSFT', 'NVDA', 'AMZN', 'GOOG'];

/**
 * Initialises the program with stock tickers to be tracked
 * @example
 * // result is dependent
 * start_up(['AAPL, 'MSFT']);
 * @param tracked_stocks stock tickers to be tracked in the NASDAQ stock exchange
 */
function start_up(tracked_stocks: Array<string>): void {
    console.log("  RENTZHOG     Capital")
    console.log("CHRISTOPHERS   Management")
    console.log("  WIRKKALA     Group LLC.")
    console.log("                        & Sons")

    //const date_input: string | null = prompt('Enter simulation date (YYYY-MM-DD)\n> ', '2025-02-20');
    const date_input: string = '2025-02-20';
    
    const timelines: Array<timeline> = []

    if (date_input != null) {
        for (let i = 0; i < tracked_stocks.length; i++) {
            get_response(tracked_stocks[i], date_input, 1, 'minute').then(result => {
                const json = JSON.stringify(result)
                const timeline: timeline = json_to_timeline(json);
                timelines.push(timeline);
            });
        }
    }

    const market = timelines_to_market(timelines);
    const bot = new Bot(market);

    // Det här skulle kunna bakas in i Bot constructorn -D
    //const capital_input: string | null = prompt('Enter starting capital for the bot:\n> ', '0');
    const capital_input: string = '1000';
    bot.account.capital = capital_input != null 
    ? parseInt(capital_input) 
    : 0;
}

//INSERT MORE CODE HERE

start_up(tracked_stocks)