import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function PotentialCandidate() {
  const navigate = useNavigate();

  const [candidates, setCandidates] = useState([]);


  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get('http://localhost:3001/candidates/potential-candidates');
        setCandidates(response.data);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };

    fetchCandidates();
  }, []);

  const handleCandidateClick = (candidate) => {
    navigate('/candidate-detail', { state: { candidate } });
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
    h1:{
      padding:'80px',
      fontSize: '24px',
      fontWeight: 'bold'
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
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>Prevote</div>
      </header>

      <h1 style={styles.h1}>POTENTIAL CANDIDATES</h1>

      <div style={styles.candidatesContainer}>
        {candidates.map((candidate, index) => (
          <div 
            key={index} 
            style={{...styles.candidateCard, cursor: 'pointer'}} 
            onClick={() => handleCandidateClick(candidate)}
          >
            <img src={candidate.imagePath} alt="Candidate" width="100" />
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