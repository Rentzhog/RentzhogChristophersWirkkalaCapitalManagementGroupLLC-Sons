import { render_trading_chart } from './tradingchart';
import { run } from '../main';

document.getElementById("simulationForm")?.addEventListener("submit", async function (e: Event) {
  e.preventDefault();

  const date = (document.getElementById("date") as HTMLInputElement).value;
  const ticker = (document.getElementById("ticker") as HTMLInputElement).value;
  const capital = (document.getElementById("capital") as HTMLInputElement).value;
  
  if (!date || !ticker || !capital) return;

  const result = await run(date, ticker, capital);

  document.getElementById("simulationResults")!.style.display = "block";

  if(result != null){
    render_trading_chart(result);
  }
});
