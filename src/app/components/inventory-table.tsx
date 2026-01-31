import React, { useState } from 'react';
import { Edit2, Trash2, MoreVertical } from 'lucide-react';
import { EditItemModal } from '@/app/components/edit-item-modal';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  categoryEmoji: string;
  quantity: string;
  expiryDate: string;
  expiryStatus: 'good' | 'soon' | 'urgent';
  source: 'donation' | 'purchased' | 'manual';
  donorName?: string;
  addedDate: string;
}

interface InventoryTableProps {
  items: InventoryItem[];
}

export function InventoryTable({ items }: InventoryTableProps) {
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const getExpiryBadge = (status: string) => {
    const styles = {
      good: 'bg-secondary/15 text-secondary border-secondary/20',
      soon: 'bg-accent/15 text-accent-foreground border-accent/20',
      urgent: 'bg-destructive/15 text-destructive border-destructive/20',
    };

    const labels = {
      good: 'Good',
      soon: 'Soon',
      urgent: 'Urgent',
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getSourceBadge = (source: string, donorName?: string) => {
    const styles = {
      donation: 'bg-primary/10 text-primary',
      purchased: 'bg-secondary/10 text-secondary',
      manual: 'bg-muted text-muted-foreground',
    };

    const labels = {
      donation: donorName ? `Donated by ${donorName}` : 'Donation',
      purchased: 'Purchased',
      manual: 'Manual Entry',
    };

    return (
      <span className={`text-sm ${styles[source as keyof typeof styles]}`}>
        {labels[source as keyof typeof labels]}
      </span>
    );
  };

  const handleDelete = (id: string) => {
    console.log('Delete item:', id);
    setActiveMenu(null);
  };

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden lg:block bg-card rounded-[14px] border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30 border-b border-border">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Item Name</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Category</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Quantity</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Expiry Date</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Source</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-medium">{item.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{item.categoryEmoji}</span>
                      <span className="text-sm capitalize">{item.category}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm">{item.quantity}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm">{item.expiryDate}</span>
                      {getExpiryBadge(item.expiryStatus)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getSourceBadge(item.source, item.donorName)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-card rounded-[14px] border border-border shadow-sm p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-medium mb-1">{item.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{item.categoryEmoji}</span>
                  <span className="capitalize">{item.category}</span>
                </div>
              </div>
              
              <div className="relative">
                <button
                  onClick={() => setActiveMenu(activeMenu === item.id ? null : item.id)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <MoreVertical className="w-5 h-5 text-muted-foreground" />
                </button>
                
                {activeMenu === item.id && (
                  <div className="absolute right-0 mt-2 w-40 bg-card border border-border rounded-lg shadow-lg py-1 z-10">
                    <button
                      onClick={() => {
                        setEditingItem(item);
                        setActiveMenu(null);
                      }}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center gap-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="w-full px-4 py-2 text-left text-sm text-destructive hover:bg-destructive/10 transition-colors flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Quantity</p>
                <p className="font-medium">{item.quantity}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Expiry</p>
                <div className="flex flex-col gap-1">
                  <p className="font-medium text-sm">{item.expiryDate}</p>
                  {getExpiryBadge(item.expiryStatus)}
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground mb-1">Source</p>
              {getSourceBadge(item.source, item.donorName)}
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <EditItemModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSave={(updatedItem) => {
            console.log('Save item:', updatedItem);
            setEditingItem(null);
          }}
        />
      )}
    </>
  );
}
