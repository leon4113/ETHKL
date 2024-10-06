import React from 'react';
import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';

// Define the API URL
const APIURL = 'https://api.studio.thegraph.com/query/90815/eth-final/v0.0.4';

// Create the Apollo Client
const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
});

// Define your GraphQL query
const VOTE_RESULTS_QUERY = gql`
  query {
    candidateAddeds(first: 5) {
      id
      candidateId
      name
    }
    voteCasteds(first: 100) {
      commitment
      rankedVotes
    }
  }
`;

const VotingResult = () => {
  const { loading, error, data } = useQuery(VOTE_RESULTS_QUERY, { client });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Process the vote data using Borda count
  const voteResults = {};
  if (data) {
    // Initialize vote count for each candidate
    data.candidateAddeds.forEach(candidate => {
      voteResults[candidate.candidateId] = 0;
    });

    // Count votes using Borda count
    data.voteCasteds.forEach(vote => {
      const totalCandidates = vote.rankedVotes.length;
      vote.rankedVotes.forEach((candidateId, index) => {
        if (voteResults.hasOwnProperty(candidateId)) {
          // Points are assigned in reverse order: last place gets 1 point, second-to-last gets 2 points, etc.
          voteResults[candidateId] += totalCandidates - index;
        }
      });
    });
  }

  // Sort candidates by total points
  const sortedCandidates = data.candidateAddeds
    .map(candidate => ({
      ...candidate,
      points: voteResults[candidate.candidateId]
    }))
    .sort((a, b) => b.points - a.points);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logo}>Prevote</div>
      </header>
      <h1 style={styles.title}>Voting Result</h1>
      <div style={styles.resultsContainer}>
        {sortedCandidates.map((candidate, index) => (
          <div key={candidate.id} style={styles.resultRow}>
            <div style={styles.imagePlaceholder}>
              {/* Image Placeholder */}
            </div>
            <div style={styles.name}>{candidate.name}</div>
            <div style={styles.points}>{candidate.points} points</div>
          </div>
        ))}
      </div>
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

const additionalStyles = {
  points: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
};

// Merge additionalStyles into existing styles
Object.assign(styles, additionalStyles);

export default VotingResult;
