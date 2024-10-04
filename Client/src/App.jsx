/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import CreateCandButton from './components/CreateCandButton';
import RegisterCandidate from './components/RegisterCandidate';
import CandidateList from './components/CandidateList';
import PotentialCandidate from './components/PotentialCandidate';
import CandidateDetail from './components/CandidateDetails';
import VotingPage from './components/VotingPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAccount,WagmiProvider } from 'wagmi'
import { config } from '../../config';
import { Account } from './components/account';
import { WalletOptions } from './components/wallet-options';

const queryClient = new QueryClient()
function ConnectWallet() {
  const { isConnected } = useAccount()
  if (isConnected) return <Account />
  return <WalletOptions />
}

function App() {
  const [candidates, setCandidates] = useState([]);

  // Function to add a candidate to the list
  const addCandidate = (candidate) => {
    setCandidates([...candidates, candidate]);
  };

  return (
    <WagmiProvider config = {config}>
      <QueryClientProvider client={queryClient}>
      <ConnectWallet />
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/create-candidate" element={<CreateCandButton />} />
          <Route path="/register-candidate" element={<RegisterCandidate addCandidate={addCandidate} />} />
          <Route path="/candidate-list" element={<CandidateList candidates={candidates} />} />
          <Route path="/potential-candidate" element={<PotentialCandidate candidates={candidates} />} />
          <Route path="/candidate-detail" element={<CandidateDetail candidates={candidates} />} />
          <Route path="/voting" element={<VotingPage candidates={candidates} />} />
        </Routes>
      </Router>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;