import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config/config';

const CreateEventPage = () => {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [responsibleUser, setResponsibleUser] = useState('');
    const [participants, setParticipants] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch all users to be listed in dropdowns
        const fetchUsers = async () => {
            const token = localStorage.getItem('accessToken');
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const response = await axios.get(`${config.baseURL}/apiman-gateway/default/users/1.0?apikey=${config.apikey}`, { headers });
            setUsers(response.data);
        };
        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('accessToken');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        const eventData = {
            name: eventName,
            date: eventDate,
            location: location,
            description: description,
            userId: responsibleUser, // Responsible user ID
            participants: participants // Array of participant IDs
        };
        console.log(eventData); // Log the payload before sending it

        try {
            await axios.post(`${config.baseURL}/apiman-gateway/default/events/1.0?apikey=${config.apikey}`, eventData, { headers });
            alert("Event created successfully!");
        } catch (error) {
            console.error("Error creating event:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Event</h2>
                <form onSubmit={handleSubmit}>
                    {/* Event Name */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Event Name</label>
                        <input
                            type="text"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter event name"
                            required
                        />
                    </div>

                    {/* Event Date */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Event Date</label>
                        <input
                            type="datetime-local"
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>

                    {/* Location */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter event location"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter event description"
                        />
                    </div>

                    {/* Responsible User */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Event Responsible</label>
                        <select
                            value={responsibleUser}
                            onChange={(e) => setResponsibleUser(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        >
                            <option value="">Select Responsible User</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Participants */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Participants</label>
                        <select
                            multiple
                            value={participants}
                            onChange={(e) => setParticipants([...e.target.selectedOptions].map(option => option.value))}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                            required
                        >
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Submit Button */}
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
