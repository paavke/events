// pages/CreateTask.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const CreateTask = () => {
    const [events, setEvents] = useState([]);
    const [users, setUsers] = useState([]);
    const [taskData, setTaskData] = useState({
        event: '',
        title: '',
        description: '',
        deadline: '',
        assignee: '',
    });

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await axios.get('http://localhost:8080/apiman-gateway/default/events/1.0');
            setEvents(response.data);
        };

        const fetchUsers = async () => {
            const response = await axios.get('http://localhost:8080/apiman-gateway/default/users/1.0');
            setUsers(response.data);
        };

        fetchEvents();
        fetchUsers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData((prevData) => ({
            ...prevData, [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/apiman-gateway/default/tasks/1.0', taskData, {
                headers: { 'X-API-Key': 'dd4c8216-cfb7-4629-aad3-bb3da1a4c4ec' },
            });
            alert('Task created successfully!');
        } catch (error) {
            alert('Failed to create task');
            console.error(error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-6">
                <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Related Event</label>
                        <select
                            name="event"
                            value={taskData.event}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select Event</option>
                            {events.map((event) => (
                                <option key={event.EventID} value={event.EventID}>
                                    {event.Title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Task Title</label>
                        <input
                            type="text"
                            name="title"
                            value={taskData.title}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Task Description</label>
                        <textarea
                            name="description"
                            value={taskData.description}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Deadline</label>
                        <input
                            type="date"
                            name="deadline"
                            value={taskData.deadline}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Assignee</label>
                        <select
                            name="assignee"
                            value={taskData.assignee}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select User</option>
                            {users.map((user) => (
                                <option key={user.UserID} value={user.UserID}>
                                    {user.Name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Create Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTask;
