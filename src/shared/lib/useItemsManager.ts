import { useState, useCallback, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { Item, CreateItemData, createItem } from "@/entities/item";

/**
 * Custom hook for managing items state and operations
 * Provides centralized state management with localStorage persistence
 * Features optimistic updates and error handling
 */
export function useItemsManager() {
  // Initialize with sample data for demo purposes
  const initialItems: Item[] = [
    createItem({ name: "Jacket" }),
    createItem({ name: "Sneakers" }),
    createItem({ name: "Backpack" }),
  ];

  // Use localStorage for persistence
  const [items, setItems, clearItems] = useLocalStorage<Item[]>(
    "items-manager",
    initialItems
  );

  // Loading states for different operations
  const [adding, setAdding] = useState(false);
  const [removing, setRemoving] = useState<string | null>(null);

  // Add new item with optimistic updates
  const addItem = useCallback(
    async (itemData: CreateItemData) => {
      setAdding(true);

      try {
        // Simulate API call delay for better UX demonstration
        await new Promise(resolve => setTimeout(resolve, 300));

        const newItem = createItem(itemData);
        setItems(prevItems => [...prevItems, newItem]);
      } catch (error) {
        console.error("Failed to add item:", error);
        // In a real app, you'd show a toast notification here
      } finally {
        setAdding(false);
      }
    },
    [setItems]
  );

  // Remove item with optimistic updates
  const removeItem = useCallback(
    async (itemId: string) => {
      setRemoving(itemId);

      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 200));

        setItems(prevItems => prevItems.filter(item => item.id !== itemId));
      } catch (error) {
        console.error("Failed to remove item:", error);
        // In a real app, you'd show a toast notification here
      } finally {
        setRemoving(null);
      }
    },
    [setItems]
  );

  // Clear all items with confirmation
  const clearAllItems = useCallback(async () => {
    try {
      // Simulate API call delay for better UX
      await new Promise(resolve => setTimeout(resolve, 200));
      clearItems();
    } catch (error) {
      console.error("Failed to clear all items:", error);
    }
  }, [clearItems]);

  // Memoized computed values for performance
  const itemsCount = useMemo(() => items.length, [items.length]);

  const isEmpty = useMemo(() => items.length === 0, [items.length]);

  const isRemoving = useMemo(() => removing !== null, [removing]);

  return {
    // State
    items,
    adding,
    removing: isRemoving,
    removingId: removing,

    // Computed
    itemsCount,
    isEmpty,

    // Actions
    addItem,
    removeItem,
    clearAllItems,
  };
}
