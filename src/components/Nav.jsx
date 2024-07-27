import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '/src/context/AuthContext.jsx';
import React from 'react'

function Sidebar() {
    const isLoggedIn = !!localStorage.getItem('token'); // Assuming token is stored in localStorage
    const navigate = useNavigate();
    const { isAuthenticated, setAuthenticated } = useAuth();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username'); // Clear the username
        localStorage.removeItem('user_id');
        setAuthenticated(false);
        navigate('/login');
    };
  

    return (
        <div className="sidebar-container">
        <ul>
            <div className="sidebar-item">
            <Link to="/">
                <li>Home</li>
            </Link>
            </div>

            <div className="sidebar-item">
            <Link to="/conversions">
                <li>Nanerverter</li>
            </Link>
            </div>

            <div className="sidebar-item">
            <Link to="/recipes">
                <li>Banana Recipes</li>
            </Link>
            </div>

            <div className="sidebar-item">
            <Link to="/books">
                <li>Banana Books</li>
            </Link>
            </div>

            <div className="sidebar-item">
            <Link to="/funfacts">
                <li>Banana Fun Facts</li>
            </Link>
            </div>

            <div className="sidebar-item">
            {isAuthenticated ? (
                    <>
                        <button onClick={handleLogout} className="btn">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link>
                    </>
            )}
            </div>
        </ul>

        <div className="sidebar-gif">
            <img src="./src/assets/images/3183117_volfenthefox_peanut-butter-jelly-time.gif" alt="Sidebar GIF" />
        </div>
        </div>
    );
}

export default Nav;
