import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient, { apimanUrl } from '../services/apiClient';

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
        const fetchEventName = async (eventId) => {
            try {
                const response = await apiClient.get(apimanUrl(`/events/1.0/${eventId}`));
                setEventName(response.data.name);
            } catch (err) {
                console.error('Failed to fetch event name:', err);
            }
        };

        const fetchAssigneeName = async (assigneeId) => {
            try {
                const response = await apiClient.get(apimanUrl(`/users/1.0/${assigneeId}`));
                setAssigneeName(response.data.name);
            } catch (err) {
                console.error('Failed to fetch assignee name:', err);
            }
        };

        const fetchTaskDetails = async () => {
            try {
                const response = await apiClient.get(apimanUrl(`/tasks/1.0/${taskId}`));
                setTask(response.data);
                setEditTaskData(response.data);

                if (response.data.eventId) fetchEventName(response.data.eventId);
                if (response.data.assigneeId) fetchAssigneeName(response.data.assigneeId);
            } catch (err) {
                setError('Failed to fetch task details');
            } finally {
                setLoading(false);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await apiClient.get(apimanUrl('/users/1.0'));
                setUsers(response.data);
            } catch (err) {
                console.error('Failed to fetch users:', err);
            }
        };

        fetchTaskDetails();
        fetchUsers();
    }, [taskId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditTaskData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveChanges = async () => {
        try {
            await apiClient.put(apimanUrl(`/tasks/1.0/${taskId}`), editTaskData);
            setTask(editTaskData);
            setIsEditing(false);
            alert('Task updated successfully');
        } catch (err) {
            console.error('Error updating task:', err);
            alert('Error updating task');
        }
    };

    const handleDelete = async () => {
        try {
            await apiClient.delete(apimanUrl(`/tasks/1.0/${taskId}`));
            alert('Task deleted successfully');
            navigate('/tasks');
        } catch (err) {
            console.error('Error deleting task:', err);
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
                            <input type="text" name="title" value={editTaskData.title} onChange={handleInputChange} className="w-full p-2 border rounded" />
                        </div>
                        <div className="mb-4">
                            <strong>Description:</strong>
                            <textarea name="description" value={editTaskData.description} onChange={handleInputChange} className="w-full p-2 border rounded" />
                        </div>
                        <div className="mb-4">
                            <strong>Deadline:</strong>
                            <input type="datetime-local" name="deadline" value={editTaskData.deadline} onChange={handleInputChange} className="w-full p-2 border rounded" />
                        </div>
                        <div className="mb-4">
                            <strong>Assignee:</strong>
                            <select name="assigneeId" value={editTaskData.assigneeId || ''} onChange={handleInputChange} className="w-full p-2 border rounded">
                                <option value="">Select Assignee</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>{user.name}</option>
                                ))}
                            </select>
                        </div>
                        <button onClick={handleSaveChanges} className="bg-green-500 text-white py-2 px-4 rounded">Save Changes</button>
                        <button onClick={() => setIsEditing(false)} className="ml-4 bg-gray-500 text-white py-2 px-4 rounded">Cancel</button>
                    </div>
                ) : (
                    <div>
                        <div className="mb-4"><strong>Task Title:</strong> {task.title}</div>
                        <div className="mb-4"><strong>Description:</strong> {task.description}</div>
                        <div className="mb-4"><strong>Deadline:</strong> {new Date(task.deadline).toLocaleString()}</div>
                        <div className="mb-4"><strong>Related Event:</strong> {eventName || 'No related event'}</div>
                        <div className="mb-4"><strong>Assignee:</strong> {assigneeName || 'No assignee'}</div>
                        <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white py-2 px-4 rounded">Edit Task</button>
                        <button onClick={handleDelete} className="ml-4 bg-red-500 text-white py-2 px-4 rounded">Delete Task</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskDetailsPage;
