import { useEffect, useState } from "react";
import { fetchArticles } from "../api.ts";
import EditButton from "../components/EditButton.tsx";
import DeleteButton from "../components/DeleteButton.tsx";
import { useNavigate } from "react-router-dom";

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
        <div>
            <h1>Admin Page</h1>
            <h2>Articles</h2>
            {articles.length > 0 ? (
                articles.map((a) => (
                    <div key={a.id}>
                        <p>{a.title}</p>
                        <p>{a.content}</p>
                        <EditButton />
                        <DeleteButton />
                    </div>
                ))
            ) : (
                <p>No article found</p>
            )}
        </div>
    );
};

export default Admin;
