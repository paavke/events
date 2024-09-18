import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config/config';

const EventsListPage = () => {
    const userId = localStorage.getItem('userId');
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [filterType, setFilterType] = useState('');
    const navigate = useNavigate();

    // fetch events to display as list to choose from
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const headers = {
                    Authorization: `Bearer ${token}`,
                };

                const response = await axios.get(`${config.baseURL}/apiman-gateway/default/events/1.0/user/${userId}?apikey=${config.apikey}`, { headers });
                setEvents(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch events:', error);
                setError('Failed to fetch events');
                setLoading(false);
            }
        };

        if (userId) {
            fetchEvents();
        } else {
            setError("User ID not found in localStorage.");
            setLoading(false);
        }
    }, [userId]);

    // add filter and search for easier access

    const filteredEvents = events.filter(event => {

        const nameMatch = event.name.toLowerCase().includes(searchTerm.toLowerCase());

        const currentDate = new Date();
        let dateMatch = true;
        if (filterType === 'future') {
            dateMatch = new Date(event.date) > currentDate;
        } else if (filterType === 'past') {
            dateMatch = new Date(event.date) < currentDate;
        } else if (filterDate) {
            dateMatch = new Date(event.date).toISOString().split('T')[0] === filterDate;
        }

        return nameMatch && dateMatch;
    });

    const handleEventClick = (eventId) => {
        navigate(`/events-details-page/${eventId}`);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h2 className="text-3xl font-bold mb-6">Events List</h2>

                <input
                    type="text"
                    placeholder="Search by event name"
                    className="border p-2 mb-4 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className="flex space-x-4 mb-4">
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="border p-2"
                    >
                        <option value="">All Events</option>
                        <option value="past">Past Events</option>
                        <option value="future">Future Events</option>
                    </select>

                    <input
                        type="date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        className="border p-2"
                    />
                </div>

                <ul>
                    {filteredEvents.map((event) => (
                        <li
                            key={event.id}
                            className="mb-4 cursor-pointer hover:underline"
                            onClick={() => handleEventClick(event.id)}
                        >
                            <strong>{event.name}</strong>
                            <p>{event.description}</p>
                            <p>{new Date(event.date).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default EventsListPage;
