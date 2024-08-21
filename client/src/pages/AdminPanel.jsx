import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('/api/users').then(response => {
            setUsers(response.data);
        });

        axios.get('/api/events').then(response => {
            setEvents(response.data);
        });
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-gray-800 mb-8">Admin Panel</h2>
                <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                    <h3 className="text-2xl font-bold mb-4">Manage Users</h3>
                    {users.map(user => (
                        <div key={user.id} className="mb-2">
                            <p className="text-gray-800">{user.name}</p>
                            <button className="bg-red-500 text-white px-4 py-2 rounded mt-2">Delete</button>
                        </div>
                    ))}
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h3 className="text-2xl font-bold mb-4">Manage Events</h3>
                    {events.map(event => (
                        <div key={event.id} className="mb-2">
                            <p className="text-gray-800">{event.name}</p>
                            <button className="bg-red-500 text-white px-4 py-2 rounded mt-2">Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
