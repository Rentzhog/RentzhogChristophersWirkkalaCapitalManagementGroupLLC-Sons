"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const tradingchart_1 = __importDefault(require("./tradingchart")); // Ensure TradingChart is correctly implemented
const main_1 = require("./main");
const App = () => {
    const [date, setDate] = (0, react_1.useState)("");
    const [ticker, setTicker] = (0, react_1.useState)("");
    const [capital, setCapital] = (0, react_1.useState)(0);
    const [timeline, setTradingTimeline] = (0, react_1.useState)([]); // State for trading timeline (stock prices)
    const [actions, setActions] = (0, react_1.useState)([]); // State for buy/sell actions
    const [formSubmitted, setFormSubmitted] = (0, react_1.useState)(false); // State to track form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!date || !ticker || !capital)
            return;
        (0, main_1.start_up)(date, ticker, capital.toString());
        // Simulate timeline and actions for demo purposes
        const timeline = [100, 102, 104, 105, 103, 107];
        const actions = [
            { time: 0, price: 100, action: "buy" },
            { time: 1, price: 105, action: "sell" },
            { time: 2, price: 107, action: "buy" },
        ];
        // Update state with trading data and actions
        setTradingTimeline(timeline);
        setActions(actions);
        setFormSubmitted(true); // Set formSubmitted to true after submission
    };
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { padding: "20px", fontFamily: "Arial, sans-serif" } }, { children: [(0, jsx_runtime_1.jsx)("h1", { children: "Trading Bot Simulator" }), (0, jsx_runtime_1.jsxs)("form", Object.assign({ onSubmit: handleSubmit, style: { marginBottom: "20px" } }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { marginBottom: "10px" } }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ style: { marginRight: "10px" } }, { children: "Simulation Date:" })), (0, jsx_runtime_1.jsx)("input", { type: "date", value: date, onChange: e => setDate(e.target.value), required: true })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { marginBottom: "10px" } }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ style: { marginRight: "10px" } }, { children: "Stock Ticker:" })), (0, jsx_runtime_1.jsx)("input", { type: "text", value: ticker, onChange: e => setTicker(e.target.value), required: true })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { marginBottom: "10px" } }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ style: { marginRight: "10px" } }, { children: "Starting Capital:" })), (0, jsx_runtime_1.jsx)("input", { type: "number", value: capital, onChange: e => setCapital(Number(e.target.value)), required: true })] })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "submit" }, { children: "Simulate" }))] })), formSubmitted && timeline.length > 0 && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Simulation Results" }), (0, jsx_runtime_1.jsx)(tradingchart_1.default, { tradingTimeline: timeline, actions: actions })] }))] })));
};
exports.default = App;
//# sourceMappingURL=app.js.map