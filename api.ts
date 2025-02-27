import { json_to_aggregate } from "./parse";

const apiKey: string = "ycT2akQvJ7n6FDhD99q3oB6ypvqbYaBg";
const baseQuery: string = "https://api.polygon.io/v2/aggs/ticker"; 

/**
 * Fetches data from polygon stock market api for a given date at given intervals
 * Use like this: get_response("YYYY-MM-DD", 1, "minute").then(result => { //Do something with result });
 * @param simulationDate which date to get data from
 * @param range what interval to get data at ("1", "2", "3", "4")
 * @param timespan what time unit the interval is ('minute', 'day', 'second')
 * @returns a promise with the fetched data
 */
export async function get_response(simulationDate: string, range: number, timespan: string) {
    const ticker = "AAPL"; // Apple Inc.

    const query: string = baseQuery + "/" + ticker + "/range/" + range + "/" + timespan + "/" + simulationDate + "/" + simulationDate + "?apiKey=" + apiKey;
    const resultPromise = await fetch(query).catch((error) => {
        throw new Error(error);
    });
    
    return resultPromise.json();
}
