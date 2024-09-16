import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import config from '../config/config.js';

function Dashboard() {
    const [events, setEvents] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);

    // Define ensureTokenIsValid function before useEffect
    const ensureTokenIsValid = useCallback(async () => {
        const token = localStorage.getItem('accessToken');
        const tokenExpiration = JSON.parse(atob(token.split('.')[1])).exp;
        const now = Math.floor(Date.now() / 1000); // Current time in seconds

        if (tokenExpiration - now < 60) {  // If the token is about to expire in less than 60 seconds
            await refreshAccessToken();
        }
    }, []); // Empty dependency array ensures it's only created once

    const refreshAccessToken = async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        const refreshUrl = `${config.baseURL}/auth/realms/${config.realm}/protocol/openid-connect/token`;

        const body = new URLSearchParams({
            client_id: config.clientId,
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        });

        try {
            const response = await axios.post(refreshUrl, body.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            });

            if (response.status === 200) {
                const data = response.data;
                localStorage.setItem('accessToken', data.access_token);
                localStorage.setItem('refreshToken', data.refresh_token);
            } else {
                throw new Error('Failed to refresh token');
            }
        } catch (error) {
            console.error('Failed to refresh access token', error);
            // Handle refresh token failure (e.g., redirect to login page)
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await ensureTokenIsValid();

                const eventsResponse = await axios.get(`${config.baseURL}/apiman-gateway/default/events/1.0?apikey=${config.apikey}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                });
                setEvents(eventsResponse.data);

                const tasksResponse = await axios.get(`${config.baseURL}/apiman-gateway/default/tasks/1.0?apikey=${config.apikey}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                });
                setTasks(tasksResponse.data);
            } catch (error) {
                setError('Failed to load data');
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, [ensureTokenIsValid]);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto p-8">
                <h2 className="text-3xl font-bold mb-6">Welcome, [User Name]</h2>
                {error && <p className="text-red-500">{error}</p>}
                <section className="mb-12">
                    <h3 className="text-2xl font-bold mb-4">Upcoming Events</h3>
                    <ul className="space-y-2">
                        {Array.isArray(events) ? events.map(event => (
                            <li key={event.EventID} className="bg-white p-4 rounded shadow-md">
                                <p className="text-xl font-semibold">{event.Title}</p>
                                <p>Date: {event.Date}</p>
                                <p>Location: {event.Location}</p>
                            </li>
                        )) : <p>No events available</p>}
                    </ul>
                </section>
                <section>
                    <h3 className="text-2xl font-bold mb-4">Your Tasks</h3>
                    <ul className="space-y-2">
                        {Array.isArray(tasks) ? tasks.map(task => (
                            <li key={task.TaskID} className="bg-white p-4 rounded shadow-md">
                                <p className="text-xl font-semibold">{task.Title}</p>
                                <p>Status: {task.Status}</p>
                            </li>
                        )) : <p>No tasks available</p>}
                    </ul>
                </section>
            </div>
        </div>
    );
}

export default Dashboard;
