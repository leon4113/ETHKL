
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogAction } from "@/components/ui/alert-dialog";
import { IDKitWidget, VerificationLevel } from '@worldcoin/idkit';
import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';
import { useWriteContract, useWaitForTransactionReceipt, } from 'wagmi'
import { abi } from '../../abi';
import axios from 'axios';
import { keccak256, toUtf8Bytes } from 'ethers';



// Define the API URL
const APIURL = 'https://api.studio.thegraph.com/query/90815/eth-final/v0.0.4';


// Create the Apollo Client
const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
});

// Define your GraphQL query
const CANDIDATES_QUERY = gql`
  query {
    candidateAddeds(first: 5) {
      id
      candidateId
      candidateAddress
      name
      visionMission
    }
  }
`;


const VotingPage = ({ walletAddress, disconnectWallet }) => {
  const { data: hash,isPending, writeContract } = useWriteContract()
  const navigate = useNavigate();
  const [rankings, setRankings] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  
  
  // Use the useQuery hook to fetch data
  const { loading, error, data } = useQuery(CANDIDATES_QUERY, { client });

  // React.useEffect(() => {
  //   if (walletAddress) {
  //     console.log('Navigating to /vote with address:', walletAddress); // Debug log
  //     navigate('/vote'); // Navigate once the wallet is connected
  //   }
  // }, [walletAddress, navigate]); // Dependency on walletAddress

  const handleCandidateClick = (id) => {
    setRankings(prevRankings => {
      const currentRank = prevRankings[id];
      if (currentRank) {
        const { [id]: _, ...rest } = prevRankings;
        return rest;
      } else {
        const newRank = Object.keys(prevRankings).length + 1;
        return { ...prevRankings, [id]: newRank };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(rankings).length > 0 && isVerified) {
      // Convert rankings to the required format
      const rankedVotes = Object.entries(rankings)
        .sort(([, rankA], [, rankB]) => rankA - rankB)
        .map(([candidateId]) => BigInt(candidateId));
        if (!walletAddress) {
          console.error('Wallet address is not available');
          // You might want to show an error message to the user here
          return;
        }
      // Hash the wallet address using keccak256
      const commitment = keccak256(toUtf8Bytes(walletAddress));

      // Call the smart contract
      writeContract({
        address: '0xf78fc0F251709F6FE8F0D350339CCbBDA50b4435',
        abi,
        functionName: 'submitVote',
        args: [
          rankedVotes,
          commitment, // Use the hashed wallet address as the commitment
        ],
      });
    }
  };
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  const verifyProof = async (proof) => {
    try {
      const response = await axios.post('http://localhost:3001/voting', proof, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        console.log('Verification successful:', response.data);
        return response.data.verified;
      } else {
        console.error('Verification failed:', response.data);
        return false;
      }
    } catch (error) {
      console.error('Error verifying proof:', error.message);
      return false;
    }
  };

  const onSuccess = () => {
    console.log("Worldcoin Verification Success!");
    setIsVerified(true);  // Update isVerified to true upon success
    handleConfirm();  // Proceed with vote confirmation after successful Worldcoin verification
  };

  const handleConfirm = (e) => {
    console.log('Confirmed rankings:', rankings);
    setShowConfirmation(false);
    setRankings({});
  };

  const handleReset = () => {
    setRankings({});
  };

  const handleDisconnect = () => {
    disconnectWallet();
    navigate('/');
  };

  return (
    <>
      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>

      {/* Header with Wallet Address and Disconnect Button */}
      <div className="bg-purple-500 w-full min-h-screen flex flex-col">
        <header className="bg-white p-4 flex justify-between items-center">
          <div className="flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span className="font-bold text-lg sm:text-xl">Prevote</span>
          </div>

          {/* Wallet Address and Disconnect Button */}
          <div className="flex items-center">
            {walletAddress && (
              <span className="mr-4 text-sm sm:text-base">
                Connected Wallet: <strong>{walletAddress}</strong>
              </span>
            )}
            <button className="text-blue-500 text-sm sm:text-base" onClick={handleDisconnect}>
              Disconnect Wallet
            </button>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-grow p-4 sm:p-6 md:p-8 flex flex-col justify-between">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-6">VOTE CANDIDATES</h1>
          
          {loading && <div className="text-white">Loading candidates...</div>}
          {error && <div className="text-red-500">Error occurred while fetching candidates: {error.message}</div>}
          
          {data && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {data.candidateAddeds.map((candidate) => (
                <div key={candidate.id} className="bg-white p-4 rounded-lg text-center">
                  <div className="w-full aspect-square bg-gray-200 mb-2"></div>
                  <h2 className="font-bold text-lg">{candidate.name}</h2>
                  <p className="text-sm text-gray-600 mb-2">Candidate ID: {candidate.candidateId}</p>
                  <button
                    className={`w-12 h-12 rounded-lg text-2xl ${
                      rankings[candidate.candidateId] ? 'bg-purple-500 text-white' : 'bg-gray-200'
                    }`}
                    onClick={() => handleCandidateClick(candidate.candidateId)}
                  >
                    {rankings[candidate.candidateId] || ''}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Worldcoin IDKit Widget */}
          <IDKitWidget
            app_id="app_0b73807a5c00a0829bc90c85ad7f8c72"
            action="anonymous-vote"
            verification_level={VerificationLevel.Device}
            handleVerify={verifyProof}
            onSuccess={onSuccess}
          >
            {({ open }) => (
              <button
                onClick={open}
                className="w-full bg-black text-white py-3 text-xl mb-5"
              >
                Verify with World ID
              </button>
            )}
          </IDKitWidget>

          {/* Submit Button */}
          <button
            className={`bg-green-500 text-white px-4 py-2 rounded-lg text-lg sm:text-xl ${
              !isVerified ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleSubmit}
            disabled={!isVerified}  // Disable if not verified
          >
            {isPending ? 'Confirming...' : 'Submit Vote'}
            {hash && <div>Transaction Hash: {hash}</div>}
            {isConfirming && <div>Waiting for confirmation...</div>}
            {isConfirmed && <div>Transaction confirmed.</div>}
          </button>
        </main>

        {/* Confirmation Dialog */}
        <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
          <AlertDialogContent className="max-w-full w-full h-full m-0 p-0 rounded-none">
            <div className="flex flex-col h-full">
              <AlertDialogHeader className="p-6 bg-purple-500 text-white">
                <AlertDialogTitle className="text-2xl sm:text-3xl font-bold">Confirm Your Vote</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogDescription className="flex-grow p-6 overflow-auto">
                <div className="text-lg sm:text-xl mb-6">
                  {Object.entries(rankings)
                    .sort(([, a], [, b]) => a - b)
                    .map(([id, rank]) => {
                      const candidate = data.candidateAddeds.find(c => c.candidateId === id);
                      return <p key={id} className="mb-2">{rank}. {candidate.name}</p>;
                    })}
                </div>
                <p className="text-base sm:text-lg">Check your votes and confirm your placement by clicking the button below</p>
              </AlertDialogDescription>
              <AlertDialogFooter className="p-6 bg-gray-100">
                <AlertDialogAction onClick={handleConfirm} className="w-full bg-green-500 text-white py-3 text-xl">
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default VotingPage;