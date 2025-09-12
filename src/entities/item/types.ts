/**
 * Core Item entity type definition
 * Represents a single item in the item manager
 */
export interface Item {
  /** Unique identifier for the item */
  id: string;
  /** Display name of the item */
  name: string;
  /** Creation timestamp */
  createdAt: number;
  /** Last modification timestamp */
  updatedAt: number;
}

/**
 * Item creation data (without auto-generated fields)
 */
export interface CreateItemData {
  name: string;
}

/**
 * Item update data (partial update)
 */
export interface UpdateItemData {
  name?: string;
}
