import "@testing-library/jest-dom";
import { beforeEach, vi } from "vitest";

// Mock fetch globally
global.fetch = vi.fn();

vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual("@tanstack/react-query");
  return {
    ...actual,
    // You can mock specific methods if needed
  };
});
// Mock zustand stores - this allows you to reset stores between tests
const storeResetFns = new Set<() => void>();

export const registerStoreReset = (resetFn: () => void) => {
  storeResetFns.add(resetFn);
};

export const resetAllStores = () => {
  storeResetFns.forEach((resetFn) => resetFn());
};

const mockNavigate = vi.fn();

beforeEach(() => {
  // Reset mocks before each test
  vi.clearAllMocks();
  resetAllStores();

  // Reset fetch mock
  (global.fetch as any).mockClear();

  // Reset navigate mock
  mockNavigate.mockClear();
});
