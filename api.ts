const apiKey: string = "ycT2akQvJ7n6FDhD99q3oB6ypvqbYaBg";
const baseQuery: string = "https://api.polygon.io/v2/aggs/ticker"; 

// What timespan to get from API
const range: string = "1"
const timespan: string = "minute"

const simulationDate: string = "2025-01-30"

let previousTime = Date.now();

console.log(getResponse());

function getResponse(){
    const from: string = simulationDate;
    const to: string = simulationDate;
    const ticker = "AAPL"; // Apple Inc.

    const query: string = baseQuery + "/" + ticker + "/range/" + range + "/" + timespan + "/" + from + "/" + to + "?apiKey=" + apiKey;

    fetch(query)    
        .then(res => res.json())
        .then(res => {
        // The response has an `any` type, so we need to cast
        // it to the `User` type, and return it from the promise

        if(res.status == "OK"){
            return res
        }else{
            throw new Error(res.message);
        }
        })
}