"use client";

import { useState } from "react";

interface GoalsProps {
  goal: string;
  setGoal: (g: string) => void;
}

export function Goals({ goal, setGoal }: GoalsProps) {
  const [targetAmount, setTargetAmount] = useState("");
  const [timeline, setTimeline] = useState("12 months");
  const [roadmap, setRoadmap] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateRoadmap = () => {
    setIsGenerating(true);
    // Simulation calling Gemini AI for a goal-based roadmap
    setTimeout(() => {
      setRoadmap(`To reach your $${targetAmount} goal for '${goal}' in ${timeline}:

1. Increase stablecoin allocation to 40% to reduce volatility.
2. Utilize Aave V3 for USDC supply (current APY 4.8%).
3. Implement a monthly DCA of $200 into ETH.
4. Set daily alerts for -5% price drops for strategic entries.`);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="sentiment-card goals-card">
      <h3 className="card-title">Goal-Based Investing</h3>
      <div className="simulator-controls">
        <div className="goal-input-group">
            <label className="explanation-label">Investment Goal</label>
            <input 
                type="text" 
                className="chat-input"
                placeholder="e.g., Buy a house, Retire early"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
            />
        </div>
        <div className="goal-input-grid">
            <div className="goal-input-group">
                <label className="explanation-label">Target Amount ($)</label>
                <input 
                    type="number" 
                    className="chat-input"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                />
            </div>
            <div className="goal-input-group">
                <label className="explanation-label">Timeline</label>
                <select 
                    className="chat-input"
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                >
                    <option>6 months</option>
                    <option>12 months</option>
                    <option>2 years</option>
                    <option>5 years</option>
                </select>
            </div>
        </div>
        <button 
            className={`btn-analyze ${isGenerating ? 'btn-loading' : ''}`}
            onClick={generateRoadmap}
            disabled={!goal || !targetAmount || isGenerating}
            style={{ marginTop: '16px' }}
        >
            {isGenerating ? 'Generating Roadmap...' : 'Generate Roadmap'}
        </button>
      </div>

      {roadmap && (
        <div className="simulator-result roadmap-result">
            <span className="explanation-label">AI Roadmap Strategy</span>
            <div className="reasoning-text" style={{ whiteSpace: 'pre-wrap', marginTop: '10px' }}>
                {roadmap}
            </div>
        </div>
      )}
    </div>
  );
}
