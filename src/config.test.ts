import { describe, it, expect, afterEach, vi } from "vitest";

describe("config", () => {
  const original = process.env.PORT;

  afterEach(() => {
    if (original === undefined) delete process.env.PORT;
    else process.env.PORT = original;
    vi.resetModules();
  });

  it("throws on non-numeric PORT", async () => {
    vi.resetModules();
    process.env.PORT = "not-a-number";

    await expect(import("./config.ts")).rejects.toThrow(/Invalid PORT/);
  });
});
