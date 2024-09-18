import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import config from '../config/config';

const EventDetailsPage = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [participants, setParticipants] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const headers = {
                    Authorization: `Bearer ${token}`,
                };

                const response = await axios.get(`${config.baseURL}/apiman-gateway/default/events/1.0/${eventId}?apikey=${config.apikey}`, { headers });
                setEvent(response.data);

                // Fetch participants with their names and roles
                if (response.data.participants) {
                    const participantIds = response.data.participants.map(p => p.userId);
                    const usersResponse = await axios.get(`${config.baseURL}/apiman-gateway/default/users/1.0?userIds=${participantIds.join(',')}&apikey=${config.apikey}`, { headers });
                    const participantsWithNames = response.data.participants
                        .map(participant => {
                            const user = usersResponse.data.find(u => u.id === participant.userId);
                            // Only include participants if the user exists (no "Unknown")
                            return user ? { ...participant, name: user.name } : null;
                        })
                        .filter(Boolean); // Remove any null values (participants without valid users)
                    setParticipants(participantsWithNames);
                }

                setLoading(false);
            } catch (error) {
                setError('Failed to fetch event details');
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, [eventId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h2 className="text-3xl font-bold mb-6">Event Details</h2>
                <div className="mb-4">
                    <strong>Event Name:</strong> {event.name}
                </div>
                <div className="mb-4">
                    <strong>Event Date:</strong> {new Date(event.date).toLocaleDateString()}
                </div>
                <div className="mb-4">
                    <strong>Location:</strong> {event.location}
                </div>
                <div className="mb-4">
                    <strong>Description:</strong> {event.description}
                </div>
                <div className="mb-4">
                    <strong>Participants:</strong>
                    <ul>
                        {participants.length > 0 ? (
                            participants.map((participant, index) => (
                                <li key={index}>
                                    {participant.name} ({participant.role})
                                </li>
                            ))
                        ) : (
                            <li>No participants available</li>
                        )}
                    </ul>
                </div>
                <button onClick={() => navigate(`/events/edit/${event.id}`)} className="bg-blue-500 text-white py-2 px-4 rounded">Edit Event</button>
                <button onClick={() => navigate(`/events/delete/${event.id}`)} className="ml-4 bg-red-500 text-white py-2 px-4 rounded">Delete Event</button>
            </div>
        </div>
    );
};

export default EventDetailsPage;
