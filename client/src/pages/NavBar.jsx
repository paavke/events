import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
    const userId = localStorage.getItem('userId');  // Assuming the userId is stored in localStorage
    const navigate = useNavigate();

    // Logout function to clear localStorage and navigate to login page
    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('accessToken');
        navigate('/login');  // Navigate to login page after logout
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between">
                <div className="flex space-x-4">
                    <Link to="/" className="text-white">Home</Link>
                    {userId && (
                        <Link to={`/dashboard/${userId}`} className="text-white">Dashboard</Link>
                    )}
                    <Link to={`/events-list/${userId}`} className="text-white">Events</Link>
                    <Link to="/tasks" className="text-white">Tasks</Link>
                    <Link to="/profile" className="text-white">Profile</Link>

                    {/* Conditionally show the Dashboard link only if userId exists */}

                </div>
                <div className="text-white">
                    {userId ? (
                        <button onClick={handleLogout} className="text-white">Logout</button>
                    ) : (
                        <Link to="/login" className="text-white">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
