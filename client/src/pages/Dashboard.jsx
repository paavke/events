import React from 'react';

function Dashboard() {
    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="mt-8">
                <h2 className="text-2xl">Upcoming Events</h2>
                {/* Event list will go here */}
            </div>
            <div className="mt-8">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Create New Event</button>
            </div>
        </div>
    );
}
export default Dashboard;