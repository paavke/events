import React from 'react';

function HomePage() {
    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-4xl font-bold text-center">Welcome to Event Management Platform</h1>
            <p className="text-center mt-4">Manage your events with ease and efficiency.</p>
            <div className="flex justify-center mt-8">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
                <button className="ml-4 bg-green-500 text-white px-4 py-2 rounded">Signup</button>
            </div>
        </div>
    );
}

export default HomePage;