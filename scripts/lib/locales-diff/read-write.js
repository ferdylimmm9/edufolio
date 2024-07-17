const fs = require('fs/promises');

/**
 * Regex to extract the exported data from a JS/TS file. I could've used require, but that wouldn't work for TS files, and I need the comments.
 */
const JS_EXPORT_CONTENTS_REGEX =
  /(?:export default |module.exports\s*=)\s*[{](.*)[}]/s;

// Macbrame uses certain keys as comment tags, we don't need to diff those
const JSON_COMMENT_REGEX = /__COMMENT#[0-9]+/;
// Should comments be included in the JSON
const jsonIncludeComments = process.argv.includes('--json-include-comments');

// Number of spaces used for indentation
const INDENT_SPACE_COUNT = 2;

/**
 * @param {string} path
 * @returns {Record<string, string>}
 */
async function readLocale(path) {
  const contents = await fs.readFile(path, { encoding: 'utf-8' });
  const isJavaScript = path.endsWith('.js') || path.endsWith('.ts');
  if (isJavaScript) {
    const match = contents.match(JS_EXPORT_CONTENTS_REGEX);
    if (!match) {
      throw new Error(`Cannot extract locale from ${path} as JS/TS file`);
    }

    /* ...this should be safe as long as you don't put weird stuff in the locale file. 
    Parentheses is required in order to let eval return an object rather than treat the object parentheses as a scope */

    // eslint-disable-next-line no-eval
    return eval(`({${match[1]}})`);
  } /* treat this as JSON */ else {
    let locale;
    try {
      locale = JSON.parse(contents);
    } catch (e) {
      throw new Error(
        `Cannot extract locale from ${path} as JSON file due to ${e}`,
      );
    }
    if (!jsonIncludeComments) {
      for (const key of Object.keys(locale)) {
        // Ignore comment keys
        if (key.match(JSON_COMMENT_REGEX)) {
          delete locale[key];
        }
      }
    }
    return locale;
  }
}

/**
 * @param {string} path
 * @param {string[][]} diffLog All keys that are missing from this locale
 */
async function writeLocale(path, diffLog) {
  let fileContents = '';
  const originalContents = await fs.readFile(path, { encoding: 'utf-8' });
  if (path.endsWith('.js') || path.endsWith('.ts')) {
    const SPACE = ' '.repeat(INDENT_SPACE_COUNT);
    const additionalJavaScriptCode = diffLog
      .map((key) => `${SPACE}'${key}': 'TODO',\n`)
      .join('');

    fileContents = originalContents.replace(
      JS_EXPORT_CONTENTS_REGEX,
      (value) => {
        let closingCurlyBraceIndex = value.length;
        for (let i = value.length - 1; i >= 0; i--) {
          if (value[i] === '}') {
            closingCurlyBraceIndex = i;
            break;
          }
        }
        const hasNewlineBeforeCurlyBrace =
          value[closingCurlyBraceIndex - 1] === '\n';
        value = value.slice(0, closingCurlyBraceIndex);
        if (!hasNewlineBeforeCurlyBrace) {
          value += '\n';
        }
        return `${value}${additionalJavaScriptCode}}`;
      },
    );
  } /* treat this as JSON */ else {
    const parsedOriginalContents = JSON.parse(originalContents);
    for (const key of diffLog) {
      parsedOriginalContents[key] = 'TODO';
    }
    fileContents = JSON.stringify(
      parsedOriginalContents,
      null,
      INDENT_SPACE_COUNT,
    );
  }
  await fs.writeFile(path, fileContents, { encoding: 'utf-8' });
}

module.exports = {
  readLocale,
  writeLocale,
};
