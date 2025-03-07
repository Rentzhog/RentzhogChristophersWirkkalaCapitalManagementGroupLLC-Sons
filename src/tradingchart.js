"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const chart_js_1 = require("chart.js");
console.log(chart_js_1.Chart.register);
chart_js_1.Chart.register(...chart_js_1.registerables);
const TradingChart = ({ tradingTimeline, actions }) => {
    const chartRef = (0, react_1.useRef)(null);
    const chartInstance = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (!chartRef.current)
            return;
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }
        const ctx = chartRef.current.getContext("2d");
        if (!ctx)
            return;
        // Create an array of labels (for example, just indices or time)
        const labels = tradingTimeline.map((_, index) => `Index ${index + 1}`);
        // Create buy and sell points based on actions
        const buyPoints = actions.filter(a => a.action === "buy");
        const sellPoints = actions.filter(a => a.action === "sell");
        const config = {
            type: "line",
            data: {
                labels,
                datasets: [
                    {
                        label: "Stock Price",
                        data: tradingTimeline,
                        borderColor: "blue",
                        fill: false,
                    },
                    {
                        label: "Buy Signals",
                        data: labels.map((_, i) => buyPoints.find(a => a.time === i) ? tradingTimeline[i] : null),
                        borderColor: "green",
                        backgroundColor: "green",
                        pointRadius: 5,
                        type: "scatter",
                    },
                    {
                        label: "Sell Signals",
                        data: labels.map((_, i) => sellPoints.find(a => a.time === i) ? tradingTimeline[i] : null),
                        borderColor: "red",
                        backgroundColor: "red",
                        pointRadius: 5,
                        type: "scatter",
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                    },
                },
            },
        };
        chartInstance.current = new chart_js_1.Chart(ctx, config);
    }, [tradingTimeline, actions]);
    return (0, jsx_runtime_1.jsx)("canvas", { ref: chartRef });
};
exports.default = TradingChart;
//# sourceMappingURL=tradingchart.js.map