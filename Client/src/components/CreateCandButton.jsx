import React from 'react';
import { useNavigate } from 'react-router-dom';

function CreateCandButton() {
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
    },
    contentContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px 40px',
      marginTop: '80px',
    },
    errorText: {
      color: 'red',
      fontSize: '36px',
      fontWeight: 'bold',
      marginBottom: '10px',
      textAlign: 'center',
    },
    descriptionText: {
      fontSize: '16px',
      color: '#666',
      marginBottom: '20px',
      textAlign: 'center',
    },
    createButton: {
      backgroundColor: '#5b9dd5',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer',
      textAlign: 'center',
      width: '200px',
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>Prevote</div>
        <div style={styles.walletInfo}>0x1231231231231231231231231231312</div>
      </header>

      {/* Main Content */}
      <div style={styles.contentContainer}>
        <div style={styles.errorText}>NOT ALLOWED TO PUBLISH VOTE!</div>
        <div style={styles.descriptionText}>
          To publish vote, you need minimum 3 candidates to maximize the utility of preferential voting.
        </div>
        <button
          style={styles.createButton}
          onClick={() => navigate('/register-candidate')}
        >
          Create Candidate
        </button>
      </div>
    </div>
  );
}

export default CreateCandButton;
