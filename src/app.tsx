import React, { useState } from "react";
import TradingChart, { TradeAction } from "./tradingchart"; // Ensure TradingChart is correctly implemented
import { start_up } from "./main";

const App: React.FC = () => {
  const [date, setDate] = useState("");
  const [ticker, setTicker] = useState("");
  const [capital, setCapital] = useState<number>(0);
  const [timeline, setTradingTimeline] = useState<number[]>([]); // State for trading timeline (stock prices)
  const [actions, setActions] = useState<TradeAction[]>([]); // State for buy/sell actions
  const [formSubmitted, setFormSubmitted] = useState(false); // State to track form submission

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !ticker || !capital) return;

    start_up(date, ticker, capital.toString());

    // Simulate timeline and actions for demo purposes
    const timeline = [100, 102, 104, 105, 103, 107];
    const actions: TradeAction[] = [
      { time: 0, price: 100, action: "buy" },
      { time: 1, price: 105, action: "sell" },
      { time: 2, price: 107, action: "buy" },
    ];

    // Update state with trading data and actions
    setTradingTimeline(timeline);
    setActions(actions);
    setFormSubmitted(true); // Set formSubmitted to true after submission
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Trading Bot Simulator</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ marginRight: "10px" }}>Simulation Date:</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ marginRight: "10px" }}>Stock Ticker:</label>
          <input type="text" value={ticker} onChange={e => setTicker(e.target.value)} required />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ marginRight: "10px" }}>Starting Capital:</label>
          <input type="number" value={capital} onChange={e => setCapital(Number(e.target.value))} required />
        </div>
        <button type="submit">Simulate</button>
      </form>

      {/* Render TradingChart only if the form has been submitted */}
      {formSubmitted && timeline.length > 0 && (
        <div>
          <h2>Simulation Results</h2>
          <TradingChart tradingTimeline={timeline} actions={actions} />
        </div>
      )}
    </div>
  );
};

export default App;
