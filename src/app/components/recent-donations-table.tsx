import React from 'react';
import { Check, Clock, Circle } from 'lucide-react';

interface Donation {
  id: string;
  item: string;
  shelter: string;
  status: 'accepted' | 'pending' | 'no-response';
  date: string;
}

interface RecentDonationsTableProps {
  donations: Donation[];
}

export function RecentDonationsTable({ donations }: RecentDonationsTableProps) {
  const getStatusDisplay = (status: Donation['status']) => {
    switch (status) {
      case 'accepted':
        return (
          <span className="inline-flex items-center gap-1.5 text-secondary">
            <Check className="w-4 h-4" />
            <span className="text-sm font-medium">Accepted</span>
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 text-accent-foreground">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">Pending</span>
          </span>
        );
      case 'no-response':
        return (
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <Circle className="w-4 h-4" />
            <span className="text-sm font-medium">No Response</span>
          </span>
        );
    }
  };

  return (
    <div className="bg-card rounded-[14px] shadow-sm border border-border/50 overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg">Recent Donations</h3>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Item</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Shelter</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {donations.map((donation) => (
              <tr key={donation.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-6 py-4 text-sm">{donation.item}</td>
                <td className="px-6 py-4 text-sm">{donation.shelter}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{donation.date}</td>
                <td className="px-6 py-4">{getStatusDisplay(donation.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-border">
        {donations.map((donation) => (
          <div key={donation.id} className="p-4 hover:bg-muted/20 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-medium">{donation.item}</p>
                <p className="text-sm text-muted-foreground">{donation.shelter}</p>
              </div>
              {getStatusDisplay(donation.status)}
            </div>
            <p className="text-xs text-muted-foreground">{donation.date}</p>
          </div>
        ))}
      </div>

      <div className="p-4 bg-muted/10 border-t border-border">
        <a href="#all-donations" className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
          View all donations →
        </a>
      </div>
    </div>
  );
}
