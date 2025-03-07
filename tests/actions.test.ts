import { Bot } from '../src/actions';
import { timeline } from '../src/types';

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

test('update_stock correctly updates stock worth', () => {
    bot.buy(500);
    expect(bot.account.stock.worth).toBe(500);
    
    bot.update_stock(1);
    
    const expectedWorth = 500 * (sampleTimeline[1].aggregate.close / sampleTimeline[0].aggregate.close);
    expect(bot.account.stock.worth).toBeCloseTo(expectedWorth);
});

test('buy does not allow purchase if capital is insufficient', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    bot.buy(startCapital + 100); 
    expect(consoleSpy).toHaveBeenCalledWith('Not enough capital to complete transaction.');
    expect(bot.account.capital).toBe(startCapital);
    expect(bot.account.stock.worth).toBe(0);
    consoleSpy.mockRestore();
});

test('account_status gives correct status', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    bot.buy(500);
    bot.account_status(1);
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
});

test('sell does not allow selling more than owned stock', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    bot.buy(300);
    bot.sell(400);
    expect(consoleSpy).toHaveBeenCalledWith('Account does not own enough of selected stock');
    expect(bot.account.capital).toBe(startCapital - 300);
    expect(bot.account.stock.worth).toBe(300);
    consoleSpy.mockRestore();
});