import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config/config';

function AdminPage() {
    const [user, setUser] = useState({ name: '', email: '', password: '', role: '' });
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');

    const token = localStorage.getItem('accessToken');
    const navigate = useNavigate();


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const headers = {
                    'Authorization': `Bearer ${token}`
                };

                console.log("Fetching users with headers:", headers);

                const response = await axios.get(
                    `${config.baseURL}/apiman-gateway/default/users/1.0?apikey=${config.apikey}`,
                    { headers }
                );

                const usersData = Array.isArray(response.data) ? response.data : [];
                console.log("Fetched users data -", usersData);
                setUsers(usersData);
            } catch (error) {
                console.error('Error fetching users -', error);
                setUsers([]);
            }
        };

        if (token) {
            console.log("Fetching users for token -", token);
            fetchUsers();
        } else {
            console.log("No token found in localStorage");
        }
    }, [token]);


    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    // Handle Submit to Create User
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        console.log("Submitting user creation with data:", user);

        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };

            console.log("Sending POST request with headers:", headers);

            const response = await axios.post(
                `${config.baseURL}/apiman-gateway/default/users/1.0?apikey=${config.apikey}`,
                user,
                { headers }
            );

            console.log("POST response:", response);

            if (response.status === 200) {
                console.log("User created successfully:", response.data);
                setMessage('User created successfully');
                setUser({ name: '', email: '', password: '', role: '' });


                navigate(`/dashboard/${response.data.id}`);
            } else {
                console.log("Failed to create user. Status code:", response.status);
                setMessage('Failed to create user');
            }
        } catch (error) {
            console.error('Error creating user:', error);
            setMessage('Error occurred while creating user');
        }
    }

    const handleUserSelect = (userId) => {
        console.log("Navigating to dashboard of user with ID:", userId);

        navigate(`/dashboard/${userId}`);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
            <div className="bg-white p-8 rounded shadow-md w-96 mb-8">
                <h2 className="text-2xl font-bold mb-6">Create New User</h2>
                {message && <p className="mb-4 text-center text-blue-500">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Role</label>
                        <input
                            type="text"
                            name="role"
                            value={user.role}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
                        Create User
                    </button>
                </form>
            </div>

            <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-6">User List</h2>
                <div className="max-h-64 overflow-y-auto">
                    <ul>
                        {users.length === 0 ? (
                            <p className="text-center text-gray-600">No users found.</p>
                        ) : (
                            users.map((user) => (
                                <li key={user.id} className="mb-4 border-b pb-2">
                                    <div className="flex justify-between items-center">
                                        <span>{user.name} ({user.email})</span>
                                        <button
                                            className="text-blue-500 hover:underline"
                                            onClick={() => handleUserSelect(user.id)}
                                        >
                                            Select
                                        </button>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;
