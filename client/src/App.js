import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  //import { BrowserRouter, Route, Routes } from 'react-router-dom'; we renamed the first one, its the same
import NavBar from './pages/NavBar';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import EventCreationPage from './pages/EventCreationPage';
import EventDetailPage from './pages/EventDetailPage';
import ProfilePage from './pages/ProfilePage';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
      <Router>
        <NavBar />
        <div className="pt-16"> 
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-event" element={<EventCreationPage />} />
            <Route path="/event/:id" element={<EventDetailPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;


