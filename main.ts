import { json_to_timeline, timeline } from "./parse";
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
    
    const stock: string = tracked_stocks[0];

    if (date_input != null) {
        get_response(tracked_stocks[0], date_input, 1, 'minute').then(result => {
            const json = JSON.stringify(result);
            const timeline: timeline = json_to_timeline(json);

            
            // const capital_input: string | null = prompt('Enter starting capital for the bot:\n> ', '0');
            const bot = new Bot(stock, timeline, 1000);

            main_loop(bot);
        });
    }
}

function main_loop(bot: Bot){
    for(let i: number = 0; i < bot.timeline.length; i++){
        // Simple algorithm, alternate between buying and selling
        const amount: number = 100;

        if(i % 2 == 0){
            bot.buy(amount);
        }
        else{
            bot.sell(amount);
        }

        bot.update_stock(i);
        bot.account_status(i);
    }
}

//INSERT MORE CODE HERE

start_up(tracked_stocks)