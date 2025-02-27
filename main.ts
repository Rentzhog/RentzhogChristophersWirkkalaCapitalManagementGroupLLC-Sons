import { get_response } from "./api"
import { account, owned_stock, buy } from "./actions"

let bot_account = {
    capital: 0,
    stocks: new Map()
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


console.log(get_response("2025-01-30", 1, "minute"));