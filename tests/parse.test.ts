
import { json_to_timeline, timeline } from '../parse'; // Adjust the import path

it('parse json str to timeline', () => {
    const jsonString = `
        {
            "ticker": "AAPL",
            "queryCount": 1,
            "resultsCount": 1,
            "adjusted": true,
            "results": [{
                "v": 3.141592653,
                "vw":3.141592653,
                "o": 3.141592653,
                "c": 3.141592653,
                "h": 3.141592653,
                "l": 3.141592653,
                "t": 3.141592653,
                "n": 3.141592653
            }]
        }
    `;

    const expectedTimeline: timeline = [
        {
            time: 3.141592653,
            aggregate: {
                ticker: "AAPL",
                open: 3.141592653,
                close: 3.141592653,
                high: 3.141592653,
                low: 3.141592653,
                amount: 3.141592653,
                volume: 3.141592653,
                vwa: 3.141592653,
            },
        },
    ];

    const result = json_to_timeline(jsonString);
    expect(result).toEqual(expectedTimeline);
});

it('multiple results', () => {
    const jsonString = `
        {
            "ticker": "AAPL",
            "queryCount": 2,
            "resultsCount": 2,
            "adjusted": true,
            "results": [
                { "v": 1, "vw": 1, "o": 1, "c": 2, "h": 3, "l": 4, "t": 1000, "n": 5 },
                { "v": 6, "vw": 7, "o": 8, "c": 9, "h": 10, "l": 11, "t": 2000, "n": 12 }
            ]
        }
    `;

    const expectedTimeline: timeline = [
        {
            time: 1000,
            aggregate: { ticker: "AAPL", open: 1, close: 2, high: 3, low: 4, amount: 5, volume: 1, vwa: 1 },
        },
        {
            time: 2000,
            aggregate: { ticker: "AAPL", open: 8, close: 9, high: 10, low: 11, amount: 12, volume: 6, vwa: 7 },
        },
    ];

    const result = json_to_timeline(jsonString);
    expect(result).toEqual(expectedTimeline);
});

it('empty results', () => {
    const jsonString = `
        {
            "ticker": "AAPL",
            "queryCount": 0,
            "resultsCount": 0,
            "adjusted": true,
            "results": []
        }
    `;

    const expectedTimeline: timeline = [];
    const result = json_to_timeline(jsonString);
    expect(result).toEqual(expectedTimeline);
});

it('invalid json', () => {
    const invalidJsonString = 'invalid json';
    expect(() => json_to_timeline(invalidJsonString)).toThrow();
});
