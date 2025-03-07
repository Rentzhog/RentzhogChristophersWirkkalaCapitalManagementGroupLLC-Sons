import React, { useEffect, useRef } from "react";
import { Chart, ChartConfiguration, registerables } from "chart.js";


Chart.register(...registerables);

export type TradeAction = {
  time: number;
  price: number;
  action: string;
};

type TradingChartProps = {
  tradingTimeline: number[]; // An array of numbers representing the trading data
  actions: TradeAction[];    // The buy/sell actions
};

const TradingChart: React.FC<TradingChartProps> = ({ tradingTimeline, actions }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    console.log("ye");
    if (!chartRef.current) return;
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    // Create an array of labels (for example, just indices or time)
    const labels = tradingTimeline.map((_, index) => `Index ${index + 1}`);
    
    // Create buy and sell points based on actions
    const buyPoints = actions.filter(a => a.action === "buy");
    const sellPoints = actions.filter(a => a.action === "sell");

    const config: ChartConfiguration = {
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
            data: labels.map((_, i) =>
              buyPoints.find(a => a.time === i) ? tradingTimeline[i] : null
            ),
            borderColor: "green",
            backgroundColor: "green",
            pointRadius: 5,
            type: "scatter",
          },
          {
            label: "Sell Signals",
            data: labels.map((_, i) =>
              sellPoints.find(a => a.time === i) ? tradingTimeline[i] : null
            ),
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

    chartInstance.current = new Chart(ctx, config);
  }, [tradingTimeline, actions]);

  return <canvas ref={chartRef} />;
};

export default TradingChart;
