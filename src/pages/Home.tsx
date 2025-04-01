import { useEffect, useState } from "react";
import { fetchArticles } from "../api";

const Home = () => {
    interface Article {
        id: number;
        title: string;
        content: string;
    }
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        fetchArticles().then(setArticles).catch(console.error);
    }, []);

    return (
        <div>
            <h1>Blog Articles</h1>
            {articles.length > 0 ? (
                articles.map((article) => (
                    <div key={article.id}>
                        <h2>{article.title}</h2>
                        <p>{article.content}</p>
                        <hr />
                    </div>
                ))
            ) : (
                <p>No articles found.</p>
            )}
        </div>
    );
};

export default Home;
