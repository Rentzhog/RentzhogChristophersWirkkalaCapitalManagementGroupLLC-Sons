import { get_response } from '../api';


it('fetch with correct url', async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
        json: () => Promise.resolve({}),
        })
    ) as jest.Mock;

    await get_response('AAPL', '2025-02-04', 1, 'minute');

    expect(global.fetch).toHaveBeenCalledWith(
        'https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/minute/2025-02-04/2025-02-04?apiKey=ycT2akQvJ7n6FDhD99q3oB6ypvqbYaBg'
    );
});



it('return parsed json response', async () => {
    const resp = {};
    const result = await get_response('AAPL', '2025-02-04', 1, 'minute');

    expect(result).toEqual(resp);
});



it('should throw an error',async()=>{

    global.fetch = jest.fn(()=> Promise.reject("Network Error")) as jest.Mock;

    await expect(get_response('AAPL', '2025-02-04', 1, 'minute')).rejects.toThrow("Network Error")
})
