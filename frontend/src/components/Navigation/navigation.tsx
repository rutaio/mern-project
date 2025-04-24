import './navigation.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export const Navigation = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  return (
    <nav className="navigation">
      <div className="navigation-container">
        <Link to="/" className="navigation-logo">
          <span>Todos App</span>
        </Link>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          {isAuthenticated ? (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button onClick={logout} className="logout-button">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="login-item">
                <Link to="/login">Prisijungti</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
