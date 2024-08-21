import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EventDetailPage = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        axios.get(`/api/events/${id}`).then(response => {
            setEvent(response.data);
        });
    }, [id]);

    if (!event) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{event.name}</h2>
                <p className="text-gray-600 mb-2">Date: {event.date}</p>
                <p className="text-gray-600 mb-2">Location: {event.location}</p>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <button className="bg-green-500 text-white px-4 py-2 rounded">Register</button>
            </div>
        </div>
    );
};

export default EventDetailPage;
