// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthPage from './pages/AuthPage';
import AdminDashboard from './pages/AdminDashboard';
import EventDetailsPage from './pages/EventDetailsPage';
import EventPage from './pages/EventPage';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<EventPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/event-details/:id" element={<EventDetailsPage />} /> 
          <Route path="/events" element={<EventPage />} /> 
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
