 import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav className="bg-gray-800 p-4 text-white">
            <div className="container mx-auto flex items-center">
               
                <div className="flex-grow"></div>

              
                <div className="flex space-x-4">
                    <Link to="/" className="hover:bg-gray-700 px-3 py-2 rounded">Home</Link>
                    <Link to="/dashboard" className="hover:bg-gray-700 px-3 py-2 rounded">Events</Link>
                    <Link to="/tasks" className="hover:bg-gray-700 px-3 py-2 rounded">Tasks</Link>
                    <Link to="/profile" className="hover:bg-gray-700 px-3 py-2 rounded">Profile</Link>
                </div>

              
                <div className="flex-grow text-right">
                    <Link to="/logout" className="hover:bg-gray-700 px-3 py-2 rounded">Logout</Link>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
