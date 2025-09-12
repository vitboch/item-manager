import React, { useCallback } from "react";
import { Card } from "@/shared/ui";
import { Item } from "@/entities/item";
import { RemoveItemButton } from "@/features/remove-item";

export interface ItemsListProps {
  /** Array of items to display */
  items: Item[];
  /** Callback when item is removed */
  onRemoveItem: (itemId: string) => void;
  /** Whether any removal is in progress */
  removing?: boolean;
  /** Custom class name */
  className?: string;
}

/**
 * List component for displaying items with remove functionality
 * Features empty state, animations, and performance optimizations
 * Optimized with React.memo and useCallback for performance
 */
export const ItemsList = React.memo<ItemsListProps>(
  ({ items, onRemoveItem, removing = false, className }) => {
    // Handle item removal with callback optimization
    const handleRemoveItem = useCallback(
      (itemId: string) => {
        onRemoveItem(itemId);
      },
      [onRemoveItem]
    );

    // Format creation date for display
    const formatDate = useCallback((timestamp: number) => {
      return new Date(timestamp).toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }, []);

    // Empty state component
    if (items.length === 0) {
      return (
        <Card className={`text-center py-12 ${className}`} variant="outlined">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No items yet
              </h3>
              <p className="text-gray-500">
                Add your first item using the form above
              </p>
            </div>
          </div>
        </Card>
      );
    }

    return (
      <div className={`space-y-3 ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Your Items ({items.length})
          </h2>
          {removing && (
            <div className="flex items-center text-sm text-gray-500">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Removing...
            </div>
          )}
        </div>

        <div className="space-y-2">
          {items.map((item, index) => (
            <Card
              key={item.id}
              className="animate-slide-in hover:shadow-md transition-all duration-200"
              style={{ animationDelay: `${index * 50}ms` }}
              variant="default"
              interactive
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-medium text-gray-900 truncate">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Added {formatDate(item.createdAt)}
                  </p>
                </div>

                <div className="ml-4 flex-shrink-0">
                  <RemoveItemButton
                    item={item}
                    onRemoveItem={handleRemoveItem}
                    loading={removing}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }
);

ItemsList.displayName = "ItemsList";
