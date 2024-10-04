import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CandidateDetail({ addCandidate }) {
  const [name, setName] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [vision, setVision] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !walletAddress || !vision || !image) {
      alert('Please fill out all fields');
      return;
    }

    const newCandidate = {
      name,
      walletAddress,
      vision,
      image: URL.createObjectURL(image), // Convert image file to a URL
    };

    // Add candidate to the list
    addCandidate(newCandidate);

    // Navigate to the CandidateList page
    navigate('/potential-candidate');
  };

  const handleReject = () => {
    // Navigate back to the homepage or any other appropriate page on rejection
    navigate('/');
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
    submitButton: {
      backgroundColor: '#333',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      cursor: 'pointer',
      width: '45%',
      fontSize: '16px',
    },
    rejectButton: {
      backgroundColor: 'red',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      cursor: 'pointer',
      width: '45%',
      fontSize: '16px',
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logo}>Prevote</div>
        <div style={styles.walletInfo}>0x1231231231231231231231231231312</div>
      </header>

      <div style={styles.formContainer}>
        <h1>Candidate Details</h1>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.formInput}
              placeholder="Enter candidate name"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Wallet Address</label>
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              style={styles.formInput}
              placeholder="Enter wallet address"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Upload Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              style={styles.formInput}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Vision & Mission</label>
            <textarea
              value={vision}
              onChange={(e) => setVision(e.target.value)}
              style={styles.formInput}
              placeholder="Enter candidate's vision and mission"
            ></textarea>
          </div>

          <div style={styles.buttonGroup}>
            <button type="button" onClick={handleReject} style={styles.rejectButton}>
              Reject
            </button>
            <button type="submit" style={styles.submitButton}>
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CandidateDetail;
