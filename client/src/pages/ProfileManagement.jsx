import React, { useState, useEffect } from 'react';
import apiClient, { apimanUrl } from '../services/apiClient';

const ProfileManagementPage = () => {
    const userId = localStorage.getItem('userId');
    const [user, setUser] = useState({ name: '', email: '', role: '' });
    const [password, setPassword] = useState({ newPassword: '' });
    const [pastEvents, setPastEvents] = useState([]);
    const [pastTasks, setPastTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) {
            setError('No userId found. Please log in again.');
            setLoading(false);
            return;
        }

        const fetchUserProfile = async () => {
            try {
                const userResponse = await apiClient.get(apimanUrl(`/users/1.0/${userId}`));
                setUser(userResponse.data);

                const eventsResponse = await apiClient.get(apimanUrl(`/users/1.0/${userId}/past-events`));
                setPastEvents(eventsResponse.data);

                const tasksResponse = await apiClient.get(apimanUrl(`/users/1.0/${userId}/past-tasks`));
                setPastTasks(tasksResponse.data);
            } catch (err) {
                console.error('Error fetching profile data:', err);
                setError('Failed to load profile data');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [userId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveChanges = async () => {
        try {
            await apiClient.put(apimanUrl(`/users/1.0/${userId}/profile`), user);

            if (password.newPassword) {
                await apiClient.put(apimanUrl(`/users/1.0/${userId}/change-password`), {
                    newPassword: password.newPassword,
                });
            }

            alert('Profile updated successfully');
        } catch (err) {
            console.error('Error saving profile:', err);
            alert('Failed to save changes');
        }
    };

    const handleDeleteUser = async () => {
        if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) return;

        try {
            await apiClient.delete(apimanUrl(`/users/1.0/${userId}`));
            localStorage.removeItem('userId');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/';
        } catch (err) {
            console.error('Error deleting user:', err);
            alert('Failed to delete your account');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h2 className="text-3xl font-bold mb-6">Profile Management</h2>

                <div className="mb-6">
                    <label className="block text-gray-700">Name:</label>
                    <input type="text" name="name" value={user.name} onChange={handleInputChange} className="w-full p-2 border rounded mb-4" />
                    <label className="block text-gray-700">Email (Contact):</label>
                    <input type="email" name="email" value={user.email} onChange={handleInputChange} className="w-full p-2 border rounded mb-4" />
                    <label className="block text-gray-700">Role (Preferences):</label>
                    <input type="text" name="role" value={user.role} onChange={handleInputChange} className="w-full p-2 border rounded mb-4" />
                </div>

                <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-4">Change Password</h3>
                    <input type="password" name="newPassword" placeholder="New Password" value={password.newPassword} onChange={(e) => setPassword({ newPassword: e.target.value })} className="w-full p-2 border rounded mb-4" />
                </div>

                <div className="flex justify-between">
                    <button onClick={handleSaveChanges} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save Changes</button>
                    <button onClick={handleDeleteUser} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete Account</button>
                </div>

                <div className="mt-8">
                    <h3 className="text-2xl font-bold mb-4">Past Events</h3>
                    {pastEvents.length > 0 ? (
                        <ul>
                            {pastEvents.map((event) => (
                                <li key={event.id} className="mb-4">
                                    <div className="bg-gray-100 p-4 rounded">
                                        <strong>{event.name}</strong> - {new Date(event.date).toLocaleDateString()}<br />
                                        <em>{event.location}</em><br />
                                        {event.description}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No past events found.</p>
                    )}

                    <h3 className="text-2xl font-bold mt-8 mb-4">Past Tasks</h3>
                    {pastTasks.length > 0 ? (
                        <ul>
                            {pastTasks.map((task) => (
                                <li key={task.id} className="mb-4">
                                    <div className="bg-gray-100 p-4 rounded">
                                        <strong>{task.title}</strong><br />
                                        {task.description}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No past tasks found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileManagementPage;
