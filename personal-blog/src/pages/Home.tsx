import {useEffect, useState} from "react";
import {fetchArticles} from "../api";
import {Link} from "react-router-dom";
import ArticleTitle from "../components/ArticleTitle.tsx";

const Home = () => {
    interface Article {
        id: number;
        title: string;
        date: string;
    }

    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        fetchArticles().then(setArticles).catch(console.error);
    }, []);

    return (
        <div className="home w-full h-full">
            <nav className="flex justify-between items-center mx-auto w-9/12 pt-4 pb-8">
                <h1>Personal blog</h1>
                <Link className="border-2 w-fit border-gray-300 rounded-md px-6 py-2" to="/login">Login</Link>
            </nav>
            <div className="w-9/12 mx-auto">
            {articles.length > 0 ? (
                articles.map((article) => (
                    <Link className="flex justify-between items-center py-3" key={article.id} to={`/article/${article.id}`}>
                        <ArticleTitle id={article.id} title={article.title}/>
                        <p className="text-gray-500 text-lg">{new Date(article.date).toLocaleDateString()}</p>
                    </Link>
                    ))
            ) : (
                <p>No articles found.</p>
            )}
            </div>
        </div>
    );
};

export default Home;
