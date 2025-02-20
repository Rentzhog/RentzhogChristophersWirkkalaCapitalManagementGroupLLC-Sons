import { getResponse } from "./api"

// A stock in account portfolio
type owned_stock = {
    ticker : string,
    worth  : number
}

// An account with liquid cash and asset portfolio
type account = {
    capital: number,
    portfolio: [owned_stock]
}

let bot_account = {
    capital: 0,
    stocks: []
}

// Initializes program
function start_up() {
    console.log("  RENTZHOG     Capital")
    console.log("CHRISTOPHERS   Management")
    console.log("  WIRKKALA     Group LLC.")
    console.log("                        & Sons")

    bot_account.capital = 1000
}

//INSERT MORE CODE HERE

start_up()


console.log(getResponse("2025-01-30", "1", "minute"));