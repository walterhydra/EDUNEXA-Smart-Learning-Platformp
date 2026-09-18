
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, userRole, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getDashboardLink = () => {
    if (userRole === 'mentor') {
      return '/mentor-dashboard';
    } else if (userRole === 'mentee') {
      return '/mentee-dashboard';
    }
    return '/';
  };

  const handleDashboardClick = () => {
    const dashboardPath = getDashboardLink();
    navigate(dashboardPath);
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-mentor-primary">
            Mentor<span className="text-mentor-secondary">Connect</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className={`text-gray-600 hover:text-mentor-primary ${location.pathname === '/' ? 'text-mentor-primary font-medium' : ''}`}>
            Home
          </Link>
          <Link to="/mentors" className={`text-gray-600 hover:text-mentor-primary ${location.pathname === '/mentors' ? 'text-mentor-primary font-medium' : ''}`}>
            Find Mentors
          </Link>
          <Link to="/about" className={`text-gray-600 hover:text-mentor-primary ${location.pathname === '/about' ? 'text-mentor-primary font-medium' : ''}`}>
            About
          </Link>
          <Link to="/faqs" className={`text-gray-600 hover:text-mentor-primary ${location.pathname === '/faqs' ? 'text-mentor-primary font-medium' : ''}`}>
            FAQs
          </Link>
          <Link to="/contact" className={`text-gray-600 hover:text-mentor-primary ${location.pathname === '/contact' ? 'text-mentor-primary font-medium' : ''}`}>
            Contact
          </Link>
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={handleDashboardClick}>
                <User className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button variant="ghost" onClick={() => signOut()}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Button variant="outline" asChild>
                <Link to="/auth/login">Log In</Link>
              </Button>
              <Button asChild>
                <Link to="/auth/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-600 focus:outline-none"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-lg">
          <nav className="flex flex-col space-y-4">
            <Link
              to="/"
              className={`text-gray-600 hover:text-mentor-primary py-2 ${location.pathname === '/' ? 'text-mentor-primary font-medium' : ''}`}
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/mentors"
              className={`text-gray-600 hover:text-mentor-primary py-2 ${location.pathname === '/mentors' ? 'text-mentor-primary font-medium' : ''}`}
              onClick={toggleMenu}
            >
              Find Mentors
            </Link>
            <Link
              to="/about"
              className={`text-gray-600 hover:text-mentor-primary py-2 ${location.pathname === '/about' ? 'text-mentor-primary font-medium' : ''}`}
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              to="/faqs"
              className={`text-gray-600 hover:text-mentor-primary py-2 ${location.pathname === '/faqs' ? 'text-mentor-primary font-medium' : ''}`}
              onClick={toggleMenu}
            >
              FAQs
            </Link>
            <Link
              to="/contact"
              className={`text-gray-600 hover:text-mentor-primary py-2 ${location.pathname === '/contact' ? 'text-mentor-primary font-medium' : ''}`}
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
              {user ? (
                <>
                  <Button variant="outline" className="w-full" onClick={handleDashboardClick}>
                    <User className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                  <Button variant="ghost" className="w-full" onClick={() => { signOut(); toggleMenu(); }}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/auth/login" onClick={toggleMenu}>
                      Log In
                    </Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link to="/auth/signup" onClick={toggleMenu}>
                      Sign Up
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
