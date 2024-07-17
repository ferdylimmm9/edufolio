/**
 * Note: this script can handle JSON, JS, or TS locale files, BUT the exported locale for JS and TS should only contain strings (and comments)
 * without any additional function calls, transformations, etc.
 * This script also assumes that there's no duplicate file names with different extensions, such as test.json and test.js in the same folder.
 *
 * Test it out after a commit so you can rollback if necessary.
 */
const fs = require('fs/promises');
const path = require('path');

const { diffLocaleFolders } = require('./lib/locales-diff');
const log = require('./lib/utils/log');

/** Where are the locale folders located at */
const LOCALES_FOLDER = ['locales/en', 'locales/id'];
/** Which file names should be ignored. */
const IGNORE_LIST = ['validation.yup.ts'];

async function main() {
  // STEP 1: Get all the available filenames.
  log.quiet('LOG:', 'Gathering all available file names...');

  /** @type {Record<string, string[]>} */
  const folderFileMap = {};

  /** @type {string[]} */
  const allFiles = [];
  for (const folderPath of LOCALES_FOLDER) {
    const files = (await fs.readdir(folderPath)).filter(
      (path) => !!path.match(/\.(?:json|js|ts)$/),
    );
    folderFileMap[folderPath] = files;
    for (const file of files) {
      if (IGNORE_LIST.includes(file)) {
        log.quiet(
          'LOG:',
          `Ignoring ${path.join(
            folderPath,
            file,
          )} because it exists in the ignore list`,
        );
        continue;
      }
      if (!allFiles.includes(file)) {
        allFiles.push(file);
      }
    }
  }

  // STEP 2: If any of the folder is missing a file, create it
  log.quiet('LOG:', 'Resolving file differences between folders...');
  for (const [folderPath, files] of Object.entries(folderFileMap)) {
    const missingFiles = allFiles.filter((file) => !files.includes(file));
    if (missingFiles.length === 0) continue;
    log.write(
      'NOTICE:',
      `${folderPath} doesn't have the following files: ${missingFiles}`,
    );
    await Promise.all(
      missingFiles.map((file) => {
        if (file.endsWith('.json')) {
          return fs.writeFile(path.join(folderPath, file), '{}');
        } else if (file.endsWith('.js') || file.endsWith('.ts')) {
          return fs.writeFile(path.join(folderPath, file), 'export default {}');
        }
      }),
    );
  }

  // STEP 3: Start comparing files
  log.quiet('LOG:', 'Finding differences in locale files...');
  await diffLocaleFolders(LOCALES_FOLDER, allFiles);

  log.write(log.success('COMPLETE'));
}

main();
