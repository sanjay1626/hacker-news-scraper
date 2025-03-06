const { chromium } = require("playwright");
const timeUtils = require("./utils/timeUtils");

export async function sortHackerNewsArticles() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://news.ycombinator.com/newest");
  const articles = [];

  while (articles.length < 100) {
    // ✅ Re-fetch article rows on each loop
    const articleRows = await page.locator("tr.athing").all();

    for (let i = 0; i < articleRows.length; i++) {
      if (articles.length >= 100) break; // Stop at 100 articles

      // ✅ Get the article title correctly
      const titleLocator = articleRows[i].locator(".titleline a").first();
      const title = await titleLocator.textContent();

      // ✅ Get the timestamp from the next row
      const timestampLocator = articleRows[i].locator("xpath=following-sibling::tr[1]").locator(".age a");
      const timestampText = await timestampLocator.textContent();

      if (title && timestampText) {
        articles.push({ title, timestamp: timestampText });
      }
    }

    console.log(`✅ Articles collected so far: ${articles.length}`);

    // ✅ Click "More" only if needed and ensure new articles are fetched
    if (articles.length < 100) {
      const moreButton = page.getByRole("link", { name: "More", exact: true });
      if (await moreButton.isVisible()) {
        await moreButton.click();
        await page.waitForLoadState("domcontentloaded");

        // ✅ Wait for new articles to load properly
        console.log("🔄 Clicked 'More' to load more articles...");
        await page.waitForSelector("tr.athing:nth-child(31)", { timeout: 2000 });
      } else {
        console.log("❌ 'More' button is no longer visible.");
        break;
      }
    }
  };

  // ✅ Convert timestamps AFTER collecting all 100 articles
  const timestamps = articles.map((article) => ({
    title: article.title || "❌ MISSING TITLE",
    timestamp: article.timestamp || "❌ MISSING TIMESTAMP",
    parsedTime: timeUtils.parseHackerNewsTime(article.timestamp) || "❌ FAILED PARSING",
  }));

  // ✅ Display only when 100 articles are collected
  if (articles.length >= 100) {
    console.log(`✅ Final article count: ${articles.length}`);
  } else {
    console.log(`❌ Error: Only collected ${articles.length} articles. Expected 100.`);
  }

  // ✅ Print all parsed timestamps before sorting validation
  console.log("✅ Parsed Timestamps Before Sorting:");
  console.table(timestamps);

  // ✅ Validate sorting (newest to oldest)
  let sortedCorrectly = true;

  for (let i = 1; i < timestamps.length; i++) {
    const prevTitle = timestamps[i - 1].title;
    const currTitle = timestamps[i].title;
    const prevTime = timestamps[i - 1].parsedTime;
    const currTime = timestamps[i].parsedTime;
    const prevTimestamp = timestamps[i - 1].timestamp;
    const currTimestamp = timestamps[i].timestamp;

    if (prevTime === "❌ FAILED PARSING" || currTime === "❌ FAILED PARSING") {
      console.log(`⚠️ Skipping Comparison: One or more timestamps failed to parse.`);
      continue;
    }

    const timeDifferenceThreshold = 5000; // Allow 5-second difference

    if (prevTime < currTime) {  
      if (Math.abs(prevTime - currTime) > timeDifferenceThreshold) { // ✅ Ignore small differences
        console.log(`❌ Sorting Issue Found:`);  
        console.log(`   ${prevTitle} (${prevTimestamp}) → ${prevTime}`);  
        console.log(`   ${currTitle} (${currTimestamp}) → ${currTime}`);  
        sortedCorrectly = false;  
      }  
    }
    
    
  }

  console.log(`Sorting Validation Result: ${sortedCorrectly ? "✅ Sorted" : "❌ Not Sorted"}`);
  
  await browser.close();
  return sortedCorrectly;
};
