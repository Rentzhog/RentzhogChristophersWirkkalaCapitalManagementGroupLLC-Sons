import { json_to_timeline, timeline, timelines_to_market } from "./parse";
import { get_response } from "./api"
import { Bot } from "./actions"

const tracked_stocks: Array<string> = ['AAPL', 'MSFT', 'NVDA', 'AMZN', 'GOOG'];

// Initializes program
function start_up(tracked_stocks: Array<string>) {
    console.log("  RENTZHOG     Capital")
    console.log("CHRISTOPHERS   Management")
    console.log("  WIRKKALA     Group LLC.")
    console.log("                        & Sons")

    //const date_input: string | null = prompt('Enter simulation date (YYYY-MM-DD)\n> ', '2025-02-20');
    const date_input: string = '2025-02-20';
    const promises: Promise<void>[] = [];
    const timelines: Array<timeline> = []

    if (date_input != null) {
        tracked_stocks.forEach(ticker => {
            const promise = get_response(ticker, date_input, 1, 'minute')
                .then(result => {
                    const timeline: timeline = json_to_timeline(JSON.stringify(result));
                    timelines.push(timeline);
                });
            promises.push(promise);
        });
        
        Promise.all(promises).then(() => {
            const market = timelines_to_market(timelines);
            const bot = new Bot(market);
        
            const capital_input: string = '1000';
            bot.account.capital = parseInt(capital_input);
        
            console.log(market);
        });
    }
}

//INSERT MORE CODE HERE

start_up(tracked_stocks)