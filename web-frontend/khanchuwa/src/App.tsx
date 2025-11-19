// App.tsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './api/ProtectedRoutes'

// Layout
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'

// Pages
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import Features from './pages/Features/Features'
import SignIn from './pages/Auth/Login'
import Dashboard from './pages/dashboard/Dashboard'
import SignUp from './pages/Auth/SignUp'

const AppContent: React.FC = () => {
  const location = useLocation();

  const hiddenPaths = ['/signin'];
  const hideFooter = hiddenPaths.includes(location.pathname);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/features" element={<Features />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

    {/* Protected Routes */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!hideFooter && <Footer />}
    </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;
