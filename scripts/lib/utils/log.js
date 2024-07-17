const verbose = !!process.argv.find((arg) => arg === '--verbose');
const noAnsi = !!process.argv.find((arg) => arg === '--no-ansi');

/**
 * @param {string} text
 * @returns {string}
 */
function grey(text) {
  if (noAnsi) return text;
  return `\x1b[38;2;128;128;128m${text}\x1b[0m`;
}

/**
 * @param {string} text
 * @returns {string}
 */
function bold(text) {
  if (noAnsi) return text;
  return `\x1b[1m${text}\x1b[0m`;
}

/**
 * @param {string} text
 * @returns {string}
 */
function warning(text) {
  if (noAnsi) return text;
  return `\x1b[93m${text}\x1b[0m`;
}

/**
 * @param {string} text
 * @returns {string}
 */
function success(text) {
  if (noAnsi) return text;
  return `\x1b[92m${text}\x1b[0m`;
}

/**
 * @param {string} text
 * @returns {string}
 */
function error(text) {
  if (noAnsi) return text;
  return `\x1b[91m${text}\x1b[0m`;
}

/**
 * @overload
 * @param {string} message
 */
/**
 * @overload
 * @param {string} label
 * @param {string} message
 */
function write(label, message) {
  if (label && message) {
    console.log(bold(label), message);
  } else {
    console.log(label);
  }
}

/**
 * Only outputs to the terminal if verbose is true
 * @overload
 * @param {string} message
 */
/**
 * @overload
 * @param {string} label
 * @param {string} message
 */
function quiet(label, message) {
  if (!verbose) return;
  write(grey(label), grey(message));
}

module.exports = {
  bold,
  warning,
  error,
  success,

  quiet,
  write,
};
