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
      backgroundColor: '#f5f5f5',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: '20px',
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
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      width: '100%',
      boxShadow: '0px 10px',
    },
    logo: {
      fontSize: '24px',
      fontWeight: 'bold',
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
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>Prevote</div>
      </header>
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
