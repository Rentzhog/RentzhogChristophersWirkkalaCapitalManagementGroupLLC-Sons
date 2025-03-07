import { renderTradingChart } from './tradingchart';
import { run } from './main';

  // Handle form submission
  document.getElementById("simulationForm")?.addEventListener("submit", async function (e: Event) {
    e.preventDefault();

    const date = (document.getElementById("date") as HTMLInputElement).value;
    const ticker = (document.getElementById("ticker") as HTMLInputElement).value;
    const capital = (document.getElementById("capital") as HTMLInputElement).value;
    
    if (!date || !ticker || !capital) return;

    // run the trading bot
    const result = await run(date, ticker, capital);

    // Show results
    document.getElementById("simulationResults")!.style.display = "block";

    if(result != null){
      // Call the chart rendering function
      renderTradingChart(result);
    }
  });
