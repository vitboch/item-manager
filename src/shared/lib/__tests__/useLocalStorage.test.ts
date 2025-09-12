import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "../useLocalStorage";

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

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
  });

  it("should return initial value when localStorage is empty", () => {
    localStorageMock.getItem.mockReturnValue(null);

    const { result } = renderHook(() =>
      useLocalStorage("test-key", "initial-value")
    );

    expect(result.current[0]).toBe("initial-value");
  });

  it("should return stored value from localStorage", () => {
    localStorageMock.getItem.mockReturnValue('"stored-value"');

    const { result } = renderHook(() =>
      useLocalStorage("test-key", "initial-value")
    );

    expect(result.current[0]).toBe("stored-value");
  });

  it("should update localStorage when value changes", () => {
    localStorageMock.getItem.mockReturnValue(null);

    const { result } = renderHook(() =>
      useLocalStorage("test-key", "initial-value")
    );

    act(() => {
      result.current[1]("new-value");
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "test-key",
      '"new-value"'
    );
    expect(result.current[0]).toBe("new-value");
  });

  it("should remove from localStorage when value is null", () => {
    localStorageMock.getItem.mockReturnValue('"existing-value"');

    const { result } = renderHook(() =>
      useLocalStorage("test-key", "initial-value")
    );

    act(() => {
      result.current[1](undefined as unknown as string);
    });

    expect(localStorageMock.removeItem).toHaveBeenCalledWith("test-key");
  });

  it("should handle function updates", () => {
    localStorageMock.getItem.mockReturnValue('"initial-value"');

    const { result } = renderHook(() =>
      useLocalStorage("test-key", "initial-value")
    );

    act(() => {
      result.current[1](prev => prev + "-updated");
    });

    expect(result.current[0]).toBe("initial-value-updated");
  });

  it("should handle removeValue function", () => {
    localStorageMock.getItem.mockReturnValue('"existing-value"');

    const { result } = renderHook(() =>
      useLocalStorage("test-key", "initial-value")
    );

    act(() => {
      result.current[2]();
    });

    expect(localStorageMock.removeItem).toHaveBeenCalledWith("test-key");
    expect(result.current[0]).toEqual([]);
  });
});
