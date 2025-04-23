import { useContext } from 'react';
import './dashboard.css';
import { AuthContext } from '../../context/AuthContext';
import { TodoWrapper } from '../Todos/TodoWrapper';

export const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p className="welcome-text">Welcome back, {user?.name}!</p>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-card">
          <h3>Account Information</h3>
          <div className="account-info">
            <p>
              <strong>Name:</strong> {user?.name}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Role:</strong> {user?.role}
            </p>
          </div>
        </div>
        <div className="dashboard-card">
          <h3>Todos</h3>
          <div className="todo-info">
            <TodoWrapper />
          </div>
        </div>
      </div>
    </div>
  );
};
