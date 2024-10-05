import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BaseError,useWaitForTransactionReceipt,useWriteContract } from 'wagmi'
import { abi } from '../../abi';

function CandidateDetail() {
  const { data: hash,error, isPending, writeContract } = useWriteContract()
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

  const handleAdd = async (e) => {
    e.preventDefault();
  
    try {
      // Retrieve the form data
      const formData = new FormData(e.target);
      const name = formData.get('name');
      const walletAddress = formData.get('walletAddress');
  
      // Await the writeContract function to ensure the transaction is complete
      const response = await writeContract({
        address: '0xCb68Dc49d69b9d4ED73cBA460F03468100e8B9dA',
        abi,
        functionName: 'addCandidate',
        args: [name, walletAddress],
      });
  
      // Check if the transaction was successful
      if (response && response.success) {
        // Delete from Candidates collection
        await axios.delete(`http://localhost:3001/candidates/${candidate._id}`);
        
        // Add to FixedCandidates collection
        const newCandidate = { name, walletAddress, vision: candidate.vision };
        await axios.post('http://localhost:3001/fixed-candidates/add-fixed-candidate', newCandidate);
  
        // Navigate to the candidate list only after successful transaction and operations
        navigate('/candidate-list');
      } else {
        // Handle the case where the transaction was not successful
        console.error('Transaction failed:', response.error);
        alert('Transaction failed. Please try again.');
      }
    } catch (error) {
      console.error('Error adding candidate to fixed list:', error);
      alert('An error occurred. Please check the console for more details.');
    }
  };
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

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
    formContainer: {
      backgroundColor: 'white',
      padding: '0px',
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
      backgroundColor: 'green',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      cursor: 'pointer',
      border: 'none',
      fontSize: '16px',
      width: '45%',
    },
    h1:{
      padding:'50px 30px 30px 0px',
      fontSize: '24px',
      fontWeight: 'bold'
    },
  };

  if (!candidate) {
    return <div>No candidate data available</div>;
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logo}>Prevote</div>
      </header>

      <h1 style={styles.h1}>Candidate Details</h1>

      <form onSubmit={handleAdd} style={styles.formContainer}>
        <img src={candidate.imagePath} alt={candidate.name} style={styles.image} />
        
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Name</label>
          <input 
            type="text" 
            name="name"
            value={candidate.name} 
            readOnly 
            style={styles.formInput}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Wallet Address</label>
          <input 
            type="text" 
            name="walletAddress"
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
          <button type="button" onClick={handleReject} style={styles.rejectButton}>
            Reject
          </button>
          <button disabled={isPending} type="submit" style={styles.addButton}>
            {isPending ? 'Confirming...' : 'Add'}
          </button>
          {hash && <div>Transaction Hash: {hash}</div>}
          {isConfirming && <div>Waiting for confirmation...</div>}
          {isConfirmed && <div>Transaction confirmed.</div>}
          {error && (
        <div>Error: {(error).shortMessage || error.message}</div>
      )}
        </div>
      </form>
    </div>
  );
}

export default CandidateDetail;
