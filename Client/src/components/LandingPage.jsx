import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage({ isConnected }) {
  const navigate = useNavigate();

  const handleButtonClick = (path) => {
    if (!isConnected) {
      alert('Please connect your wallet to proceed!'); // Prompt user to connect wallet
      return;
    }
    navigate(path); // Redirect if wallet is connected
  };

  const styles = {
    container: {
      backgroundColor: '#4c4ce9', // Main background color (blue)
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif',
    },
    mainBox: {
      backgroundColor: '#a095db', // Purple background for the main content
      padding: '30px',
      borderRadius: '15px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      width: '400px',
      marginTop: '100px',
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: 'black',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '15px',
      marginTop: '20px',
    },
    button: {
      backgroundColor: '#444',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      border: 'none',
    },
    adminButton: {
      backgroundColor: '#d3d3d3', // Grey for Admin button
      color: 'black',
    },
    userButton: {
      backgroundColor: '#635fc7', // Dark blue for User button
    },
    candidateButton: {
      backgroundColor: '#9e91ef', // Lighter blue for Candidate button
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.mainBox}>
        <h2 style={styles.title}>Revolutionizing Voting with</h2>
        <h1 style={{ ...styles.title, fontSize: '36px', color: 'black' }}>
          Prevote
        </h1>
        <p style={styles.subtitle}>
          Start a voting on our platform for decentralized, unbiased voting that
          ensures every candidate gets a chance to shine.
        </p>

        {/* Buttons */}
        <div style={styles.buttonContainer}>
          <button
            style={{ ...styles.button, ...styles.adminButton }}
            onClick={() => handleButtonClick('/potential-candidate')}
          >
            ADMIN
          </button>
          <button
            style={{ ...styles.button, ...styles.userButton }}
            onClick={() => handleButtonClick('/voting')}
          >
            USER
          </button>
          <button
            style={{ ...styles.button, ...styles.candidateButton }}
            onClick={() => handleButtonClick('/candidate-home')}
          >
            CANDIDATE
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
