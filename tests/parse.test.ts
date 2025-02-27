import { aggregate, json_to_timeline, timelines_to_market } from "../parse";

// test('', () => {
//     expect().toBe();
// });

test('json_to_timeline', () => {
    const json_string = '{"ticker":"AAPL","queryCount":770,"resultsCount":770,"adjusted":true,"results":[{"v":2628,"vw":247.117,"o":247.76,"c":246.81,"h":247.76,"l":246.81,"t":1740474000000,"n":89},{"v":1188,"vw":246.9877,"o":246.98,"c":247,"h":247,"l":246.98,"t":1740474060000,"n":56},{"v":952,"vw":247.0297,"o":247,"c":247,"h":247,"l":247,"t":1740474120000,"n":80}],"status":"OK","request_id":"e262aa5f0ad32808f97aa5b8d89dd9b7","count":770}'
    const timeline = json_to_timeline(json_string)
    const timeline_target = [
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
    ]
    expect(timeline).toStrictEqual(timeline_target);
});