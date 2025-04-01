require("dotenv").config();
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const fse = require('fs-extra');

const app = express();
app.use(express.json());
app.use(cors());

// Secret key for JWT signing and encryption
const SECRET_KEY = process.env.SECRET_KEY || "admin";
const ARTICLES_FILE = "articles.json";

// Fake users for database
const users = [
    { id: 1, username: 'admin', password: 'admin', role: 'admin' },
    { id: 2, username: 'user', password: 'user', role: 'user' },
];

// Read articles from JSON file
// Be aware: reading an empty JSON will lead to an error
async function getArticles() {
    try {
        return await fse.readJson(ARTICLES_FILE);
    } catch (error) {
        return [];
    }
}

// Reset articles IDs
async function resetArticlesIds(filteredArticle) {
    try {
        return filteredArticle.map((article, index) => ({ ...article, id: index + 1 }));
    } catch (error) {
        console.error("Error resetting article IDs:", error);
    }
}

// Save articles to JSON file
async function saveArticles(articles) {
    try {
        await fse.writeJson(ARTICLES_FILE, articles, { spaces: 2 });
    } catch (error) {
        console.error("Error saving articles:", error);
    }
}

// Login route (returns JWT token)
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ token });
});

// Middleware to authenticate JWT token
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = decoded;
        next();
    });
};

// Middleware to authorize user roles
const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
    }
    next();
};

// Public route: everyone can read article
app.get("/articles", async (req, res) => {
    const articles = await getArticles();
    return res.json(articles);
});

// Admin only: create new article
app.put('/articles', authenticate, authorizeAdmin, async (req, res) => {
    const { title, content, author } = req.body;

    let articles = await getArticles();
    const newArticle = { id: articles.length + 1, title, content, author };
    articles.push(newArticle);

    await saveArticles(articles);
    return res.status(201).json(newArticle);
});

// Admin only: modify existing article
app.post('/articles/:id', authenticate, authorizeAdmin, async (req, res) => {
    let articles = await getArticles();
    articles = Array.from(articles);
    const articleIndex = articles.findIndex((a) => a.id === parseInt(req.params.id));

    if (articleIndex === -1) {
        return res.status(404).json({ message: "Article you want to modified doesn't exist" });

    }

    articles[articleIndex] = { ...articles[articleIndex], ...req.body };
    await saveArticles(articles);

    return res.status(200).json({ message: "Article updated" });
});

// Admin only: delete article
app.delete("/articles/:id", authenticate, authorizeAdmin, async (req, res) => {
    try {
        let articles = await getArticles();
        articles = Array.from(articles);
        const filteredArticle = articles.filter((a) => a.id !== parseInt(req.params.id));

        if (articles.length === filteredArticle.length) {
            return res.status(404).json({ message: "Article you want to delete doesn't exist" });
        }

        let updatedArticles = filteredArticle;
        if (filteredArticle.length !== 0) {
            updatedArticles = await resetArticlesIds(filteredArticle);
        }

        await saveArticles(updatedArticles);

        return res.json({ message: "Article deleted" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Protected route example
app.get('/me', authenticate, (req, res) => {
    return res.json({ message: "Hello, " + req.user.username });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
