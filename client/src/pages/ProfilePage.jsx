import React, { useState } from 'react';

const ProfilePage = () => {
    const [userData, setUserData] = useState({
        name: 'John Doe',
        email: 'johndoe@example.com',

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        // Make API call to update user profile
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={userData.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mt-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={userData.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mt-2"
                        />
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">Update Profile</button>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;