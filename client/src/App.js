import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import DashboardPage from './pages/DashboardPage';
import NavBar from './pages/NavBar';
import CreateEventPage from './pages/CreateEventPage';
import EventsListPage from './pages/EventsListPage';
import EventsDetailsPage from './pages/EventsDetailsPage';
import TaskListPage from './pages/TaskListPage';
import CreateTaskPage from './pages/CreateTaskPage';
import TaskDetailsPage from './pages/TaskDetailsPage';
import ProfileManagement from './pages/ProfileManagement';

function App() {
    const location = useLocation();

    const hideNavBarPaths = ["/", "/login"];

    return (
        <>
            {!hideNavBarPaths.includes(location.pathname) && <NavBar />}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/dashboard/:userId" element={<DashboardPage />} />

                <Route path="/create-event" element={<CreateEventPage />} />
                <Route path="/events-list/:userId" element={<EventsListPage />} />
                <Route path="/events-details-page/:eventId" element={<EventsDetailsPage />} />

                <Route path="/tasks" element={<TaskListPage />} />
                <Route path="/create-task" element={<CreateTaskPage />} />
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
