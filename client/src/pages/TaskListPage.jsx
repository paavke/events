import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient, { apimanUrl } from '../services/apiClient';

const TaskListPage = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId');

        const fetchTasks = async () => {
            try {
                const url = userId
                    ? apimanUrl(`/tasks/1.0/assignee/${userId}`)
                    : apimanUrl('/tasks/1.0');
                const response = await apiClient.get(url);
                const data = response.data;
                setTasks(Array.isArray(data) ? data : data.tasks || []);
            } catch (err) {
                console.error('Failed to fetch tasks:', err);
                setError('Failed to fetch tasks');
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h2 className="text-3xl font-bold mb-6">Task List</h2>
                <div className="flex justify-end mb-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate('/create-task')}>
                        Create Task
                    </button>
                </div>
                <ul>
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <li key={task.id} className="mb-4 cursor-pointer hover:underline" onClick={() => navigate(`/task-details/${task.id}`)}>
                                <strong>{task.title}</strong>: {task.description}
                            </li>
                        ))
                    ) : (
                        <p>No tasks available.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default TaskListPage;
