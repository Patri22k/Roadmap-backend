// Save articles to JSON file
const { ARTICLES_FILE } = require("../config/files");
const fse = require("fs-extra");

async function saveArticles(articles) {
    try {
        await fse.writeJson(ARTICLES_FILE, articles, { spaces: 2 });
    } catch (error) {
        console.error("Error saving articles:", error);
    }
}

module.exports = saveArticles;
