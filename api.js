"use strict";
var API_KEY = "ycT2akQvJ7n6FDhD99q3oB6ypvqbYaBg";
console.log(getResponse());
function getResponse() {
    var query = "https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-01-09?apiKey=" + API_KEY;
    fetch(query)
        .then(function (res) { return res.json(); })
        .then(function (res) {
        // The response has an `any` type, so we need to cast
        // it to the `User` type, and return it from the promise
        if (res.status == "NOT_AUTHORIZED") {
            throw new Error(res.message);
        }
        return res;
    });
}
