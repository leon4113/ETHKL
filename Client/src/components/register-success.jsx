import React from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterSuccess({ candidates }) {
  const navigate = useNavigate();

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
    walletInfo: {
      backgroundColor: '#d4e2f3',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '14px',
      color: '#333',
      textAlign: 'center',
      width: '300px',
      border: '1px solid #ccc',
    },
    candidateCard: {
      backgroundColor: '#fff',
      padding: '20px',
      marginBottom: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      borderRadius: '5px',
      width: '300px',
    },
    candidatesContainer: {
      display: 'flex',
      flexDirection: 'row',
      gap: '20px',
    },
    button: {
      backgroundColor: candidates.length >= 3 ? 'green' : 'red',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      cursor: candidates.length >= 3 ? 'pointer' : 'not-allowed',
      border: 'none',
      marginRight: '10px',
    },
    noticeButton: {
      backgroundColor: '#333',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      cursor: 'pointer',
      border: 'none',
      marginTop: '20px',
    },
    footerContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '30px',
    },
    noticeBox: {
      backgroundColor: '#f8f9fa',
      padding: '15px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      maxWidth: '300px',
      position: 'relative',
    },
    noticeText: {
      marginBottom: '10px',
      color: '#333',
    },
    successText: {
      fontSize: '36px', // Increased font size
      fontWeight: 'bold', // Made the text bold
      color: '#4c4ce9', // Changed color to match the theme
      textAlign: 'center',
      marginBottom: '30px', // Added margin for spacing
      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)', // Added text shadow for depth
      padding:'50px 30px 30px 0px'
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>Prevote</div>
      </header>
      <h1 style={styles.successText}>YOU ARE SUCCESSFULLY REGISTERED AS CANDIDATES</h1> {/* Updated style applied here */}

      <div style={styles.candidatesContainer}>
        {candidates.map((candidate, index) => (
          <div key={index} style={styles.candidateCard}>
            <img src={candidate.image} alt="Candidate" width="100" />
            <div>
              <strong>{candidate.name}</strong>
              <p>Wallet Address: {candidate.walletAddress}</p>
              <p>Vision & Mission: {candidate.vision}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.footerContainer}>
        {/* Add footer content here if needed */}
      </div>
    </div>
  );
}

export default RegisterSuccess;
