import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CandidateList() {
  const [candidates, setCandidates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFixedCandidates = async () => {
      try {
        const response = await axios.get('http://localhost:3001/fixed-candidates');
        setCandidates(response.data);
      } catch (error) {
        console.error('Error fetching fixed candidates:', error);
      }
    };

    fetchFixedCandidates();
  }, []);

  const styles = {
    pageContainer: {
      backgroundColor: '#fff',
      minHeight: '100vh', // This ensures the container takes at least the full viewport height
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      maxWidth: '1200px', // Adjust this value based on your layout needs
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
      borderRadius: '5px',
      width: 'calc(33.33% - 14px)', // Subtracting the gap to ensure 3 cards fit
      minWidth: '430px', // Minimum width to ensure readability
    },
    candidatesContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      width: '100%',
      maxWidth: '1000px', // Adjust this value based on your layout needs
    },
    candidateRow: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      gap: '10px',
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
    h1:{
      padding:'50px 30px 30px 0px',
      fontSize: '24px',
      fontWeight: 'bold'
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

        <h1 style={styles.h1}>CANDIDATES</h1>

      <div style={styles.candidatesContainer}>
        {chunkArray(candidates, 3).map((row, rowIndex) => (
          <div key={rowIndex} style={styles.candidateRow}>
            {row.map((candidate, index) => (
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
        ))}
      </div>

      <div style={styles.footerContainer}>
        <div>
          <p>Candidate Count: {candidates.length}</p>
          <button
            style={styles.button}
            onClick={() => {
              if (candidates.length >= 3) {
                alert('Voting started');
              }
            }}
            disabled={candidates.length < 3}
          >
            {candidates.length < 3 ? 'Minimal 3 Candidate' : ' Vote '}
          </button>
        </div>

          {/* Notice box with the button to create more candidates */}
          <div style={styles.noticeBox}>
            <div style={styles.noticeText}>
              {candidates.length < 3
                ? 'You still cannot publish your vote. Create more candidates by pressing the button below.'
                : 'Now you can publish your vote. However, you can still add more candidates using the button below.'}
            </div>
            <button
              style={styles.noticeButton}
              onClick={() => navigate('/register-candidate')}
            >
              Create More Candidate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateList;
