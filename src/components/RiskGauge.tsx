"use client";

interface RiskGaugeProps {
  score: number; // 0–100
  level: "Low" | "Medium" | "High";
}

export function RiskGauge({ score, level }: RiskGaugeProps) {
  const radius = 60;
  const circumference = Math.PI * radius; // semi-circle
  const offset = circumference - (score / 100) * circumference;

  const levelColor =
    level === "Low" ? "#10B981" : level === "Medium" ? "#F59E0B" : "#EF4444";

  return (
    <div className="risk-gauge-card">
      <h3 className="card-title">Risk Score</h3>
      <div className="risk-gauge-container">
        <svg viewBox="0 0 140 80" className="risk-gauge-svg">
          {/* Background arc */}
          <path
            d="M 10 75 A 60 60 0 0 1 130 75"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* Gradient defs */}
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
          </defs>
          {/* Value arc */}
          <path
            d="M 10 75 A 60 60 0 0 1 130 75"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="gauge-fill"
          />
          {/* Score text */}
          <text x="70" y="55" textAnchor="middle" className="gauge-score-text" fill="white" fontSize="22" fontWeight="bold">
            {score}
          </text>
          <text x="70" y="72" textAnchor="middle" fill={levelColor} fontSize="11" fontWeight="600">
            {level} Risk
          </text>
        </svg>
      </div>
      <div className="risk-labels">
        <span className="risk-label-low">Low</span>
        <span className="risk-label-high">High</span>
      </div>
    </div>
  );
}
