import {useParams} from "react-router-dom";

const EditArticle = () => {
    const id = useParams<{ id: string }>();
    const articleID = id.id ? parseInt(id.id) : NaN;


    // TODO: Update article
    return (
        <div>
        <h1>Edit Article</h1>
        {/* Add your edit article form here */}
        </div>
    );
}

export default EditArticle;