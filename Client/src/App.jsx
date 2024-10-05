import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import CreateCandButton from './components/CreateCandButton';
import RegisterCandidate from './components/RegisterCandidate';
import CandidateList from './components/CandidateList';
import PotentialCandidate from './components/PotentialCandidate';
import CandidateDetail from './components/CandidateDetails';
import VotingPage from './components/VotingPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAccount, WagmiProvider } from 'wagmi';
import { config } from '../../config';
import { Account } from './components/account';
import { WalletOptions } from './components/wallet-options';
import LandingPage from './components/LandingPage';
import RegisterSuccess from './components/register-success';

const queryClient = new QueryClient();

function ConnectWallet({ setIsConnected }) {
  const { isConnected } = useAccount();

  // Call the setIsConnected function when isConnected changes
  React.useEffect(() => {
    setIsConnected(isConnected);
  }, [isConnected, setIsConnected]);

  if (isConnected) return <Account />;
  return <WalletOptions />;
}

function App() {
  const [candidates, setCandidates] = useState([]);
  const [isConnected, setIsConnected] = useState(false); // New state to track connection status

  // Function to add a candidate to the list
  const addCandidate = (candidate) => {
    setCandidates([...candidates, candidate]);
  };

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <ConnectWallet setIsConnected={setIsConnected} /> {/* Pass down the setter function */}
          <Routes>
            <Route path="/" element={<LandingPage isConnected={isConnected} />} /> {/* Pass isConnected as a prop */}
            <Route path="/candidate-home" element={<Homepage />} />
            <Route path="/create-candidate" element={<CreateCandButton />} />
            <Route path="/register-candidate" element={<RegisterCandidate addCandidate={addCandidate} />} />
            <Route path="/candidate-list" element={<CandidateList candidates={candidates} />} />
            <Route path="/potential-candidate" element={<PotentialCandidate candidates={candidates} />} />
            <Route path="/candidate-detail" element={<CandidateDetail candidates={candidates} />} />
            <Route path ="/register-success" element = {<RegisterSuccess candidates={candidates}/>}/>
            <Route path="/voting" element={<VotingPage candidates={candidates} />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
