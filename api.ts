const API_KEY = "ycT2akQvJ7n6FDhD99q3oB6ypvqbYaBg"

console.log(getResponse());

function getResponse(){
    const query: string = "https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-01-09?apiKey=" + API_KEY; 

    fetch(query)    
        .then(res => res.json())
        .then(res => {
        // The response has an `any` type, so we need to cast
        // it to the `User` type, and return it from the promise

        if(res.status == "NOT_AUTHORIZED"){
            throw new Error(res.message);
        }

        return res
        })
}