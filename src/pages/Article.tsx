import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchArticleByID} from "../api.ts";

const Article = () => {
    interface Article {
        title: string;
        content: string;
    }

    const { id } = useParams<{ id: string }>();
    const articleID = id ? parseInt(id) : NaN;

    const [article, setArticle] = useState<Article | null>(null);

    useEffect(() => {
        fetchArticleByID(articleID).then((articles) => {
            if (Array.isArray(articles)) {
                setArticle(articles[0]);
            } else {
                setArticle(articles);
            }
        }).catch(console.error);
    }, [articleID]);

    if (isNaN(articleID) || !article) {
        return <p>No article found</p>;
    }

    return (
        <div>
            <h1>{article.title}</h1>
            <p>{article.content}</p>
        </div>
    )
}

export default Article;