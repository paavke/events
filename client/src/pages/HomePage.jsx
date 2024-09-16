import React from 'react';
import { Link } from 'react-router-dom';


function HomePage() {
    return (
        <div>
            <div className="container mx-auto mt-16 px-4">
                <div className="text-center">
                    <h1 className="text-5xl font-extrabold text-gray-800 mb-8">
                        Welcome to the Event Management Platform
                    </h1>
                    <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
                        Our platform is designed to streamline event management, making it easier for you to organize, manage, and collaborate on events with efficiency and ease.
                    </p>
                    <p className="text-2xl text-gray-800 font-bold mb-4">
                        Key Features:
                    </p>
                    <ul className="list-disc list-inside text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                        <li>Interactive Dashboard: Centralize all your event management tasks.</li>
                        <li>Efficient Task Management: Simplify coordination among team members.</li>
                        <li>Integrated Scheduling: Streamline date selection and event planning.</li>
                        <li>Real-Time Communication: Enhance engagement between organizers and attendees.</li>
                    </ul>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        We are committed to helping you manage your events with the utmost efficiency. Explore our features and start organizing your events today!
                    </p>
                    <Link
                        to="/login"
                        className="inline-block bg-blue-500 text-white px-6 py-3 rounded-full font-semibold text-lg hover:bg-blue-600 transition-colors"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
