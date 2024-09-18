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
    const [isEditing, setIsEditing] = useState(false);
    const [updatedEvent, setUpdatedEvent] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const headers = {
                    Authorization: `Bearer ${token}`,
                };

                const eventResponse = await axios.get(`${config.baseURL}/apiman-gateway/default/events/1.0/${eventId}?apikey=${config.apikey}`, { headers });
                setEvent(eventResponse.data);
                setUpdatedEvent(eventResponse.data);

                const participantsResponse = await axios.get(`${config.baseURL}/apiman-gateway/default/participants/1.0/event/${eventId}?apikey=${config.apikey}`, { headers });
                setParticipants(participantsResponse.data);

                setLoading(false);
            } catch (error) {
                setError('Failed to fetch event details');
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, [eventId]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            try {
                const token = localStorage.getItem('accessToken');
                const headers = {
                    Authorization: `Bearer ${token}`,
                };

                await axios.delete(`${config.baseURL}/apiman-gateway/default/events/1.0/${eventId}?apikey=${config.apikey}`, { headers });
                alert("Event deleted successfully.");
                navigate("/events-list");
            } catch (error) {
                console.error("Failed to delete event:", error);
                alert("Failed to delete event.");
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedEvent(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };

            await axios.put(`${config.baseURL}/apiman-gateway/default/events/1.0/${eventId}?apikey=${config.apikey}`, updatedEvent, { headers });
            alert("Event updated successfully.");
            setIsEditing(false);
            setEvent(updatedEvent);
        } catch (error) {
            console.error("Failed to update event:", error);
            alert("Failed to update event.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h2 className="text-3xl font-bold mb-6">Event Details</h2>


                {isEditing ? (
                    <>
                        <div className="mb-4">
                            <label><strong>Event Name:</strong></label>
                            <input
                                type="text"
                                name="name"
                                value={updatedEvent.name}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label><strong>Event Date:</strong></label>
                            <input
                                type="datetime-local"
                                name="date"
                                value={new Date(updatedEvent.date).toISOString().slice(0, 16)}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label><strong>Location:</strong></label>
                            <input
                                type="text"
                                name="location"
                                value={updatedEvent.location}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label><strong>Description:</strong></label>
                            <textarea
                                name="description"
                                value={updatedEvent.description}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <button onClick={handleSave} className="bg-green-500 text-white py-2 px-4 rounded">Save Changes</button>
                    </>
                ) : (
                    <>
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
                    </>
                )}

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


                {!isEditing ? (
                    <button onClick={handleEditToggle} className="bg-blue-500 text-white py-2 px-4 rounded">Edit Event</button>
                ) : (
                    <button onClick={handleEditToggle} className="bg-gray-500 text-white py-2 px-4 rounded">Cancel</button>
                )}

                <button onClick={handleDelete} className="ml-4 bg-red-500 text-white py-2 px-4 rounded">Delete Event</button>
            </div>
        </div>
    );
};

export default EventDetailsPage;
