import React, { useState } from "react";
import { Button } from "@/shared/ui";
import { ConfirmationModal } from "@/shared/ui";
import { useModal } from "@/shared/lib";
import { Item } from "@/entities/item";

export interface RemoveItemButtonProps {
  /** Item to remove */
  item: Item;
  /** Callback when item is removed */
  onRemoveItem: (itemId: string) => void;
  /** Whether removal is in progress */
  loading?: boolean;
  /** Custom class name */
  className?: string;
}

/**
 * Button component for removing items with professional modal confirmation
 * Features loading state, accessibility, and smooth animations
 * Demonstrates senior-level React patterns and UX design
 */
export const RemoveItemButton: React.FC<RemoveItemButtonProps> = ({
  item,
  onRemoveItem,
  loading = false,
  className,
}) => {
  const modal = useModal();
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle remove action with async processing
  const handleRemove = async () => {
    setIsProcessing(true);
    try {
      await onRemoveItem(item.id);
      modal.close();
    } catch (error) {
      console.error("Failed to remove item:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Button
        variant="danger"
        size="sm"
        onClick={modal.open}
        loading={loading || isProcessing}
        disabled={loading || isProcessing}
        className={className}
        icon={
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        }
      >
        {loading || isProcessing ? "Removing..." : "Remove"}
      </Button>

      <ConfirmationModal
        isOpen={modal.isOpen}
        onClose={modal.close}
        onConfirm={handleRemove}
        title="Remove Item"
        message={`Are you sure you want to remove "${item.name}"? This action cannot be undone.`}
        confirmText="Remove"
        cancelText="Cancel"
        variant="danger"
        isLoading={isProcessing}
      />
    </>
  );
};
