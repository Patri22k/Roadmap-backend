import {Link, useParams} from "react-router-dom";

const EditButton = () => {

    const id = useParams<{ id: string }>();
    const articleID = id.id ? parseInt(id.id) : NaN;

    return (
        <Link to={`/edit/${articleID}`} className="font-semibold text-gray-400 text-lg">
            Edit
        </Link>
    )
};

export default EditButton;