import React from 'react';

const TaskCard = ({ task, onClick }) => {
    return (
        <div
            className="p-4 bg-white rounded shadow-md cursor-pointer hover:bg-gray-100 transform hover:scale-105 transition-transform duration-200 ease-out"
            onClick={onClick}
        >
            <h3 className="text-xl font-bold">{task.name}</h3>
            <p>{task.description}</p>
        </div>
    );
};

export default TaskCard;
