import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Article from "./pages/Article.tsx";
import NewArticle from "./pages/NewArticle.tsx";
import EditArticle from "./pages/EditArticle.tsx";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/admin" element={<Admin/>}/>
                <Route path="/article/:id" element={<Article/>}/>
                <Route path="/new" element={<NewArticle/>}/>
                <Route path="/edit/:id" element={<EditArticle/>}/>
            </Routes>
        </Router>
    );
};

export default App;
