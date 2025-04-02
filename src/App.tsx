import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import "./App.css";
import Article from "./pages/Article.tsx";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/admin" element={<Admin/>}/>
                <Route path="/article/:id" element={<Article/>}/>
            </Routes>
        </Router>
    );
};

export default App;
