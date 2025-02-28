import { json_to_timeline, timelines_to_market, timeline} from "../parse";

test('json_to_timeline', () => {
    const json_string = '{"ticker":"AAPL","queryCount":3,"resultsCount":3,"adjusted":true,"results":[{"v":2628,"vw":247.117,"o":247.76,"c":246.81,"h":247.76,"l":246.81,"t":1740474000000,"n":89},{"v":1188,"vw":246.9877,"o":246.98,"c":247,"h":247,"l":246.98,"t":1740474060000,"n":56},{"v":952,"vw":247.0297,"o":247,"c":247,"h":247,"l":247,"t":1740474120000,"n":80}],"status":"OK","request_id":"e262aa5f0ad32808f97aa5b8d89dd9b7","count":770}'
    const timeline = json_to_timeline(json_string)
    const timeline_target = {ticker: 'AAPL', timeline: [
        {
            time: 1740474000000,
            aggregate: {
                ticker : 'AAPL',
                open   : 247.76,
                close  : 246.81,
                high   : 247.76,
                low    : 246.81,
                amount : 89,
                volume : 2628,
                vwa    : 247.117
            }
        },
        {
            time: 1740474060000,
            aggregate: {
                ticker : 'AAPL',
                open   : 246.98,
                close  : 247,
                high   : 247,
                low    : 246.98,
                amount : 56,
                volume : 1188,
                vwa    : 246.9877
            }
        },
        {
            time: 1740474120000,
            aggregate: {
                ticker : 'AAPL',
                open   : 247,
                close  : 247,
                high   : 247,
                low    : 247,
                amount : 80,
                volume : 952,
                vwa    : 247.0297
            }
        }
    ]}
    expect(timeline).toStrictEqual(timeline_target);
});

test('timelines_to_market', () => {
    const timelines: Array<timeline> = [[
        {
            time: 1740474000000,
            aggregate: {
                ticker : 'AAPL',
                open   : 247.76,
                close  : 246.81,
                high   : 247.76,
                low    : 246.81,
                amount : 89,
                volume : 2628,
                vwa    : 247.117
            }
        },
        {
            time: 1740474060000,
            aggregate: {
                ticker : 'AAPL',
                open   : 246.98,
                close  : 247,
                high   : 247,
                low    : 246.98,
                amount : 56,
                volume : 1188,
                vwa    : 246.9877
            }
        },
        {
            time: 1740474120000,
            aggregate: {
                ticker : 'AAPL',
                open   : 247,
                close  : 247,
                high   : 247,
                low    : 247,
                amount : 80,
                volume : 952,
                vwa    : 247.0297
            }
        }
    ]]
    const market_target = new Map([["AAPL", [
        {
            "aggregate": {
                "amount": 89,
                "close": 246.81,
                "high": 247.76,
                "low": 246.81,
                "open": 247.76,
                "ticker": "AAPL",
                "volume": 2628,
                "vwa": 247.117},
            "time": 1740474000000
        },
        {
            "aggregate": {
                "amount": 56,
                "close": 247,
                "high": 247,
                "low": 246.98,
                "open": 246.98,
                "ticker": "AAPL",
                "volume": 1188,
                "vwa": 246.9877},
            "time": 1740474060000
        },
        {
            "aggregate": {
                "amount": 80,
                "close": 247,
                "high": 247,
                "low": 247,
                "open": 247,
                "ticker": "AAPL",
                "volume": 952,
                "vwa": 247.0297}, 
            "time": 1740474120000}]]])
    const market = timelines_to_market(timelines)
    expect(market).toStrictEqual(market_target);
});