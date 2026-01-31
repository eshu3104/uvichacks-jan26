import React from 'react';

interface ActivityItem {
  id: string;
  text: string;
  time: string;
  type?: 'donation' | 'recipe' | 'pickup' | 'inventory';
}

interface ActivityFeedProps {
  activities: ActivityItem[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const getIconColor = (type?: string) => {
    switch (type) {
      case 'donation':
        return 'bg-primary/10 border-primary/20';
      case 'recipe':
        return 'bg-accent/10 border-accent/20';
      case 'pickup':
        return 'bg-secondary/10 border-secondary/20';
      default:
        return 'bg-muted border-border';
    }
  };

  return (
    <div className="bg-card rounded-[14px] p-6 shadow-sm border border-border/50">
      <h3 className="text-lg mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-3">
            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 border ${getIconColor(activity.type)}`}></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground leading-relaxed">{activity.text}</p>
              <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
