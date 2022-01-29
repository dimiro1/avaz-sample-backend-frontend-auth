import './App.css'
import {Link, Route, Routes, useNavigate} from "react-router-dom"
import {useEffect, useState} from "react";
import * as api from "./api";
import * as auth from "./auth";


function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="about" element={<About/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="profile" element={<Profile/>}/>
                <Route path="admin" element={<Admin/>}/>
            </Routes>
        </div>
    )
}

function Navigation() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(auth.isAuthenticated());
    const [isAdmin, setIsAdmin] = useState(auth.isAdmin());

    const logout = async () => {
        if (await api.logout()) {
            auth.frontLogout();
            setIsAuthenticated(false);
            setIsAdmin(false);
            navigate("/");
        } else {
            alert("Please try again, server is not avaialble");
        }
    }
    return (
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li>
                {isAuthenticated ?
                    <a href="#" onClick={logout}>Logout</a>
                    : <Link to="/login">Login</Link>}
            </li>

            {isAuthenticated ?
                <li><Link to="/profile">Profile</Link></li>
                : ''}

            {isAdmin ?
                <li><Link to="/admin">Admin</Link></li>
                : ''}
        </ul>
    );
}

function Home() {
    return (
        <>
            <Navigation/>
            Home
        </>
    )
}

function Admin() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.isAdmin()) {
            navigate("/");
        }
    }, []);

    return (
        <>
            <Navigation/>
            OnlyAdmin
        </>
    )
}

function Profile() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(auth.isAuthenticated());
    const [profile, setProfile] = useState({});

    useEffect(async () => {
        if (isAuthenticated) {
            setProfile(await api.profile());
        } else {
            navigate("/login");
        }
    }, [])

    return (
        <>
            <Navigation/>
            Profile

            <ul>
                <li>Message: {profile.message}</li>
                {profile.address ? <>
                        <li>Street: {profile.address.street}</li>
                        <li>Number: {profile.address.number}</li>
                        <li>City: {profile.address.city}</li>
                    </>
                    : ''}

            </ul>
        </>
    )
}

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const onChangeUsername = (event) => {
        setUsername(event.target.value);
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();

        const user = await api.login(username, password);

        if (user.isAnonymous) {
            setMessage("Please check your credentials");
        } else {
            navigate("/");
        }
    }

    return (
        <>
            <Navigation/>
            {message !== "" ? <span className="error">{message}</span> : ""}
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" value={username} onChange={onChangeUsername}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChangePassword}/>
                </div>
                <input type="submit"/>
            </form>
        </>
    )
}

function About() {
    return (
        <>
            <Navigation/>
            About
        </>
    )
}

export default App
