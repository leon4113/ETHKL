import React from 'react';

const VotingResult = () => {
  const candidates = [
    { name: 'Name 1', votes: 25 },
    { name: 'Name 2', votes: 58 },
    { name: 'Name 3', votes: 16 },
  ];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logo}>Prevote</div>
      </header>
      <h1 style={styles.title}>Voting Result</h1>
      <div style={styles.resultsContainer}>
        {candidates.map((candidate, index) => (
          <div key={index} style={styles.resultRow}>
            <div style={styles.imagePlaceholder}>
              {/* Image Placeholder */}
            </div>
            <div style={styles.name}>{candidate.name}</div>
            <div style={styles.votes}>{candidate.votes}</div>
          </div>
        ))}
      </div>
      <button style={styles.button}>Button</button>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#F7F8FC',
    height: '100vh',
    padding: '20px',
    textAlign: 'center',
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
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    margin: '30px',
  },
  resultsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px',
  },
  resultRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
  },
  imagePlaceholder: {
    width: '50px',
    height: '50px',
    backgroundColor: '#E0E0E0',
    borderRadius: '4px',
    marginRight: '20px',
  },
  name: {
    fontSize: '18px',
    flex: 1,
    textAlign: 'left',
  },
  votes: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default VotingResult;
