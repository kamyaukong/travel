// /App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom';
import { AuthProvider } from './routers/Authentication';
import ProtectedRoute from './routers/ProtectedRoute';
import UserLogon from './components/users/UserLogon';
import UserRegForm from './components/users/UserRegForm';
import NavigationBar from "./components/NavigationBar";
import TripList from './components/itinerary/TripList';
import TripDetail from './components/itinerary/TripDetail';

const App = () => {

  return (
    <AuthProvider>
      <BrowserRouter>
        <NavigationBar />
          <Routes>
          <Route path="/" element={<Navigate to="/itinerary" />} />
          <Route path="/itinerary" element={
            <ProtectedRoute>
              <TripList />
            </ProtectedRoute>
          } />
          <Route path="/itinerary/:id" element={
            <ProtectedRoute>
              <TripDetail />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<UserLogon />} />
          <Route path="/signup" element={<UserRegForm />} />  
          {/* ... other routes */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
