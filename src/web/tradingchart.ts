import { Chart, ChartConfiguration, registerables } from "chart.js";
import { trading_result } from "../types";
import zoomPlugin from "chartjs-plugin-zoom";

Chart.register(...registerables, zoomPlugin);

let chart_instance: Chart | null = null; 

/**
 * Renders a trading chart using Chart.js to visualize account value, stock price,
 * and buy/sell signals over time.
 * @param results The trading result data, including stock timeline, account value 
 *                over time, and trade actions (buy/sell).
 */
export function render_trading_chart(results: trading_result): void {
  const ctx: HTMLCanvasElement = document.getElementById("tradingChart") as HTMLCanvasElement;

  if (!ctx) {
    console.error("Canvas element not found");
    return;
  }

  const context: CanvasRenderingContext2D = ctx.getContext("2d") as CanvasRenderingContext2D;
  if (!context) {
    console.error("Failed to get canvas context");
    return;
  }

  if (chart_instance) {
    chart_instance.destroy();
  }


  const format_date = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const timestamps = results.stock_timeline.map((snapshot) => snapshot.time);
  const labels = timestamps.map(timestamp => format_date(timestamp));

  const buy_points = results.trade_actions.filter((a) => a.action === "buy");
  const sell_points = results.trade_actions.filter((a) => a.action === "sell");

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
            const isBuyPoint = buy_points.find((a) => a.time === time_label);
            
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
          type: 'scatter',
          hidden: true
        },
        {
          label: "Sell Signals",
          data: timestamps.map((time_label) => {
            const isSellPoint = sell_points.find((a) => a.time === time_label);
            
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
          type: 'scatter',
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
            enabled: true,
            mode: 'xy'   
          },
          zoom: {
            wheel: {
              enabled: true 
            },
            pinch: {
              enabled: true 
            },
            mode: 'xy'
          }
        }
      },
    },
  };

  chart_instance = new Chart(context, config);

  let reset_button = document.getElementById("resetZoomBtn");

  if(!reset_button){
    reset_button = document.createElement("button");
    reset_button.id = "resetZoomBtn";
    reset_button.textContent = "Reset Zoom";
    reset_button.style.margin = "10px";
    reset_button.style.padding = "5px 10px";
    reset_button.style.fontSize = "14px";
    reset_button.style.cursor = "pointer";
    reset_button.style.display = "block";
    
    document.body.appendChild(reset_button);

    reset_button.onclick = () => {
      chart_instance?.resetZoom();
    };
  }
}
