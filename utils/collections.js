const { execSync } = require('child_process');

const lastModifiedCache = new Map();

const getLastModifiedDate = (filePath) => {
  if (lastModifiedCache.has(filePath)) {
    return lastModifiedCache.get(filePath);
  }

  try {
    const result = execSync(`git log -1 --format=%cI -- "${filePath}"`, {
      encoding: 'utf8'
    }).trim();

    const parsedDate = result ? new Date(result) : undefined;

    if (parsedDate && !Number.isNaN(parsedDate.valueOf())) {
      lastModifiedCache.set(filePath, parsedDate);
      return parsedDate;
    }
  } catch (error) {
    // ignore and fall through to the fallback
  }

  const fallback = undefined;
  lastModifiedCache.set(filePath, fallback);
  return fallback;
};

const getSortDate = (item) => {
  return getLastModifiedDate(item.inputPath) || item.date || new Date(0);
};

module.exports = {
  employmentByLastEdited(collectionApi) {
    return collectionApi.getFilteredByTag("employment").sort((a, b) => {
      return getSortDate(b) - getSortDate(a);
    });
  }
}
