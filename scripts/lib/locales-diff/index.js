const path = require('path');

const { readLocale, writeLocale } = require('./read-write');
const log = require('../utils/log');

/**
 * @param {Record<string, string>[]} locales
 * @returns {string[][]} An array containing difference logs. A difference log at index i contains the keys that are present in locales other than i, but is not present in locale i``.
 */
async function diffContents(locales) {
  /** @type {Set<string>} */
  const uniqueAllKeys = new Set();
  for (const contents of locales) {
    for (const key of Object.keys(contents)) {
      uniqueAllKeys.add(key);
    }
  }
  const allKeys = Array.from(uniqueAllKeys);

  /** @type {string[][]} */
  const diffs = Array(locales.length);
  for (let i = 0; i < locales.length; i++) {
    const contents = locales[i];
    diffs[i] = allKeys.filter(
      (key) => !Object.prototype.hasOwnProperty.call(contents, key),
    );
  }

  return diffs;
}

/**
 * @param {string[]} folders All folder prefixes
 * @param {string[]} files All file names that are contained in the folder. The file names should exist in all folders.
 */
async function diffLocaleFolders(folders, files) {
  for (const fileName of files) {
    const comparedFileNames = folders.map((folderPath) =>
      path.join(folderPath, fileName),
    );
    const comparedLocales = await Promise.all(
      comparedFileNames.map(readLocale),
    );
    const diffLogs = await diffContents(comparedLocales);

    await Promise.all(
      comparedFileNames.map((filePath, index) => {
        const diffLog = diffLogs[index];
        if (diffLog.length === 0) return;
        log.write(
          'NOTICE:',
          `${filePath} doesn't have the following keys: ${diffLog}`,
        );
        return writeLocale(filePath, diffLogs[index]);
      }),
    );
  }
}

module.exports = {
  diffLocaleFolders,
  diffContents,
  readLocale,
  writeLocale,
};
