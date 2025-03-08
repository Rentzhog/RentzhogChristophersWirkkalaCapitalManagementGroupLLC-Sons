import { timeline, aggregate } from "./types";

/**
 * Parses API return from JSON to timeline object
 * @param json JSON file of a stocks history as a string.
 * @precondition json is a string of the json format
 * @complexity Theta(n), where n is length of the API results
 * @returns json converted to a stock timeline object
 */
export function json_to_timeline(json: string): timeline {
    const object = JSON.parse(json);
    const timeline: timeline = [];
    for (let i = 0; i < object.resultsCount; i++) {
        const aggregate: aggregate = {
            ticker : object.ticker,
            open   : object.results[i].o,
            close  : object.results[i].c,
            high   : object.results[i].h,
            low    : object.results[i].l,
            amount : object.results[i].n,
            volume : object.results[i].v,
            vwa    : object.results[i].vw
        }

        const time: number = object.results[i].t
        timeline.push({time, aggregate});
    }
    return timeline;
}