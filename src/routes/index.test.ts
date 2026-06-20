import { describe, it, expect } from "vitest";
import build from "../app.ts";

describe("base routes", () => {
  it("GET /health returns ok", async () => {
    const app = build();

    const response = await app.inject({ method: "GET", url: "/health" });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ status: "ok" });
  });
});
