// Import required modules
require("dotenv").config();
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// Import custom modules
const secretsConfig = require('./config/secrets');
const dbConfig = require('./config/db');

const {SECRET_KEY} = secretsConfig;
const {users} = dbConfig;
const getArticles = require('./utils/getArticles');
const resetArticlesIds = require('./utils/resetArticlesIds');
const saveArticles = require('./utils/saveArticles');

const app = express();
app.use(express.json());
app.use(cors());

// Middleware
const authenticate = require('./middleware/authenticate');
const authorizeAdmin = require('./middleware/authorizeAdmin');

// Login route (returns JWT token)
app.post("/login", (req, res) => {
    const {username, password} = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({message: 'Invalid credentials'});
    }

    // Generate JWT token
    const token = jwt.sign({id: user.id, username: user.username, role: user.role}, SECRET_KEY, {expiresIn: '1h'});
    return res.json({token});
});

// Public route: everyone can read article
app.get("/admin", async (req, res) => {
    const articles = await getArticles();
    return res.json(articles);
});

app.get("/home", async (req, res) => {
    const articles = await getArticles();
    return res.json(articles);
});

// Admin only: create new article
app.put('/new', authenticate, authorizeAdmin, async (req, res) => {
    const {date, title, content, author} = req.body;

    let articles = await getArticles();
    const newArticle = {id: articles.length + 1, date, title, content, author};
    articles.push(newArticle);

    await saveArticles(articles);
    return res.status(201).json(newArticle);
});

// Admin only: modify existing article
app.post('/edit/:id', authenticate, authorizeAdmin, async (req, res) => {
    let articles = await getArticles();
    articles = Array.from(articles);
    const articleIndex = articles.findIndex((a) => a.id === parseInt(req.params.id));

    if (articleIndex === -1) {
        return res.status(404).json({message: "Article you want to modified doesn't exist"});

    }

    articles[articleIndex] = {...articles[articleIndex], ...req.body};
    await saveArticles(articles);

    return res.status(200).json({message: "Article updated"});
});

// Admin only: delete article
app.delete("/admin", authenticate, authorizeAdmin, async (req, res) => {
    try {
        let articles = await getArticles();
        articles = Array.from(articles);
        const filteredArticle = articles.filter((a) => a.id !== parseInt(req.body.id));

        if (articles.length === filteredArticle.length) {
            return res.status(404).json({message: "Article you want to delete doesn't exist"});
        }

        let updatedArticles = filteredArticle;
        if (filteredArticle.length !== 0) {
            updatedArticles = await resetArticlesIds(filteredArticle);
        }

        await saveArticles(updatedArticles);

        return res.json({message: "Article deleted"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal server error"});
    }
});

// Protected route example
app.get('/me', authenticate, (req, res) => {
    return res.json({message: "Hello, " + req.user.username});
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
