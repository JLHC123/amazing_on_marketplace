import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './components/Auth/AuthContext';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import Dashboard from './components/Dashboard';
import Marketplace from './components/Marketplace/Marketplace';

const AppContent = () => {
  const { user, isLoading, signIn, signUp } = useAuth();
  const [currentView, setCurrentView] = useState('marketplace');

  useEffect(() => {
    // Check URL parameters for navigation
    const urlParams = new URLSearchParams(window.location.search);
    const view = urlParams.get('view');
    if (view === 'signin' || view === 'signup') {
      setCurrentView(view);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Always show marketplace for browsing
  if (currentView === 'marketplace') {
    return <Marketplace />;
  }

  // Show auth pages when needed
  if (!user) {
    const handleSignIn = (userData) => {
      signIn(userData);
      setCurrentView('marketplace'); // Redirect to marketplace after sign in
    };

    const handleSignUp = (userData) => {
      signUp(userData);
      setCurrentView('marketplace'); // Redirect to marketplace after sign up
    };

    const switchToSignUp = () => {
      setCurrentView('signup');
    };

    const switchToSignIn = () => {
      setCurrentView('signin');
    };

    return (
      <>
        {currentView === 'signin' ? (
          <SignIn 
            onSignIn={handleSignIn} 
            onSwitchToSignUp={switchToSignUp} 
          />
        ) : (
          <SignUp 
            onSignUp={handleSignUp} 
            onSwitchToSignIn={switchToSignIn} 
          />
        )}
      </>
    );
  }

  // Show dashboard for authenticated users
  if (currentView === 'dashboard') {
    return <Dashboard />;
  }

  // Default to marketplace
  return <Marketplace />;
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
