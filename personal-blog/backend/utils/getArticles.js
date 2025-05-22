const { ARTICLES_FILE } = require("../config/files");
const fse = require('fs-extra');

// Read articles from JSON file
// Be aware: reading an empty JSON will lead to an error
async function getArticles() {
    try {
        return await fse.readJson(ARTICLES_FILE);
    } catch (error) {
        return [];
    }
}

module.exports = getArticles;
