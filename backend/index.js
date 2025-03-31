require("dotenv").config();
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Secret key for JWT signing and encryption
const SECRET_KEY = process.env.SECRET_KEY || "admin";

// Fake users for database
const users = [
    { id: 1, username: 'admin', password: 'admin', role: 'admin' },
    { id: 2, username: 'user', password: 'user', role: 'user' },
];

// Fake articles array (temporary storage)
let articles = [
    { id: 1, title: "First Article", content: "Hello world!", author: "admin" },
];

// Login route (returns JWT token)
app.use('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
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
app.get("/articles", (req, res) => {
    res.json(articles);
});

// Admin only: create new article
app.put('/articles', authenticate, authorizeAdmin, (req, res) => {
    const { title, content, author } = req.body;
    const newArticle = { id: articles.length + 1, title, content, author }; // Temporary ID generation
    articles.push(newArticle);
    res.status(201).json(newArticle);
});

// Admin only: modify existing article
app.post('/articles/:id', authenticate, authorizeAdmin, (req, res) => {
    const article = articles.find((a) => a.id === parseInt(req.params.id));

    if (!article) {
        res.status(404).json({ message: "Article you want to modified doesn't exist" });
    }

    article.title = req.body.title || article.title;
    article.content = req.body.content || article.content;

    res.status(200).json({ message: "Article updated" });
});

// Admin only: delete article
app.delete("/articles/:id", authenticate, authorizeAdmin, (req, res) => {
    articles = articles.filter((a) => a.id !== req.params.id);
    res.json({ message: "Article deleted" });
});

// Protected route example
app.get('/me', authenticate, (req, res) => {
    res.json({ message: "Hello, " + req.user.username });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
