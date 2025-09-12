import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useItemsManager } from "../useItemsManager";

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("useItemsManager", () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
    localStorageMock.getItem.mockReturnValue(null);
  });

  it("should initialize with sample data", () => {
    const { result } = renderHook(() => useItemsManager());

    expect(result.current.items).toHaveLength(3);
    expect(result.current.items[0].name).toBe("Jacket");
    expect(result.current.items[1].name).toBe("Sneakers");
    expect(result.current.items[2].name).toBe("Backpack");
  });

  it("should add new item", async () => {
    const { result } = renderHook(() => useItemsManager());

    await act(async () => {
      await result.current.addItem({ name: "Test Item" });
    });

    expect(result.current.items).toHaveLength(4);
    expect(result.current.items[3].name).toBe("Test Item");
  });

  it("should remove item", async () => {
    const { result } = renderHook(() => useItemsManager());
    const itemToRemove = result.current.items[0];

    await act(async () => {
      await result.current.removeItem(itemToRemove.id);
    });

    expect(result.current.items).toHaveLength(2);
    expect(
      result.current.items.find(item => item.id === itemToRemove.id)
    ).toBeUndefined();
  });

  it("should clear all items", async () => {
    const { result } = renderHook(() => useItemsManager());

    expect(result.current.items).toHaveLength(3);

    await act(async () => {
      await result.current.clearAllItems();
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.isEmpty).toBe(true);
  });

  it("should show loading state when adding", async () => {
    const { result } = renderHook(() => useItemsManager());

    expect(result.current.adding).toBe(false);

    act(() => {
      result.current.addItem({ name: "Test Item" });
    });

    expect(result.current.adding).toBe(true);

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 400));
    });

    expect(result.current.adding).toBe(false);
  });

  it("should show loading state when removing", async () => {
    const { result } = renderHook(() => useItemsManager());
    const itemToRemove = result.current.items[0];

    expect(result.current.removing).toBe(false);

    act(() => {
      result.current.removeItem(itemToRemove.id);
    });

    expect(result.current.removing).toBe(true);

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
    });

    expect(result.current.removing).toBe(false);
  });

  it("should compute items count correctly", () => {
    const { result } = renderHook(() => useItemsManager());

    expect(result.current.itemsCount).toBe(3);
  });

  it("should compute isEmpty correctly", async () => {
    const { result } = renderHook(() => useItemsManager());

    expect(result.current.isEmpty).toBe(false);

    await act(async () => {
      await result.current.clearAllItems();
    });

    expect(result.current.isEmpty).toBe(true);
  });
});
