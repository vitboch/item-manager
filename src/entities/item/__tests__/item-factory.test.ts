import { describe, it, expect } from "vitest";
import { createItem, updateItem } from "../lib/item-factory";
import type { CreateItemData } from "../types";

describe("item-factory", () => {
  describe("createItem", () => {
    it("should create item with correct structure", () => {
      const itemData: CreateItemData = { name: "Test Item" };
      const item = createItem(itemData);

      expect(item).toMatchObject({
        name: "Test Item",
        id: expect.any(String),
        createdAt: expect.any(Number),
        updatedAt: expect.any(Number),
      });
    });

    it("should trim whitespace from name", () => {
      const itemData: CreateItemData = { name: "  Test Item  " };
      const item = createItem(itemData);

      expect(item.name).toBe("Test Item");
    });

    it("should generate unique IDs", () => {
      const item1 = createItem({ name: "Item 1" });
      const item2 = createItem({ name: "Item 2" });

      expect(item1.id).not.toBe(item2.id);
    });

    it("should set timestamps correctly", () => {
      const before = Date.now();
      const item = createItem({ name: "Test Item" });
      const after = Date.now();

      expect(item.createdAt).toBeGreaterThanOrEqual(before);
      expect(item.createdAt).toBeLessThanOrEqual(after);
      expect(item.updatedAt).toBe(item.createdAt);
    });
  });

  describe("updateItem", () => {
    it("should update item name", async () => {
      const originalItem = createItem({ name: "Original Name" });

      // Add small delay to ensure different timestamps
      await new Promise(resolve => setTimeout(resolve, 1));

      const updatedItem = updateItem(originalItem, { name: "Updated Name" });

      expect(updatedItem.name).toBe("Updated Name");
      expect(updatedItem.id).toBe(originalItem.id);
      expect(updatedItem.createdAt).toBe(originalItem.createdAt);
      expect(updatedItem.updatedAt).toBeGreaterThanOrEqual(
        originalItem.updatedAt
      );
    });

    it("should preserve original name when no update provided", () => {
      const originalItem = createItem({ name: "Original Name" });
      const updatedItem = updateItem(originalItem, {});

      expect(updatedItem.name).toBe("Original Name");
      expect(updatedItem.id).toBe(originalItem.id);
    });

    it("should trim whitespace from updated name", () => {
      const originalItem = createItem({ name: "Original Name" });
      const updatedItem = updateItem(originalItem, {
        name: "  Updated Name  ",
      });

      expect(updatedItem.name).toBe("Updated Name");
    });
  });
});
