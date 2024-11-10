// NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.message}>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" style={styles.homeLink}>Go back to Home</Link>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: 'white',
    color: 'green',
    textAlign: 'center',
    padding: '20px',
  },
  heading: {
    fontSize: '4rem',
    marginBottom: '20px',
  },
  message: {
    fontSize: '1.5rem',
    marginBottom: '20px',
  },
  homeLink: {
    fontSize: '1.25rem',
    color: 'white',
    backgroundColor: 'green',
    padding: '10px 20px',
    textDecoration: 'none',
    borderRadius: '5px',
  },
};

export default NotFound;
