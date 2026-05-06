// src/components/Navbar.jsx
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo / Brand */}
            <div className="flex items-center space-x-1">
              <span className="text-xl font-light text-gray-700 tracking-tight">CRM</span>
              <span className="text-xl font-light text-indigo-500">|</span>
              <span className="text-sm text-gray-400 hidden sm:inline">Lead Manager</span>
            </div>

            {/* Navigation Links */}
            <div className="flex space-x-1 sm:space-x-2">
              <Link
                to="/dashboard"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive('/dashboard')
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/leads"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive('/leads')
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Leads
              </Link>
            </div>

            {/* User & Logout */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <span className="text-sm text-gray-500 hidden sm:block">{user?.email}</span>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Navbar;