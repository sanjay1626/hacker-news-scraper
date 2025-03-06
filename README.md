# Web Scraper with Playwright  

## Description  
This project is a web scraper built using **Playwright** and **Node.js**. It extracts the **latest 100 articles** from an online news website and verifies whether they are sorted from newest to oldest.  

## Features  
- Scrapes **100 latest articles** (titles & timestamps).  
- Handles pagination automatically by clicking "More".  
- Converts timestamps (e.g., "2 hours ago") into comparable values.  
- Validates if the articles are sorted correctly.  

## Installation  
1. Clone the repository:  
   ```sh
   git clone https://github.com/sanjay1626/hacker-news-scraper.git
   cd hacker-news-scraper
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the scraper:
   ```sh
   node index.js
   ```
4. Run the Playwright test:
   ```sh
   npx playwright test
   ```
## Project Structure
📦 hacker-news-scraper  
 ┣ 📂 tests  
 ┃ ┗ 📜 hackerNews.spec.ts    # Playwright test file  
 ┣ 📂 utils  
 ┃ ┗ 📜 timeUtils.js          # Converts timestamps into comparable format  
 ┣ 📜 index.js                # Main Playwright script  
 ┣ 📜 package.json            # Node.js dependencies  
 ┣ 📜 README.md               # Project documentation  

## Technologies Used
Playwright – Web automation framework
Node.js – JavaScript runtime environment
JavaScript (ES6) – Core scripting language

## License
This project is licensed under the MIT License.
```vbnet
✅ **This is clean, simple, and to the point!** 🚀 Let me know if you need any changes! 😊
```
## Copyright
DevMonk LLC
