import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient, { apimanUrl } from '../services/apiClient';
import EventCard from '../components/EventCard';
import TaskCard from '../components/TaskCard';

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
            const eventsResponse = await apiClient.get(apimanUrl(`/events/1.0/user/${userId}`));
            setEvents(eventsResponse.data);
        } catch (error) {
            console.error('Error fetching events', error);
            setEventError('Failed to fetch events');
        }
    }, [userId]);

    const fetchTasks = useCallback(async () => {
        try {
            const tasksResponse = await apiClient.get(apimanUrl(`/tasks/1.0/assignee/${userId}`));
            setTasks(tasksResponse.data);
        } catch (error) {
            console.error('Error fetching tasks', error);
            setTaskError('Failed to fetch tasks');
        }
    }, [userId]);

    const fetchUserName = useCallback(async () => {
        try {
            const userResponse = await apiClient.get(apimanUrl(`/users/1.0/${userId}`));
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

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto p-8">
                <div className="flex justify-between items-center mb-6">
                    {userName && <h1 className="text-3xl font-bold">Welcome, {userName}</h1>}
                    {userError && <p className="text-red-500">{userError}</p>}
                    <button onClick={() => navigate('/create-event')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Create Event
                    </button>
                </div>

                {eventError && <p className="text-red-500">{eventError}</p>}

                <section className="mb-12">
                    <h3 className="text-2xl font-bold mb-4">Upcoming Events</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.length > 0 ? (
                            events.map((event, index) => (
                                <EventCard key={event.id} event={event} index={index} onClick={() => navigate(`/events-details-page/${event.id}`)} />
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
                                <TaskCard key={task.id} task={task} index={index} onClick={() => navigate(`/task-details/${task.id}`)} />
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
