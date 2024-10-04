import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterCandidate({ addCandidate }) {
  const [name, setName] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [vision, setVision] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('walletAddress', walletAddress);
    formData.append('vision', vision);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:3001/candidates/register-candidate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const newCandidate = response.data;
      addCandidate(newCandidate);
      navigate('/candidate-list');
    } catch (error) {
      console.error('Error submitting candidate:', error);
      // Handle error (e.g., show error message to user)
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
      boxShadow: '10px ',
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
    submitButton: { 
      backgroundColor: '#333',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      cursor: 'pointer',
      width: '100%',
      fontSize: '16px',
      marginTop: '20px',
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
  <div style={styles.logo}>Prevote</div>
  <div style={styles.walletInfo}>0x1231231231231231231231231231312</div>
</header>

      <div style={styles.formContainer}>
        <h1>CREATE CANDIDATE</h1>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={styles.formInput} />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Wallet Address</label>
            <input type="text" value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} style={styles.formInput} />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Upload Image</label>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} style={styles.formInput} />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Vision & Mission</label>
            <textarea value={vision} onChange={(e) => setVision(e.target.value)} style={styles.formInput}></textarea>
          </div>

          <button type="submit" style={styles.submitButton}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterCandidate;