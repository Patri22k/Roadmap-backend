import axios from "axios";

const API_URL = "http://localhost:3000"; // Your backend URL

export interface User {
    id: number;
    username: string;
    role: "admin" | "user";
}

export interface Article {
    id: number;
    title: string;
    content: string;
    author: string;
}

export const fetchArticles = async (): Promise<Article[]> => {
    const response = await axios.get(`${API_URL}/articles`);
    return response.data;
};

export const login = async (username: string, password: string): Promise<{ token: string }> => {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data;
};

export const getMe = async (token: string): Promise<User> => {
    const response = await axios.get(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data);
    return response.data;
};
