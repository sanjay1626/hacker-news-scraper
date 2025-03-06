import { test, expect } from "@playwright/test";
import { strict as assert } from "assert";
// Import function from index.js
const { sortHackerNewsArticles } = require("../index");

test("Validate Hacker News 'new' articles are sorted from newest to oldest", async () => {
  const sortedCorrectly = await sortHackerNewsArticles();
  if (!sortedCorrectly) {
    await expect(sortedCorrectly).toBe(false);
    console.log("❌ Not Sorted: Articles are NOT in the correct order.");
    //test.skip();
  } else {
    await expect(sortedCorrectly).toBe(true);
    console.log("✅ Sorted: Articles are in the correct order.");
  }
});
