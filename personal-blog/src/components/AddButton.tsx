import {Link} from "react-router-dom";

const AddButton = () => {
    return (
        <Link to="/new" className="flex items-center justify-center text-xl font-semibold">+ Add</Link>
    )
}

export default AddButton;