import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';

const Header = () => {
  const { currentUser, signout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signout();
      navigate('/signin');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <header className="bg-indigo-600 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-white">
              Expense Tracker
            </Link>
          </div>
          <nav>
            <ul className="flex items-center space-x-4">
              {currentUser ? (
                <>
                  <li>
                    <Link to="/" className="text-white hover:text-gray-800">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/add" className="text-white hover:text-gray-800">
                      Add Expense
                    </Link>
                  </li>
                  <li>
                    <Link to="/expenses" className="text-white hover:text-gray-800">
                      Expenses
                    </Link>
                  </li>
                  <li>
                    <Link to="/statistics" className="text-white hover:text-gray-800">
                      Statistics
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/signin" className="text-white hover:text-gray-800">
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup" className="text-white hover:text-gray-800">
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;