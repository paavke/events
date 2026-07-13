import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient, { apimanUrl } from '../services/apiClient';

function AdminPage() {
    const [user, setUser] = useState({ name: '', email: '', password: '', role: '' });
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await apiClient.get(apimanUrl('/users/1.0'));
                setUsers(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Error fetching users:', error);
                setUsers([]);
            }
        };

        if (localStorage.getItem('accessToken')) {
            fetchUsers();
        }
    }, []);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await apiClient.post(apimanUrl('/users/1.0'), user);

            if (response.status === 200) {
                setMessage('User created successfully');
                setUser({ name: '', email: '', password: '', role: '' });
                navigate(`/dashboard/${response.data.id}`);
            } else {
                setMessage('Failed to create user');
            }
        } catch (error) {
            console.error('Error creating user:', error);
            setMessage('Error occurred while creating user');
        }
    };

    const handleUserSelect = (userId) => {
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
                        <input type="text" name="name" value={user.name} onChange={handleChange} className="w-full p-2 border rounded" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input type="email" name="email" value={user.email} onChange={handleChange} className="w-full p-2 border rounded" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input type="password" name="password" value={user.password} onChange={handleChange} className="w-full p-2 border rounded" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Role</label>
                        <input type="text" name="role" value={user.role} onChange={handleChange} className="w-full p-2 border rounded" required />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Create User</button>
                </form>
            </div>

            <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-6">User List</h2>
                <div className="max-h-64 overflow-y-auto">
                    <ul>
                        {users.length === 0 ? (
                            <p className="text-center text-gray-600">No users found.</p>
                        ) : (
                            users.map((u) => (
                                <li key={u.id} className="mb-4 border-b pb-2">
                                    <div className="flex justify-between items-center">
                                        <span>{u.name} ({u.email})</span>
                                        <button className="text-blue-500 hover:underline" onClick={() => handleUserSelect(u.id)}>Select</button>
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
