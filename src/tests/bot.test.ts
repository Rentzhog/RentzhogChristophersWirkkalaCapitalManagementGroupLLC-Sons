import { Bot } from '../bot';
import { timeline } from '../types';

let sampleTimeline: timeline
let bot: Bot;
const startCapital = 1000;
const ticker = 'AAPL';

beforeEach(() => {
    sampleTimeline = [
        {
        time: 500,
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
        time: 1000,
        aggregate: {
            ticker: ticker,
            open: 100,
            close: 120,
            high: 125,
            low: 95,
            amount: 1000,
            volume: 500,
            vwa: 110,
        }
        },
        {
        time: 2000,
        aggregate: {
            ticker: ticker,
            open: 120,
            close: 110,
            high: 125,
            low: 105,
            amount: 1500,
            volume: 800,
            vwa: 115,
        }
        },
        {
        time: 3000,
        aggregate: {
            ticker: ticker,
            open: 130,
            close: 130,
            high: 135,
            low: 125,
            amount: 1800,
            volume: 800,
            vwa: 130,
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

test('update_stock does nothing on index 0', () => {
    bot.buy(100);
    expect(bot.account.stock.worth).toBe(100);
    bot.update_stock(0);
    expect(bot.account.stock.worth).toBe(100);
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
    bot.log_account_status(1);
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

test('get_total_value returns correct total when stock is present', () => {
    bot.account.capital = 500;
    bot.account.stock.worth = 200;
    expect(bot.get_total_value()).toBe(700);
});

test('algorithm sells when stock close is above vwa', () => {
    // Entry at idx 0 in sample timeline has close > vwa, we expect bot to sell
    bot.account.capital = 1000;
    const action = bot.algorithm(1);
    expect(action.action).toBe('sell');
});

test('algorithm buys when stock close is below vwa', () => {
    // Entry at idx 1 in sample timeline has close < vwa, we expect bot to buy
    bot.account.capital = 1000;
    const action = bot.algorithm(2);
    expect(action.action).toBe('buy');
});

test('algorithm waits when close equals vwa', () => {
    // Entry at idx 2 in sample timeline has close === vwa, we expect bot to wait
    bot.account.capital = 1000;
    const action = bot.algorithm(3);
    expect(action.action).toBe('wait');
});

test('algorithm waits at first index', () => {
    const action = bot.algorithm(0);
    expect(action.action).toBe('wait');
});