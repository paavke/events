import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient, { apimanUrl } from '../services/apiClient';

const CreateTaskPage = () => {
    const [task, setTask] = useState({ title: '', description: '', deadline: '', eventId: '', assigneeId: '', status: '' });
    const [events, setEvents] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId');

        const fetchEvents = async () => {
            try {
                const eventsResponse = await apiClient.get(apimanUrl(`/events/1.0/user/${userId}`));
                setEvents(eventsResponse.data);
            } catch (err) {
                console.error('Failed to fetch events:', err);
            }
        };

        const fetchUsers = async () => {
            try {
                const usersResponse = await apiClient.get(apimanUrl('/users/1.0'));
                setUsers(usersResponse.data);
            } catch (err) {
                console.error('Failed to fetch users:', err);
            }
        };

        fetchEvents();
        fetchUsers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prevTask) => ({ ...prevTask, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await apiClient.post(apimanUrl('/tasks/1.0'), task);
            alert('Task created successfully');
            navigate('/tasks');
        } catch (err) {
            console.error('Error creating task:', err);
            setError('Failed to create task');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h2 className="text-3xl font-bold mb-6">Create New Task</h2>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Task Title</label>
                        <input type="text" name="title" value={task.title} onChange={handleChange} className="w-full p-2 border rounded" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Task Description</label>
                        <textarea name="description" value={task.description} onChange={handleChange} className="w-full p-2 border rounded" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Deadline</label>
                        <input type="datetime-local" name="deadline" value={task.deadline} onChange={handleChange} className="w-full p-2 border rounded" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Related Event</label>
                        <select name="eventId" value={task.eventId} onChange={handleChange} className="w-full p-2 border rounded">
                            <option value="">Select an event</option>
                            {events.map((event) => (
                                <option key={event.id} value={event.id}>{event.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Assignee</label>
                        <select name="assigneeId" value={task.assigneeId} onChange={handleChange} className="w-full p-2 border rounded" required>
                            <option value="">Select an assignee</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Status</label>
                        <select name="status" value={task.status} onChange={handleChange} className="w-full p-2 border rounded" required>
                            <option value="">Select status</option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={loading}>
                        {loading ? 'Creating Task...' : 'Create Task'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateTaskPage;
