/* eslint-disable no-unused-vars */
import React from 'react';
import voteImage from '../assets/vote.jpg';  // Correct path to the image

function Homepage() {
  const styles = {
    appContainer: {
      textAlign: 'center',
      backgroundColor: '#f5f5f5',
      height: '100vh',
      color: 'black',
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
    },
    logo: {
      fontSize: '24px',
      fontWeight: 'bold',
    },
    headerButtons: {
      display: 'flex',
      gap: '15px',
    },
    headerButton: {
      backgroundColor: '#f0f0f0',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    tryPollButton: {
      backgroundColor: '#ffeddf',
      border: '1px solid #f0c2a1',
    },
    clickHereButton: {
      backgroundColor: '#ff4444',
      color: 'white',
    },
    mainSection: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px',
      flexGrow: 1,
    },
    textSection: {
      flex: 1,
      paddingRight: '20px',
    },
    headline: {
      fontSize: '36px',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    description: {
      fontSize: '16px',
      color: '#666',
      marginBottom: '20px',
    },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px',
      marginBottom: '20px',
    },
    orText: {
      fontSize: '18px',
      color: '#666',
    },
    connectButton: {
      backgroundColor: '#007bff',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      border: 'none',
      fontSize: '16px',
    },
    worldcoinButton: {
      backgroundColor: '#333333',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      border: 'none',
      fontSize: '16px',
    },
    imageSection: {
      flex: 1,
    },
    votingImage: {
      width: '100%',
      borderRadius: '10px',
    },
  };

  return (
    <div style={styles.appContainer}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>Prevote</div>
        <div style={styles.headerButtons}>
          <button style={{ ...styles.headerButton, ...styles.tryPollButton }}>
            Try to make a poll
          </button>
          <button style={{ ...styles.headerButton, ...styles.clickHereButton }}>
            Click Here
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div style={styles.mainSection}>
        <div style={styles.textSection}>
          <h1 style={styles.headline}>
            Revolutionizing the traditional voting system
          </h1>
          <p style={styles.description}>
            One-person-one-vote doesn’t show how much someone cares about an issue. To vote, you need to connect your wallet.
          </p>
          <div style={styles.buttonGroup}>
            <button style={styles.worldcoinButton}>Login with Worldcoin</button>
          </div>
        </div>
        <div style={styles.imageSection}>
          <img
            src={voteImage}  // Use the corrected import
            alt="Ranked Choice Voting"
            style={styles.votingImage}
          />
        </div>
        
      </div>
    </div>
  );
}

export default Homepage;