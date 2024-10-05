import React from 'react';
import { useNavigate } from 'react-router-dom';

function PotentialCandidate({ candidates }) {
  const navigate = useNavigate();

  const styles = {
    container: {
        backgroundColor: '#f5f5f5',
        height: '100vh',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
      },
      header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 0px',
      },
      logo: {
        fontSize: '24px',
        fontWeight: 'bold', // This makes "Prevote" bold
      },
      walletInfo: {
        backgroundColor: '#d4e2f3',
        padding: '10px',
        borderRadius: '5px',
        fontSize: '14px',
        color: '#333',
        textAlign: 'center',
        width: '300px',
        border: '1px solid #ccc', // This adds a box around the wallet info
      },
    candidateCard: {
      backgroundColor: '#fff',
      padding: '20px',
      marginBottom: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      borderRadius: 'px',
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
        position: 'relative', // Allow it to be placed properly
      },
    noticeText: {
      marginBottom: '10px',
      color: '#333',
    },
  };

  return (
    <div style={styles.container}>
      

      <h1>POTENTIAL CANDIDATES</h1>

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
        

       
      </div>
    </div>
  );
}

export default PotentialCandidate;