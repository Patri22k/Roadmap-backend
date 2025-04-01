import { useEffect, useState } from "react";
import { fetchArticles } from "../api";
import Article from "../components/Article";

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
                articles.map((article) => <Article key={article.id} {...article} />)
            ) : (
                <p>No articles found.</p>
            )}
        </div>
    );
};

export default Home;
