import React, { useState } from 'react';
import axios from 'axios';

const EventCreationPage = () => {
    const [eventData, setEventData] = useState({
        name: '',
        date: '',
        location: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData({ ...eventData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/events', eventData).then(response => {
            console.log('Event created:', response.data);
        });
    };

    return (
        <div className="create-event-page">
            <h2>Create New Event</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Event Name"
                    onChange={handleChange}
                    value={eventData.name}
                />
                <input
                    type="date"
                    name="date"
                    onChange={handleChange}
                    value={eventData.date}
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    onChange={handleChange}
                    value={eventData.location}
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                    value={eventData.description}
                />
                <button type="submit">Create Event</button>
            </form>
        </div>
    );
};

export default EventCreationPage;