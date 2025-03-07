import { Chart, ChartConfiguration, registerables } from "chart.js";
import { trading_result } from "./types";
import zoomPlugin from "chartjs-plugin-zoom";

// Register necessary chart.js components
Chart.register(...registerables, zoomPlugin);

let chartInstance: Chart | null = null; // Store chart instance globally

/**
 * Renders a trading chart using Chart.js to visualize account value, stock price,
 * and buy/sell signals over time.
 * @param results The trading result data, including stock timeline, account value 
 *                over time, and trade actions (buy/sell).
 */
export function renderTradingChart(results: trading_result): void {
  const ctx = document.getElementById("tradingChart") as HTMLCanvasElement;

  if (!ctx) {
    console.error("Canvas element not found");
    return;
  }

  const context = ctx.getContext("2d");
  if (!context) {
    console.error("Failed to get canvas context");
    return;
  }

  if (chartInstance) {
    chartInstance.destroy();
  }


  // Format timestamps to readable strings
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const timestamps = results.stock_timeline.map((snapshot) => snapshot.time);
  const labels = timestamps.map(timestamp => formatDate(timestamp));

  const buyPoints = results.trade_actions.filter((a) => a.action === "buy");
  const sellPoints = results.trade_actions.filter((a) => a.action === "sell");

  const config: ChartConfiguration<'line' | 'scatter'> = {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: "Account Value",
          data: results.account_timeline.map(snapshot => snapshot.value),
          borderColor: "blue",
          fill: false,
        },
        {
          label: "Buy Signals",
          data: timestamps.map((time_label) => {
            const isBuyPoint = buyPoints.find((a) => a.time === time_label);
            
            if (isBuyPoint) {
              const snapshot = results.trade_actions.find((action) => action.time === time_label);
              const stock_snapshot = results.stock_timeline.find(snapshot => snapshot.time === time_label);
              return snapshot 
                      ? stock_snapshot
                        ? stock_snapshot.aggregate.close 
                        : null 
                      : null;
            }
            return null;
          }),
          borderColor: "green",
          backgroundColor: "green",
          pointRadius: 5,
          type: 'scatter', // Scatter chart for buy signals
          hidden: true
        },
        {
          label: "Sell Signals",
          data: timestamps.map((time_label) => {
            const isSellPoint = sellPoints.find((a) => a.time === time_label);
            
            if (isSellPoint) {
              const snapshot = results.trade_actions.find((action) => action.time === time_label);
              const stock_snapshot = results.stock_timeline.find(snapshot => snapshot.time === time_label);
              return snapshot 
                      ? stock_snapshot
                        ? stock_snapshot.aggregate.close 
                        : null 
                      : null;
            }
            return null;
          }),
          borderColor: "red",
          backgroundColor: "red",
          pointRadius: 5,
          type: 'scatter', // Scatter chart for sell signals
          hidden: true
        },
        {
          label: "Stock Price",
          data: timestamps.map((time_label) => {
            const stockSnapshot = results.stock_timeline.find(snapshot => snapshot.time === time_label);
            return stockSnapshot ? stockSnapshot.aggregate.close : null;
          }),
          borderColor: "black",
          backgroundColor: "black",
          pointRadius: 5,
          type: 'line',
          hidden: true
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
        },
        zoom: {
          pan: {
            enabled: true, // Enable panning
            mode: 'xy'     // Allow both horizontal and vertical panning
          },
          zoom: {
            wheel: {
              enabled: true // Enable zooming with mouse wheel
            },
            pinch: {
              enabled: true // Enable zooming with pinch gestures
            },
            mode: 'xy' // Zoom in both X and Y directions
          }
        }
      },
    },
  };

  chartInstance = new Chart(context, config);

  let resetButton = document.getElementById("resetZoomBtn");

  if(!resetButton){
    resetButton = document.createElement("button");
    resetButton.id = "resetZoomBtn";
    resetButton.textContent = "Reset Zoom";
    resetButton.style.margin = "10px";
    resetButton.style.padding = "5px 10px";
    resetButton.style.fontSize = "14px";
    resetButton.style.cursor = "pointer";
    resetButton.style.display = "block";
    
    document.body.appendChild(resetButton);

    resetButton.onclick = () => {
      chartInstance?.resetZoom();
    };
  }
}
