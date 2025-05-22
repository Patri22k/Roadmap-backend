// Reset articles IDs
async function resetArticlesIds(filteredArticle) {
    try {
        return filteredArticle.map((article, index) => ({ ...article, id: index + 1 }));
    } catch (error) {
        console.error("Error resetting article IDs:", error);
    }
}

module.exports = resetArticlesIds;
