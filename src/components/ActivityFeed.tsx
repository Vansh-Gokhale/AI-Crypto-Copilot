"use client";

import { useTransactions } from "@/hooks/useTransactions";

export function ActivityFeed() {
  const { activities } = useTransactions();

  return (
    <div className="activity-feed-card">
      <div className="card-header-flex">
        <h3 className="card-title">Activity Feed</h3>
      </div>
      <div className="activity-list">
        {activities.length === 0 ? (
          <div className="empty-feed">No recent activity detected</div>
        ) : (
          activities.map((act) => (
            <div key={act.id} className="activity-item">
              <div className="activity-icon-col">
                <div className={`activity-pill ${act.type.toLowerCase()}`}></div>
              </div>
              <div className="activity-info-col">
                <div className="activity-main">
                    <span className="activity-type">{act.type} {act.asset}</span>
                    <span className="activity-value">${act.usdValue}</span>
                </div>
                <div className="activity-meta">
                    <span className="activity-amount">{act.amount} {act.asset}</span>
                    <span className="activity-dot">•</span>
                    <span className="activity-time">{act.time}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
