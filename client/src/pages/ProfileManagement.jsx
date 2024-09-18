import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config/config';

const ProfileManagementPage = () => {

    const userId = localStorage.getItem('userId');


    const [user, setUser] = useState({
        name: '',
        email: '',
        role: ''
    });


    const [password, setPassword] = useState({
        newPassword: ''
    });


    const [pastEvents, setPastEvents] = useState([]);
    const [pastTasks, setPastTasks] = useState([]);


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        if (!userId) {
            console.error('No userId found in localStorage');
            setError('No userId found in localStorage');
            setLoading(false);
            return;
        }

        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const headers = { Authorization: `Bearer ${token}` };


                console.log("Fetching data for userId:", userId);


                const userResponse = await axios.get(`${config.baseURL}/apiman-gateway/default/users/1.0/${userId}?apikey=${config.apikey}`, { headers });
                console.log("User profile response:", userResponse.data);
                setUser(userResponse.data);


                const eventsResponse = await axios.get(`${config.baseURL}/apiman-gateway/default/events/1.0/user/${userId}?apikey=${config.apikey}`, { headers });
                console.log("Fetched past events:", eventsResponse.data);
                setPastEvents(eventsResponse.data);


                const tasksResponse = await axios.get(`${config.baseURL}/apiman-gateway/default/tasks/1.0/assignee/${userId}?apikey=${config.apikey}`, { headers });
                console.log("Fetched past tasks:", tasksResponse.data);
                setPastTasks(tasksResponse.data);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching profile data:', error);
                setError('Failed to load profile data');
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [userId]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    };


    const handlePasswordChange = (e) => {
        const { value } = e.target;
        setPassword({ newPassword: value });
    };


    const handleSaveChanges = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };


            console.log("Saving updated user profile...", user);
            await axios.put(`${config.baseURL}/apiman-gateway/default/users/1.0/${userId}/profile?apikey=${config.apikey}`, user, { headers });
            console.log("User profile updated successfully");


            if (password.newPassword) {
                console.log("Changing user password...");
                await axios.put(`${config.baseURL}/apiman-gateway/default/users/1.0/${userId}/change-password?apikey=${config.apikey}`, { password: password.newPassword }, { headers });
                console.log("User password changed successfully");
            }

            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error saving profile:', error);
            alert('Failed to save changes');
        }
    };

    const handleDeleteUser = async () => {
        if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;

        try {
            const token = localStorage.getItem('accessToken');
            const headers = { Authorization: `Bearer ${token}` };

            await axios.delete(`${config.baseURL}/apiman-gateway/default/users/1.0/${userId}?apikey=${config.apikey}`, { headers });
            console.log("User profile deleted successfully");

            alert('Your account has been deleted');
            localStorage.removeItem('userId');
            localStorage.removeItem('accessToken');

            window.location.href = '/';
        } catch (error) {
            console.error('Error deleting user:', error);
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
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded mb-4"
                    />

                    <label className="block text-gray-700">Email (Contact):</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded mb-4"
                    />

                    <label className="block text-gray-700">Role (Preferences):</label>
                    <input
                        type="text"
                        name="role"
                        value={user.role}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded mb-4"
                    />
                </div>

                <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-4">Change Password</h3>
                    <input
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        value={password.newPassword}
                        onChange={handlePasswordChange}
                        className="w-full p-2 border rounded mb-4"
                    />
                </div>

                <div className="flex justify-between">
                    <button
                        onClick={handleSaveChanges}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Save Changes
                    </button>

                    <button
                        onClick={handleDeleteUser}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Delete Account
                    </button>
                </div>

                <div className="mt-8">
                    <h3 className="text-2xl font-bold mb-4">Past Events</h3>
                    {pastEvents.length > 0 ? (
                        <ul>
                            {pastEvents.map(event => (
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
                            {pastTasks.map(task => (
                                <li key={task.id} className="mb-4">
                                    <div className="bg-gray-100 p-4 rounded">
                                        <strong>{task.title}</strong><br />
                                        {task.description}<br />
                                        {task.eventId ? `Related to event: ${task.eventId}` : ''}
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
