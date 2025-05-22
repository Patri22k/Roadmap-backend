import {useEffect, useState} from "react";
import {deleteArticle, fetchArticles} from "../api.ts";
import {Link, useNavigate} from "react-router-dom";
import AddButton from "../components/AddButton.tsx";
import ArticleTitle from "../components/ArticleTitle.tsx";

const Admin = () => {
    interface Article {
        id: number;
        title: string;
        content: string;
    }

    const [articles, setArticles] = useState<Article[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login"); // Redirect if no token
            return;
        }

        const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload

        if (payload.role != "admin") {
            navigate("/"); // Redirect if not admin
        }

        fetchArticles().then(setArticles).catch(console.error);
    }, [navigate]);

    return (
        <>
            <div className="flex items-center justify-between w-9/12 mx-auto py-4">
                <h1 className="py-4">Personal Blog</h1>
                <AddButton/>
            </div>
            <div className="w-9/12 mx-auto pt-4">
                {articles.length > 0 ? (
                    articles.map((article) => (
                        <div key={article.id} className="flex items-center justify-between w-full">
                            <Link key={article.id} to={`/article/${article.id}`} className="block py-3" >
                                <ArticleTitle id={article.id} title={article.title}/>
                            </Link>
                            <div className="flex items-center justify-between w-1/6">
                                <Link to={`/edit/${article.id}`} className="font-semibold text-gray-400 text-lg">
                                    Edit
                                </Link>
                                <button onClick={() => deleteArticle(article.id)} className="font-semibold text-gray-400 text-lg">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No article found</p>
                )}
            </div>
        </>
    );
};

export default Admin;
