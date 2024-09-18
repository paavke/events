import React from 'react';
import { Link } from 'react-router-dom';
import { FaClipboardList, FaTasks, FaCalendarAlt, FaComments } from 'react-icons/fa';

function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <div className="container mx-auto py-16 px-4">
                {/* Welcome Section */}
                <div className="text-center mb-16">
                    <h1 className="text-6xl font-extrabold mb-4 tracking-wide drop-shadow-lg">
                        Welcome to the Event Management Platform
                    </h1>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Streamline event management, organize, and collaborate on events with efficiency and ease.
                    </p>
                    <Link
                        to="/login"
                        className="inline-block bg-white text-blue-600 px-6 py-3 rounded-full font-semibold text-lg hover:bg-blue-100 transition-colors shadow-lg"
                    >
                        Get Started
                    </Link>
                </div>


                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-12">Key Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                        <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                            <FaClipboardList className="text-6xl text-blue-500 mb-4 mx-auto" />
                            <h3 className="text-2xl font-semibold mb-2">Interactive Dashboard</h3>
                            <p className="text-md">
                                Centralize all your event management tasks in one place for easy access.
                            </p>
                        </div>


                        <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                            <FaTasks className="text-6xl text-purple-500 mb-4 mx-auto" />
                            <h3 className="text-2xl font-semibold mb-2">Efficient Task Management</h3>
                            <p className="text-md">
                                Simplify coordination among team members with organized task lists.
                            </p>
                        </div>


                        <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                            <FaCalendarAlt className="text-6xl text-green-500 mb-4 mx-auto" />
                            <h3 className="text-2xl font-semibold mb-2">Integrated Scheduling</h3>
                            <p className="text-md">
                                Streamline date selection and event planning with integrated scheduling tools.
                            </p>
                        </div>


                        <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                            <FaComments className="text-6xl text-yellow-500 mb-4 mx-auto" />
                            <h3 className="text-2xl font-semibold mb-2">Real-Time Communication</h3>
                            <p className="text-md">
                                Enhance engagement between organizers and attendees with real-time messaging.
                            </p>
                        </div>
                    </div>
                </div>


                <div className="text-center mt-16">
                    <Link
                        to="/login"
                        className="inline-block bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-xl hover:bg-purple-100 transition-colors shadow-lg"
                    >
                        Start Managing Your Events
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
