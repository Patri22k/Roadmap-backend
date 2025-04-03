interface ArticleProps {
    id: number;
    title: string;
}

const Article = (props: ArticleProps) => {
    return (
        <div key={props.id}>
            <h2 className="font-semibold text-lg">{props.title}</h2>
        </div>
    )
}

export default Article;