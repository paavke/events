import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import config from '../config/config';

const TaskDetailsPage = () => {
    const { taskId } = useParams();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editTaskData, setEditTaskData] = useState({});
    const [eventName, setEventName] = useState('');
    const [assigneeName, setAssigneeName] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchTaskDetails = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const headers = {
                    Authorization: `Bearer ${token}`,
                };

                const response = await axios.get(`${config.baseURL}/apiman-gateway/default/tasks/1.0/${taskId}?apikey=${config.apikey}`, { headers });
                setTask(response.data);
                setEditTaskData(response.data);

                if (response.data.eventId) {
                    fetchEventName(response.data.eventId);
                }

                if (response.data.assigneeId) {
                    fetchAssigneeName(response.data.assigneeId);
                }

                setLoading(false);
            } catch (error) {
                setError('Failed to fetch task details');
                setLoading(false);
            }
        };

        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const headers = {
                    Authorization: `Bearer ${token}`,
                };

                const response = await axios.get(`${config.baseURL}/apiman-gateway/default/users/1.0?apikey=${config.apikey}`, { headers });
                setUsers(response.data);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };

        const fetchEventName = async (eventId) => {
            try {
                const token = localStorage.getItem('accessToken');
                const headers = {
                    Authorization: `Bearer ${token}`,
                };

                const response = await axios.get(`${config.baseURL}/apiman-gateway/default/events/1.0/${eventId}?apikey=${config.apikey}`, { headers });
                setEventName(response.data.name);  // Set the event name
            } catch (error) {
                console.error('Failed to fetch event name:', error);
            }
        };

        const fetchAssigneeName = async (assigneeId) => {
            try {
                const token = localStorage.getItem('accessToken');
                const headers = {
                    Authorization: `Bearer ${token}`,
                };

                const response = await axios.get(`${config.baseURL}/apiman-gateway/default/users/1.0/${assigneeId}?apikey=${config.apikey}`, { headers });
                setAssigneeName(response.data.name);
            } catch (error) {
                console.error('Failed to fetch assignee name:', error);
            }
        };

        fetchTaskDetails();
        fetchUsers();
    }, [taskId]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditTaskData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSaveChanges = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };

            await axios.put(`${config.baseURL}/apiman-gateway/default/tasks/1.0/${taskId}?apikey=${config.apikey}`, editTaskData, { headers });
            setTask(editTaskData);
            setIsEditing(false);
            alert('Task updated successfully');
        } catch (error) {
            console.error('Error updating task:', error);
            alert('Error updating task');
        }
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            await axios.delete(`${config.baseURL}/apiman-gateway/default/tasks/1.0/${taskId}?apikey=${config.apikey}`, { headers });
            alert('Task deleted successfully');
            navigate('/tasks');
        } catch (error) {
            console.error('Error deleting task:', error);
            alert('Failed to delete task');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h2 className="text-3xl font-bold mb-6">Task Details</h2>

                {isEditing ? (
                    <div>

                        <div className="mb-4">
                            <strong>Task Title:</strong>
                            <input
                                type="text"
                                name="title"
                                value={editTaskData.title}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <strong>Description:</strong>
                            <textarea
                                name="description"
                                value={editTaskData.description}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <strong>Deadline:</strong>
                            <input
                                type="datetime-local"
                                name="deadline"
                                value={editTaskData.deadline}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <strong>Related Event:</strong>
                            <select
                                name="relatedEvent"
                                value={editTaskData.relatedEvent}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Select Event</option>

                            </select>
                        </div>

                        <div className="mb-4">
                            <strong>Assignee:</strong>
                            <select
                                name="assignee"
                                value={editTaskData.assignee}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Select Assignee</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button onClick={handleSaveChanges} className="bg-green-500 text-white py-2 px-4 rounded">
                            Save Changes
                        </button>
                        <button onClick={handleEditToggle} className="ml-4 bg-gray-500 text-white py-2 px-4 rounded">
                            Cancel
                        </button>
                    </div>
                ) : (
                    <div>

                        <div className="mb-4">
                            <strong>Task Title:</strong> {task.title}
                        </div>

                        <div className="mb-4">
                            <strong>Description:</strong> {task.description}
                        </div>

                        <div className="mb-4">
                            <strong>Deadline:</strong> {new Date(task.deadline).toLocaleString()}
                        </div>

                        <div className="mb-4">
                            <strong>Related Event:</strong> {eventName || "No related event"}
                        </div>

                        <div className="mb-4">
                            <strong>Assignee:</strong> {assigneeName || "No assignee"}
                        </div>

                        <button onClick={handleEditToggle} className="bg-blue-500 text-white py-2 px-4 rounded">
                            Edit Task
                        </button>
                        <button onClick={handleDelete} className="ml-4 bg-red-500 text-white py-2 px-4 rounded">
                            Delete Task
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskDetailsPage;
