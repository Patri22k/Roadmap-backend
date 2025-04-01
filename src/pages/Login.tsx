import { useState } from "react";
import { login } from "../api";

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
        } catch (err) {
            setError("Invalid credentials");
        }
    };

    return (
        <div>
            <h1>Login</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
