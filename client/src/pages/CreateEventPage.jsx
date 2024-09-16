import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config/config';

const CreateEventPage = () => {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [eventResponsible, setEventResponsible] = useState(''); // Assuming this holds the responsible user's ID
    const [participants, setParticipants] = useState([]);
    const [selectedParticipants, setSelectedParticipants] = useState([]);
    const [participantRole, setParticipantRole] = useState(''); // Add a state to store participant roles
    const navigate = useNavigate();

    useEffect(() => {
        fetchParticipants();
    }, []);

    const fetchParticipants = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const response = await axios.get(`${config.baseURL}/apiman-gateway/default/participants/1.0?apikey=${config.apikey}`, { headers });
            console.log("Participants API Response:", response.data);
            setParticipants(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Failed to fetch participants:", error);
            setParticipants([]); // Set to empty array if there's an error
        }
    };

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('accessToken');
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            // Create the event first
            const eventResponse = await axios.post(`${config.baseURL}/apiman-gateway/default/events/1.0?apikey=${config.apikey}`, {
                name: eventName,
                date: eventDate,
                location: location,
                description: description,
                userId: eventResponsible, // Set the responsible user
            }, { headers });

            const eventId = eventResponse.data.id;

            // Now add participants
            for (const participantId of selectedParticipants) {
                await axios.post(`${config.baseURL}/apiman-gateway/default/participants/1.0?apikey=${config.apikey}`, {
                    userId: participantId,
                    eventId: eventId,
                    role: participantRole, // Assign role to each participant
                }, { headers });
            }


            navigate('/dashboard');
        } catch (error) {
            console.error('Failed to create event or participants:', error);
            alert('Failed to create event');
        }
    };

    const handleParticipantChange = (e) => {
        const { options } = e.target;
        const selectedValues = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedValues.push(options[i].value);
            }
        }
        setSelectedParticipants(selectedValues);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-gray-800 mb-8">Create New Event</h2>
                <form onSubmit={handleCreateEvent} className="bg-white shadow-lg rounded-lg p-6">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventName">
                            Event Name
                        </label>
                        <input
                            id="eventName"
                            type="text"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter event name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventDate">
                            Event Date
                        </label>
                        <input
                            id="eventDate"
                            type="datetime-local"
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                            Location
                        </label>
                        <input
                            id="location"
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter event location"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Event Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter event description"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventResponsible">
                            Event Responsible
                        </label>
                        <input
                            id="eventResponsible"
                            type="text"
                            value={eventResponsible}
                            onChange={(e) => setEventResponsible(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter responsible person's ID"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="participants">
                            Participants
                        </label>
                        <select
                            id="participants"
                            multiple
                            value={selectedParticipants}
                            onChange={handleParticipantChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            {participants.map((participant) => (
                                <option key={participant.id} value={participant.id}>
                                    {participant.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="participantRole">
                            Participant Role
                        </label>
                        <input
                            id="participantRole"
                            type="text"
                            value={participantRole}
                            onChange={(e) => setParticipantRole(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter participant role"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Create Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateEventPage;
