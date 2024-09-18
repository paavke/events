import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config/config';

const CreateEventPage = () => {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [responsibleUser, setResponsibleUser] = useState('');
    const [participants, setParticipants] = useState([{ userId: '', role: '' }]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

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

    const handleParticipantChange = (index, field, value) => {
        const updatedParticipants = [...participants];
        updatedParticipants[index][field] = value;
        setParticipants(updatedParticipants);
    };

    const addParticipant = () => {
        setParticipants([...participants, { userId: '', role: '' }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem('accessToken');
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        const eventData = {
            name: eventName,
            date: eventDate,
            location: location,
            description: description,
            userId: responsibleUser, // Responsible user ID
        };

        try {
            // First, create the event
            const eventResponse = await axios.post(`${config.baseURL}/apiman-gateway/default/events/1.0?apikey=${config.apikey}`, eventData, { headers });
            const createdEventId = eventResponse.data.id;  // Retrieve the created event's ID

            console.log("Event created with ID:", createdEventId);

            // Then, create the participants one by one
            for (let participant of participants) {
                const participantData = {
                    eventId: createdEventId,  // Link participant to the created event
                    userId: participant.userId,
                    role: participant.role,
                };

                console.log("Posting participant data:", participantData);  // Log the participant data before sending

                try {
                    const participantResponse = await axios.post(`${config.baseURL}/apiman-gateway/default/participants/1.0?apikey=${config.apikey}`, participantData, { headers });
                    console.log("Participant posted successfully:", participantResponse.data);
                } catch (participantError) {
                    console.error("Error posting participant:", participantError);
                }
            }

            alert("Event and participants created successfully");
            setLoading(false);
        } catch (error) {
            console.error("Error creating event or participants:", error);
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Event</h2>
                <form onSubmit={handleSubmit}>

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


                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter event description"
                        />
                    </div>


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


                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Participants</label>
                        {participants.map((participant, index) => (
                            <div key={index} className="flex space-x-4 mb-4">
                                <select
                                    value={participant.userId}
                                    onChange={(e) => handleParticipantChange(index, 'userId', e.target.value)}
                                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-1/2"
                                    required
                                >
                                    <option value="">Select Participant</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    placeholder="Enter role"
                                    value={participant.role}
                                    onChange={(e) => handleParticipantChange(index, 'role', e.target.value)}
                                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-1/2"
                                    required
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addParticipant}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Add Participant
                        </button>
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            {loading ? "Creating Event..." : "Create Event"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateEventPage;
