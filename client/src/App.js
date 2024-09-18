import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

// Import your components
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import DashboardPage from './pages/DashboardPage';
import NavBar from './pages/NavBar';

import CreateEventPage from './pages/CreateEventPage';
import EventsListPage from './pages/EventsListPage';
import EventsDetailsPage from './pages/EventsDetailsPage';

import TaskListPage from './pages/TaskListPage';  // Import Task List Page
import CreateTaskPage from './pages/CreateTaskPage';  // Import Create Task Page
import TaskDetailsPage from './pages/TaskDetailsPage';
import ProfileManagement from './pages/ProfileManagement';

function App() {
    const location = useLocation();  // Hook must be called inside Router

    // Paths where NavBar should be hidden
    const hideNavBarPaths = ["/", "/login"];

    return (
        <>
            {/* Conditionally render NavBar if the current path is not in hideNavBarPaths */}
            {!hideNavBarPaths.includes(location.pathname) && <NavBar />}

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/dashboard/:userId" element={<DashboardPage />} />

                {/* Event-related routes */}
                <Route path="/create-event" element={<CreateEventPage />} />
                <Route path="/events-list/:userId" element={<EventsListPage />} />
                <Route path="/events-details-page/:eventId" element={<EventsDetailsPage />} />

                {/* Task-related routes */}
                <Route path="/tasks" element={<TaskListPage />} />  {/* Task List Page */}
                <Route path="/create-task" element={<CreateTaskPage />} />  {/* Create Task Page */}
                <Route path="/task-details/:taskId" element={<TaskDetailsPage />} />
                <Route path="/profile" element={<ProfileManagement />} />
            </Routes>
        </>
    );
}

export default function WrappedApp() {
    return (
        <Router>
            <App />
        </Router>
    );
}
