import { aggregate, json_to_aggregate } from "../parse";

// test('', () => {
//     expect().toBe();
// });

test('json_to_aggregate', () => {
    const agg = json_to_aggregate('{"ticker": "AAPL","queryCount": 1,"resultsCount": 1,"adjusted": true,"results": [{"v": 1755,"vw": 239.7725,"o": 239.63,"c": 239.92,"h": 239.92,"l": 239.63,"t": 1738227600000,"n": 98}]}')
    const agg_target = {
        ticker : "AAPL",
        open   : 239.63,
        close  : 239.92,
        high   : 239.92,
        low    : 239.63,
        amount : 98,
        volume : 1755,
        vwa    : 239.7725
    }
    expect(agg).toStrictEqual(agg_target);
});