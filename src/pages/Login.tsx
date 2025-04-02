import { useState } from "react";
import { login } from "../api";
import * as React from "react";
import {Link} from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    interface LoginResponse {
        token: string;
    }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            const data: LoginResponse = await login(username, password);
            localStorage.setItem("token", data.token);
            if (username === "admin") {
                window.location.href = "/admin"; // Redirect to admin page
            } else {
                window.location.href = "/"; // Redirect to home page
            }
        } catch {
            setError("Invalid credentials");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <h1>Login</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleLogin} className="flex flex-col items-center mx-auto w-9/12 pt-8 pb-4">
                <input
                    className="w-full mt-10 mb-4 h-10 border-2 border-gray-300 rounded-md px-4"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="w-full mb-4 h-10 border-2 border-gray-300 rounded-md px-4"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="border-2 w-fit border-gray-300 rounded-md px-6 p-3">Login</button>
            </form>
            <Link className="border-2 w-fit border-gray-300 rounded-md px-6 py-3" to="/">Back to Home</Link>
        </div>
    );
};

export default Login;
