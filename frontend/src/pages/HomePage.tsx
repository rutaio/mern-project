import { Register } from '../components/Register/Register';
import './homepage.css';

export const HomePage = () => {
  return (
    <>
      <div className="hero">
        <h1>Todo Dashboard</h1>
        <p>Let's get things done with this simple app</p>
      </div>
      <Register />
    </>
  );
};
