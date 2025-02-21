const apiKey: string = "ycT2akQvJ7n6FDhD99q3oB6ypvqbYaBg";
const baseQuery: string = "https://api.polygon.io/v2/aggs/ticker"; 

// OBS! Den här funktionen ska returna JSON-filen i form av en string -D
export async function getResponse(simulationDate: string, range: string, timespan: string) : Promise<number> {
    const ticker = "AAPL"; // Apple Inc.

    const query: string = baseQuery + "/" + ticker + "/range/" + range + "/" + timespan + "/" + simulationDate + "/" + simulationDate + "?apiKey=" + apiKey;

    await fetch(query)    
        .then(res => res.json())
        .then(res => {
        // The response has an `any` type, so we need to cast
        // it to the `User` type, and return it from the promise

        if(res.status === "OK"){
            return 3334343;
        }else{
            throw new Error(res.message);
        }
        })

    return 0;
}