function parseHackerNewsTime(timeString) {
  if (!timeString) {
    console.log("❌ ERROR: Empty timestamp received!");
    return null;
  }

  const now = Date.now();
  const match = timeString.match(/(\d+)\s*(second|minute|hour|day)s?\s*ago/);
  
  if (!match) {
    console.log(`❌ ERROR: Failed to parse timestamp: "${timeString}"`);
    return null;
  }

  const value = parseInt(match[1]);
  let parsedTime;

  switch (match[2]) {
    case "second":
      parsedTime = now - value * 1000;
      break;
    case "minute":
      parsedTime = now - value * 60 * 1000;
      break;
    case "hour":
      parsedTime = now - value * 60 * 60 * 1000;
      break;
    case "day":
      parsedTime = now - value * 24 * 60 * 60 * 1000;
      break;
    default:
      console.log(`❌ ERROR: Unknown time unit: "${match[2]}"`);
      return null;
  }

  //console.log(`✅ Converted: "${timeString}" → ${parsedTime}`);
  return parsedTime;
}

module.exports = { parseHackerNewsTime };
