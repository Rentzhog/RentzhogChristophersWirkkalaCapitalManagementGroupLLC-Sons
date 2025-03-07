"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_response = void 0;
/**
 * Fetches data from polygon stock market api for a given date at given intervals
 * Use like this: get_response("YYYY-MM-DD", 1, "minute").then(result => { //Do something with result });
 * @param ticker what stock to get data from
 * @param simulationDate which date to get data from
 * @param range what interval to get data at ("1", "2", "3", "4")
 * @param timespan what time unit the interval is ('minute', 'day', 'second')
 * @precondition ticker, simulationDate, range, timespan being calid inputs to the Polygon Stock API
 * @returns a promise with the fetched data
 */
async function get_response(apiKey, ticker, simulationDate, range, timespan) {
    const baseQuery = "https://api.polygon.io/v2/aggs/ticker";
    const query = baseQuery + "/" + ticker + "/range/" + range + "/" + timespan + "/" + simulationDate + "/" + simulationDate + "?apiKey=" + apiKey;
    const resultPromise = await fetch(query).catch((error) => {
        throw new Error(error);
    });
    return resultPromise.json();
}
exports.get_response = get_response;
//# sourceMappingURL=api.js.map