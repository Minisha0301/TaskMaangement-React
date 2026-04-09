import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login");               
  };

  return (
    <div>
      <h1>Home Page</h1> 
      {token ? (
        <>
          <Link to="/dashboard">
            <button>Go to Dashboard</button>
          </Link> &nbsp;&nbsp;&nbsp;

          <button onClick={handleLogout}>Log Out</button>
        </>
      ) : (
        <Link to="/login">
          <button>Login</button>
        </Link>
      )}
    </div>
  );
};

export default Home;