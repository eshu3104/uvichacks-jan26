import React from 'react';
import { Package, Search } from 'lucide-react';
import { Button } from '@/app/components/button';

interface EmptyDonationsProps {
  filterType: string;
}

export function EmptyDonations({ filterType }: EmptyDonationsProps) {
  const isFiltered = filterType !== 'all';

  return (
    <div className="text-center py-16 px-4">
      {/* Illustration */}
      <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-muted/30 flex items-center justify-center">
        {isFiltered ? (
          <Search className="w-16 h-16 text-muted-foreground" />
        ) : (
          <Package className="w-16 h-16 text-muted-foreground" />
        )}
      </div>

      {/* Message */}
      {isFiltered ? (
        <>
          <h2 className="text-2xl mb-3">No {filterType} donations</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            You don't have any donations with this status yet. Try selecting a different filter or create a new donation.
          </p>
        </>
      ) : (
        <>
          <h2 className="text-2xl mb-3">You haven't made any donations yet</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Start making a difference in your community by donating surplus food to local shelters.
          </p>
          <Button variant="primary" size="lg">
            Start your first donation
          </Button>
        </>
      )}

      {/* Helpful Info */}
      {!isFiltered && (
        <div className="mt-12 bg-accent/10 rounded-[14px] p-6 max-w-2xl mx-auto border border-accent/20">
          <h3 className="text-lg mb-3">How it works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div>
              <div className="text-2xl mb-2">1️⃣</div>
              <p>List your surplus food with photos and details</p>
            </div>
            <div>
              <div className="text-2xl mb-2">2️⃣</div>
              <p>Local shelters review and accept your donation</p>
            </div>
            <div>
              <div className="text-2xl mb-2">3️⃣</div>
              <p>Schedule pickup and make an impact</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
