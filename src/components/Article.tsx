interface ArticleProps {
    id: number;
    title: string;
}

const Article = (props: ArticleProps) => {
    return (
        <div key={props.id} className="">
            <h2>{props.title}</h2>
        </div>
    )
}

export default Article;