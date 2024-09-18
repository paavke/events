import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import EventCard from '../components/EventCard';
import TaskCard from '../components/TaskCard';
import config from '../config/config.js';

const DashboardPage = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [userName, setUserName] = useState('');
    const [eventError, setEventError] = useState(null);
    const [taskError, setTaskError] = useState(null);
    const [userError, setUserError] = useState(null);


    useEffect(() => {
        if (userId) {
            localStorage.setItem('userId', userId);
        }
    }, [userId]);


    const fetchEvents = useCallback(async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const headers = { Authorization: `Bearer ${token}` };

            const eventsResponse = await axios.get(`${config.baseURL}/apiman-gateway/default/events/1.0/user/${userId}?apikey=${config.apikey}`, { headers });
            setEvents(eventsResponse.data);
        } catch (error) {
            console.error('Error fetching events', error);
            setEventError('Failed to fetch events');
        }
    }, [userId]);


    const fetchTasks = useCallback(async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const headers = { Authorization: `Bearer ${token}` };

            const tasksResponse = await axios.get(`${config.baseURL}/apiman-gateway/default/tasks/1.0/assignee/${userId}?apikey=${config.apikey}`, { headers });
            setTasks(tasksResponse.data);  // Set tasks data
        } catch (error) {
            console.error('Error fetching tasks', error);
            setTaskError('Failed to fetch tasks');  // Set task error if failed
        }
    }, [userId]);


    const fetchUserName = useCallback(async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const headers = { Authorization: `Bearer ${token}` };

            const userResponse = await axios.get(`${config.baseURL}/apiman-gateway/default/users/1.0/${userId}?apikey=${config.apikey}`, { headers });
            setUserName(userResponse.data.name);
        } catch (error) {
            console.error('Error fetching user info', error);
            setUserError('Failed to fetch user info');
        }
    }, [userId]);


    useEffect(() => {
        fetchEvents();
        fetchTasks();
        fetchUserName();
    }, [fetchEvents, fetchTasks, fetchUserName]);


    const handleCreateEvent = () => {
        navigate('/create-event');
    };


    const handleEventClick = (eventId) => {
        navigate(`/events-details-page/${eventId}`);
    };


    const handleTaskClick = (taskId) => {
        navigate(`/task-details/${taskId}`);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto p-8">

                <div className="flex justify-between items-center mb-6">

                    {userName && <h1 className="text-3xl font-bold">Welcome, {userName}</h1>}
                    {userError && <p className="text-red-500">{userError}</p>}


                    <button
                        onClick={handleCreateEvent}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Create Event
                    </button>
                </div>


                {eventError && <p className="text-red-500">{eventError}</p>}


                <section className="mb-12">
                    <h3 className="text-2xl font-bold mb-4">Upcoming Events</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.length > 0 ? (
                            events.map((event, index) => (
                                <EventCard
                                    key={event.id}
                                    event={event}
                                    index={index}
                                    onClick={() => handleEventClick(event.id)}
                                />
                            ))
                        ) : (
                            <p>No upcoming events.</p>
                        )}
                    </div>
                </section>


                {taskError && <p className="text-red-500">{taskError}</p>}


                <section>
                    <h3 className="text-2xl font-bold mb-4">Your Tasks</h3>
                    <div className="space-y-4">
                        {tasks.length > 0 ? (
                            tasks.map((task, index) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    index={index}
                                    onClick={() => handleTaskClick(task.id)}
                                />
                            ))
                        ) : (
                            <p>No tasks available.</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DashboardPage;
