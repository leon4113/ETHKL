import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';


function CandidateDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { candidate } = location.state || {};

  const handleReject = async () => {
    try {
      await axios.delete(`http://localhost:3001/candidates/${candidate._id}`);
      navigate('/potential-candidate');
    } catch (error) {
      console.error('Error deleting candidate:', error);
    }
  };

  const handleAdd = async () => {
    try {
      // Delete from Candidates collection
      await axios.delete(`http://localhost:3001/candidates/${candidate._id}`);
      
      // Add to FixedCandidates collection
      await axios.post('http://localhost:3001/fixed-candidates/add-fixed-candidate', candidate);
      
      navigate('/candidate-list');
    } catch (error) {
      console.error('Error adding candidate to fixed list:', error);
    }
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
    formContainer: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      width: '600px',
      marginTop: '40px',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '15px',
    },
    formLabel: {
      fontSize: '14px',
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    formInput: {
      padding: '10px',
      fontSize: '14px',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '20px',
    },
    rejectButton: {
      backgroundColor: 'red',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      cursor: 'pointer',
      border: 'none',
      fontSize: '16px',
      width: '45%',
    },
    addButton: {
      backgroundColor: 'green', // Explicitly set to green
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      cursor: 'pointer',
      border: 'none',
      fontSize: '16px',
      width: '45%',
    },
  };

  if (!candidate) {
    return <div>No candidate data available</div>;
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logo}>Prevote</div>
        <div style={styles.walletInfo}>0x1231231231231231231231231231312</div>
      </header>

      <h1>Candidate Details</h1>

      <div style={styles.formContainer}>
        <img src={candidate.imagePath} alt={candidate.name} style={styles.image} />
        
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Name</label>
          <input 
            type="text" 
            value={candidate.name} 
            readOnly 
            style={styles.formInput}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Wallet Address</label>
          <input 
            type="text" 
            value={candidate.walletAddress} 
            readOnly 
            style={styles.formInput}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Vision & Mission</label>
          <textarea 
            value={candidate.vision} 
            readOnly 
            style={{...styles.formInput, height: '100px', resize: 'none'}}
          />
        </div>

        <div style={styles.buttonGroup}>
          <button onClick={handleReject} style={styles.rejectButton}>
            Reject
          </button>
          <button onClick={handleAdd} style={styles.addButton}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default CandidateDetail;
