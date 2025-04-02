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
    const response = await axios.get(`${API_URL}/home`);
    return response.data;
};

export const fetchArticleByID = async (id: number): Promise<Article[]> => {
    const response = await fetchArticles();
    return response.filter((article) => article.id === id);
}

export const login = async (username: string, password: string): Promise<{ token: string }> => {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data;
};
