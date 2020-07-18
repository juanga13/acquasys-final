const es = require('./es.json');

/**
 * @note changed to this structure so we can use
 * i18n-ally vscode extension for better transla-
 * tions managing.
 * 
 * @structure (i18n):
 * -----------------
 * src/i18n/
 *   -> es.json
 *   -> en.json
 *   -> ...
 *   -> lang-codename.json
 *   -> index.js
 * -----------------
 * 
 * Index is imported by app index (src/index.js)
 * where all translations are loaded.
 * 
 * @code: the language codename, used by the 
 * app in front and back.
 * @description: string unique value, should be
 * showed directly without translating.
 * 
 */

const languagesCodes = [
    'es', 
];

const translations = {
    es,
};

export { languagesCodes, translations };
