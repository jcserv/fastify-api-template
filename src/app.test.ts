import { describe, it, expect } from "vitest";
import build from "./app.ts";

describe("app", () => {
  it("responds on GET /", async () => {
    const app = build();

    const response = await app.inject({
      method: "GET",
      url: "/",
    });

    expect(response.statusCode).toBe(200);
  });
});
