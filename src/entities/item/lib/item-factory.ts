import { Item, CreateItemData } from "../types";

/**
 * Factory function to create a new item with auto-generated fields
 * @param data - Item creation data
 * @returns New item with generated ID and timestamps
 */
export const createItem = (data: CreateItemData): Item => {
  const now = Date.now();

  return {
    id: generateId(),
    name: data.name.trim(),
    createdAt: now,
    updatedAt: now,
  };
};

/**
 * Updates an existing item with new data
 * @param item - Existing item to update
 * @param data - Update data
 * @returns Updated item with new timestamp
 */
export const updateItem = (item: Item, data: Partial<CreateItemData>): Item => {
  return {
    ...item,
    name: data.name?.trim() ?? item.name,
    updatedAt: Date.now(),
  };
};

/**
 * Generates a unique ID for items
 * Uses timestamp + random string for uniqueness
 */
const generateId = (): string => {
  return `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
