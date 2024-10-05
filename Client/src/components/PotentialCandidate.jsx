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
    pageContainer: {
      backgroundColor: '#fff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      maxWidth: '1200px',
      padding: '20px',
      boxSizing: 'border-box',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      width: '110%',
      boxShadow: '0px 10px',
    },
    logo: {
      fontSize: '24px',
      fontWeight: 'bold',
    },
    candidateCard: {
      backgroundColor: '#fff',
      padding: '20px',
      marginBottom: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      borderRadius: '5px',
      width: 'calc(33.33% - 14px)',
      minWidth: '430px',
      cursor: 'pointer',
    },
    candidatesContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      width: '100%',
      maxWidth: '1000px',
    },
    candidateRow: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      gap: '10px',
    },
    h1: {
      padding: '50px 30px 30px 0px',
      fontSize: '24px',
      fontWeight: 'bold'
    },
    button: {
      backgroundColor: '#4CAF50',
      border: 'none',
      color: 'white',
      padding: '15px 32px',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'inline-block',
      fontSize: '16px',
      margin: '20px 2px',
      cursor: 'pointer',
      borderRadius: '5px',
    },
  };

  // Helper function to chunk the candidates array into groups of 3
  const chunkArray = (arr, size) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.logo}>Prevote</div>
        </header>

        <h1 style={styles.h1}>POTENTIAL CANDIDATES</h1>

        <div style={styles.candidatesContainer}>
          {chunkArray(candidates, 3).map((row, rowIndex) => (
            <div key={rowIndex} style={styles.candidateRow}>
              {row.map((candidate, index) => (
                <div
                  key={index}
                  style={styles.candidateCard}
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
          ))}
        </div>

        <button 
          style={styles.button}
          onClick={() => navigate('/candidate-list')}
        >
          Candidates
        </button>
      </div>
    </div>
  );
}

export default PotentialCandidate;