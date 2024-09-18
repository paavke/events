import React from 'react';

const EventCard = ({ event, onClick }) => {
    return (
        <div
            className="p-4 bg-white rounded shadow-md cursor-pointer hover:bg-gray-100 transform hover:scale-105 transition-transform duration-200 ease-out"
            onClick={onClick}  // Make card clickable
        >
            <h3 className="text-xl font-bold">{event.name}</h3>
            <p>{event.description}</p>
        </div>
    );
};

export default EventCard;
