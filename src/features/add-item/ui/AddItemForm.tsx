import React, { useState, useCallback } from "react";
import { Button, Input, Card } from "@/shared/ui";
import { CreateItemData } from "@/entities/item";

export interface AddItemFormProps {
  onAddItem: (item: CreateItemData) => void;
  loading?: boolean;
  className?: string;
}

// Form component for adding new items
export const AddItemForm: React.FC<AddItemFormProps> = ({
  onAddItem,
  loading = false,
  className,
}) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const trimmedName = name.trim();

      if (!trimmedName) {
        setError("Item name is required");
        return;
      }

      if (trimmedName.length < 2) {
        setError("Item name must be at least 2 characters");
        return;
      }

      if (trimmedName.length > 50) {
        setError("Item name must be less than 50 characters");
        return;
      }

      setError("");
      onAddItem({ name: trimmedName });
      setName("");
    },
    [name, onAddItem]
  );

  // Handle input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setName(value);

      // Clear error when typing
      if (error) {
        setError("");
      }
    },
    [error]
  );

  // Handle Enter key
  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        handleSubmit(e);
      }
    },
    [handleSubmit]
  );

  return (
    <Card className={className} variant="elevated">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Add New Item
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Enter the name of the item you want to add to your list.
          </p>
        </div>

        <Input
          label="Item Name"
          placeholder="e.g., Jacket, Sneakers, Backpack"
          value={name}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          error={error}
          helperText="Press Enter to add item quickly"
          disabled={loading}
          autoFocus
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            loading={loading}
            disabled={!name.trim() || loading}
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
            }
          >
            Add Item
          </Button>
        </div>
      </form>
    </Card>
  );
};
