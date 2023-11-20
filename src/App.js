import React from 'react';
// import UserRegForm from "./components/users/UserRegForm";
import NavigationBar from "./components/NavigationBar";
import ProtectedRoute from './routes/ProtectedRoutes'; //HOC for protected routes
import TripList from './components/itinerary/TripList';
import TripDetail from './components/itinerary/TripDetail';
//import Login from './components/Login'; // Your login component
import Login from './components/users/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  const isAuthenticated = true;

  return (
    <BrowserRouter>
      <NavigationBar isAuthenticated={isAuthenticated} /> {/* Include the NavigationBar */}
      <Routes>
        <Route 
          path="/" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <TripList />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/itinerary/:id" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <TripDetail />
            </ProtectedRoute>
          } 
        />
        <Route path="/login" element={<Login />} />
        {/* ... other routes */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
