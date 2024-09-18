import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config/config';

const TaskListPage = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const headers = {
                    Authorization: `Bearer ${token}`,
                };

                const response = await axios.get(`${config.baseURL}/apiman-gateway/default/tasks/1.0?apikey=${config.apikey}`, { headers });
                setTasks(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch tasks:', error);
                setError('Failed to fetch tasks');
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const handleTaskClick = (taskId) => {
        navigate(`/task-details/${taskId}`);
    };

    const handleCreateTask = () => {
        navigate('/create-task');
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h2 className="text-3xl font-bold mb-6">Task List</h2>

                <div className="flex justify-end mb-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleCreateTask}
                    >
                        Create Task
                    </button>
                </div>

                <ul>
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <li
                                key={task.id}
                                className="mb-4 cursor-pointer hover:underline"
                                onClick={() => handleTaskClick(task.id)}
                            >
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
