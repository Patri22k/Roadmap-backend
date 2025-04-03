import {useState} from "react";
import * as React from "react";
import {addArticle} from "../api.ts";
import {Link} from "react-router-dom";

const NewArticle = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await addArticle({ title, content, author: "admin" });

            setMessage("Article published successfully!");
            setTitle("");
            setContent("");
        } catch (error) {
            setMessage("Error: " + error);
        }
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="py-6">New Article</h1>
            <form onSubmit={handleSubmit} className="flex flex-col w-9/12 mx-auto">
                <div className="flex flex-col items-center mb-10">
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full mt-10 h-10 border-2 border-gray-300 rounded-md px-4 placeholder:text-black"
                        type="text" placeholder="Article title"
                        required/>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full mt-10 h-30 border-2 border-gray-300 rounded-md px-4 pt-2 placeholder:text-black"
                        placeholder="Content"
                        required/>
                </div>
                <button type="submit" className="border-2 w-fit border-gray-300 rounded-md px-6 py-3">Publish</button>
                {message && <p className="text-red-500 my-4">{message}</p>}
            </form>
            <div className="mt-auto mb-16">
                <Link className="border-2 w-fit border-gray-300 rounded-md px-6 py-3" to="/">Back to Home</Link>
            </div>
        </div>
    )
}

export default NewArticle;