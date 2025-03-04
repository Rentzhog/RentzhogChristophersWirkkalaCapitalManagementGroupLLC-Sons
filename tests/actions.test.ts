import { Bot } from '../actions';
import { timeline } from '../parse';

let sampleTimeline: timeline;
let bot: Bot;
const startCapital = 1000;
const ticker = 'AAPL';

beforeEach(() => {
    sampleTimeline = [
        {
        time: 1000,
        aggregate: {
            ticker: ticker,
            open: 100,
            close: 110,
            high: 115,
            low: 95,
            amount: 1000,
            volume: 500,
            vwa: 105,
        }
        },
        {
        time: 2000,
        aggregate: {
            ticker: ticker,
            open: 110,
            close: 120,
            high: 125,
            low: 105,
            amount: 1500,
            volume: 800,
            vwa: 115,
        }
        }
    ];

    bot = new Bot(ticker, sampleTimeline, startCapital);

});

test('correct creation of bot', () => {
    expect(bot.account.capital).toBe(startCapital);
    expect(bot.account.stock.ticker).toBe(ticker);
    expect(bot.account.stock.worth).toBe(0);
});

test('buy 400, check if capital is start - 400 and stock woth is 400', () => {
    bot.buy(400);
    expect(bot.account.capital).toBe(startCapital - 400);
    expect(bot.account.stock.worth).toBe(400);
});

test('sell increases capital and decreases stock worth when sufficient stock is owned', () => {
    bot.buy(400); 
    bot.sell(200);
    expect(bot.account.capital).toBe(startCapital - 400 + 200);
    expect(bot.account.stock.worth).toBe(400 - 200);
});

test('sell does not execute if not enough stock is owned', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    bot.sell(100); 
    expect(consoleSpy).toHaveBeenCalledWith('Account does not own enough of selected stock');
    expect(bot.account.capital).toBe(startCapital);
    expect(bot.account.stock.worth).toBe(0);
    consoleSpy.mockRestore();
});

