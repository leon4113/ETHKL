import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAccount, WagmiProvider } from 'wagmi';
import { config } from '../../config';

import Homepage from './components/Homepage';
import CreateCandButton from './components/CreateCandButton';
import RegisterCandidate from './components/RegisterCandidate';
import CandidateList from './components/CandidateList';
import PotentialCandidate from './components/PotentialCandidate';
import CandidateDetail from './components/CandidateDetails';
import VotingPage from './components/VotingPage';
import VotingResult from './components/VotingResult';
import { Account } from './components/account';
import { WalletOptions } from './components/wallet-options';
import LandingPage from './components/LandingPage';
import RegisterSuccess from './components/register-success';

const queryClient = new QueryClient();

function ConnectWallet({ setIsConnected, setWalletAddress }) {
  const { isConnected, address } = useAccount();

  React.useEffect(() => {
    setIsConnected(isConnected);
    if (isConnected && address) {
      setWalletAddress(address);
    }
  }, [isConnected, address, setIsConnected, setWalletAddress]);

  if (isConnected) return null;
  return <WalletOptions />;
}

function App() {
  const [candidates, setCandidates] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const addCandidate = (candidate) => {
    setCandidates([...candidates, candidate]);
  };

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <ConnectWallet setIsConnected={setIsConnected} setWalletAddress={setWalletAddress} />
          {isConnected && <Account />}
          <Routes>
            <Route path="/" element={<LandingPage isConnected={isConnected} walletAddress={walletAddress} />} />
            <Route path="/candidate-home" element={<Homepage isConnected={isConnected} walletAddress={walletAddress} />} />
            <Route path="/create-candidate" element={<CreateCandButton isConnected={isConnected} walletAddress={walletAddress} />} />
            <Route path="/register-candidate" element={<RegisterCandidate addCandidate={addCandidate} isConnected={isConnected} walletAddress={walletAddress} />} />
            <Route path="/candidate-list" element={<CandidateList candidates={candidates} isConnected={isConnected} walletAddress={walletAddress} />} />
            <Route path="/potential-candidate" element={<PotentialCandidate candidates ={candidates} isConnected={isConnected} walletAddress={walletAddress} />} />
            <Route path="/candidate-detail" element={<CandidateDetail candidates ={candidates} isConnected={isConnected} walletAddress={walletAddress} />} />
            <Route path="/voting" element={<VotingPage isConnected={isConnected} walletAddress={walletAddress} />} />
            <Route path="/register-success" element={<RegisterSuccess isConnected={isConnected} walletAddress={walletAddress} />} />
            <Route path="/voting-result" element={<VotingResult candidates={candidates} isConnected={isConnected} walletAddress={walletAddress} />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;