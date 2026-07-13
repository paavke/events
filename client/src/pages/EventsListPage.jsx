import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient, { apimanUrl } from '../services/apiClient';

const EventsListPage = () => {
    const userId = localStorage.getItem('userId');
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [filterType, setFilterType] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await apiClient.get(apimanUrl(`/events/1.0/user/${userId}`));
                setEvents(response.data);
            } catch (err) {
                console.error('Failed to fetch events:', err);
                setError('Failed to fetch events');
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchEvents();
        } else {
            setError('User ID not found. Please log in again.');
            setLoading(false);
        }
    }, [userId]);

    const filteredEvents = events.filter((event) => {
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h2 className="text-3xl font-bold mb-6">Events List</h2>
                <input type="text" placeholder="Search by event name" className="border p-2 mb-4 w-full" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <div className="flex space-x-4 mb-4">
                    <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="border p-2">
                        <option value="">All Events</option>
                        <option value="past">Past Events</option>
                        <option value="future">Future Events</option>
                    </select>
                    <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="border p-2" />
                </div>
                <ul>
                    {filteredEvents.map((event) => (
                        <li key={event.id} className="mb-4 cursor-pointer hover:underline" onClick={() => navigate(`/events-details-page/${event.id}`)}>
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
