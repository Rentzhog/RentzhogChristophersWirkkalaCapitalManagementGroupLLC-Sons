"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = require("./api");
var bot_account = {
    capital: 0,
    stocks: []
};
// Initializes program
function start_up() {
    console.log("  RENTZHOG     Capital");
    console.log("CHRISTOPHERS   Management");
    console.log("  WIRKKALA     Group LLC.");
    console.log("                        & Sons");
    bot_account.capital = 1000;
}
//INSERT MORE CODE HERE
start_up();
console.log((0, api_1.getResponse)("2025-01-30", "1", "minute"));
