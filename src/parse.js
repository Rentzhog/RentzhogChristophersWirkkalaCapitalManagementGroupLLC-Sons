"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.json_to_timeline = void 0;
/**
 * Parses API return from JSON to timeline object
 * @param json JSON file of a stocks history as a string.
 * @precondition json is a string of the json format
 * @complexity Theta(n), where n is length of the API results
 * @returns json converted to a stock timeline object
 */
function json_to_timeline(json) {
    const object = JSON.parse(json);
    const ticker = object.ticker;
    const timeline = [];
    for (let i = 0; i < object.resultsCount; i++) {
        const aggregate = {
            ticker: "",
            open: 0,
            close: 0,
            high: 0,
            low: 0,
            amount: 0,
            volume: 0,
            vwa: 0
        };
        aggregate.ticker = object.ticker;
        aggregate.open = object.results[i].o;
        aggregate.close = object.results[i].c;
        aggregate.high = object.results[i].h;
        aggregate.low = object.results[i].l;
        aggregate.amount = object.results[i].n;
        aggregate.volume = object.results[i].v;
        aggregate.vwa = object.results[i].vw;
        const time = object.results[i].t;
        timeline.push({ time, aggregate });
    }
    return timeline;
}
exports.json_to_timeline = json_to_timeline;
//# sourceMappingURL=parse.js.map