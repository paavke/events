import React, { useState, useEffect } from 'react';
import apiClient, { apimanUrl } from '../services/apiClient';

const CreateEventPage = () => {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [responsibleUser, setResponsibleUser] = useState('');
    const [participants, setParticipants] = useState([{ userId: '', role: '' }]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await apiClient.get(apimanUrl('/users/1.0'));
                setUsers(response.data);
            } catch (err) {
                console.error('Failed to fetch users:', err);
            }
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
        setError(null);

        const eventData = {
            name: eventName,
            date: eventDate,
            location,
            description,
            userId: responsibleUser,
        };

        try {
            const eventResponse = await apiClient.post(apimanUrl('/events/1.0'), eventData);
            const createdEventId = eventResponse.data.id;
            const failedParticipants = [];

            for (const participant of participants) {
                if (!participant.userId) continue;
                try {
                    await apiClient.post(apimanUrl('/participants/1.0'), {
                        eventId: createdEventId,
                        userId: participant.userId,
                        role: participant.role,
                    });
                } catch (participantError) {
                    console.error('Error posting participant:', participantError);
                    failedParticipants.push(participant.userId);
                }
            }

            if (failedParticipants.length > 0) {
                setError(`Event created, but failed to add ${failedParticipants.length} participant(s).`);
            } else {
                alert('Event and participants created successfully');
            }
        } catch (err) {
            console.error('Error creating event:', err);
            setError('Failed to create event');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Event</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Event Name</label>
                        <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Event Date</label>
                        <input type="datetime-local" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
                        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Event Responsible</label>
                        <select value={responsibleUser} onChange={(e) => setResponsibleUser(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required>
                            <option value="">Select Responsible User</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Participants</label>
                        {participants.map((participant, index) => (
                            <div key={index} className="flex space-x-4 mb-4">
                                <select value={participant.userId} onChange={(e) => handleParticipantChange(index, 'userId', e.target.value)} className="border rounded py-2 px-3 w-1/2" required>
                                    <option value="">Select Participant</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>{user.name}</option>
                                    ))}
                                </select>
                                <input type="text" placeholder="Enter role" value={participant.role} onChange={(e) => handleParticipantChange(index, 'role', e.target.value)} className="border rounded py-2 px-3 w-1/2" required />
                            </div>
                        ))}
                        <button type="button" onClick={addParticipant} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Add Participant</button>
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={loading}>
                        {loading ? 'Creating Event...' : 'Create Event'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateEventPage;
