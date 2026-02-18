import React from 'react';
import { useAuth } from './Auth/AuthContext';

const Dashboard = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    // Redirect to marketplace after sign out
    window.location.reload();
  };

  const goToMarketplace = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Amazing On</h1>
              <span className="ml-4 text-sm text-gray-500">Marketplace</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {user?.firstName} {user?.lastName}
              </span>
              <button
                onClick={handleSignOut}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              Welcome to Amazing On Marketplace!
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              You're successfully signed in. This is your personal dashboard where you can manage your account and marketplace activities.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer" onClick={goToMarketplace}>
                <div className="text-indigo-600 text-3xl mb-4">🛍️</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Browse Products</h3>
                <p className="text-gray-600">Discover amazing products from our marketplace</p>
                <button className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium text-sm">
                  Go to Marketplace →
                </button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-indigo-600 text-3xl mb-4">📦</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">My Orders</h3>
                <p className="text-gray-600">Track and manage your orders</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-indigo-600 text-3xl mb-4">⚙️</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Settings</h3>
                <p className="text-gray-600">Update your profile and preferences</p>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-indigo-50 rounded-lg">
              <p className="text-sm text-indigo-700">
                <strong>Account Info:</strong> {user?.email} | Member since: {new Date(user?.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
