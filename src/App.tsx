import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import BeneficiaryDashboard from './pages/BeneficiaryDashboard';
import NGODashboard from './pages/NGODashboard';
import DonorDashboard from './pages/DonorDashboard';
import RequestAid from './pages/RequestAid';
import ViewRequests from './pages/ViewRequests';
import DonationTracker from './pages/DonationTracker';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/beneficiary" element={<BeneficiaryDashboard />} />
            <Route path="/ngo" element={<NGODashboard />} />
            <Route path="/donor" element={<DonorDashboard />} />
            <Route path="/request-aid" element={<RequestAid />} />
            <Route path="/view-requests" element={<ViewRequests />} />
            <Route path="/donations/:id" element={<DonationTracker />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;