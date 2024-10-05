import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogAction } from "@/components/ui/alert-dialog";
import { IDKitWidget, VerificationLevel } from '@worldcoin/idkit';

const candidates = [
  { id: 1, name: 'Ariel', description: 'Vision & Mission' },
  { id: 2, name: 'Nathan', description: 'Vision & Mission' },
  { id: 3, name: 'Leon', description: 'Vision & Mission' },
  { id: 4, name: 'Owen', description: 'Vision ^ Mission' }
];

const VotingPage = ({ walletAddress, disconnectWallet }) => {
  const navigate = useNavigate();
  const [rankings, setRankings] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isVerified, setIsVerified] = useState(false); // Add isVerified state

  React.useEffect(() => {
    if (walletAddress) {
      console.log('Navigating to /vote with address:', walletAddress); // Debug log
      navigate('/vote'); // Navigate once the wallet is connected
    }
  }, [walletAddress, navigate]); // Dependency on walletAddress

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

  const handleSubmit = () => {
    if (Object.keys(rankings).length > 0) {
      setShowConfirmation(true);
    }
  };

  const verifyProof = async (proof) => {
    try {
      const response = await fetch('http://localhost:3001/api/verifyProof', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ proof }),
      });
  
      const result = await response.json();
      
      if (result.success) {
        console.log("Verification successful");
        // Proceed with enabling vote submission
      } else {
        console.log("Verification failed:", result);
      }
    } catch (error) {
      console.error("Error during verification:", error);
    }
  };

  const onSuccess = () => {
    console.log("Worldcoin Verification Success!");
    setIsVerified(true);  // Update isVerified to true upon success
    handleConfirm();  // Proceed with vote confirmation after successful Worldcoin verification
  };

  const handleConfirm = () => {
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {candidates.map((candidate) => (
              <div key={candidate.id} className="bg-white p-4 rounded-lg text-center">
                <div className="w-full aspect-square bg-gray-200 mb-2"></div>
                <h2 className="font-bold text-lg">{candidate.name}</h2>
                <p className="text-sm text-gray-600 mb-2">{candidate.description}</p>
                <button
                  className={`w-12 h-12 rounded-lg text-2xl ${
                    rankings[candidate.id] ? 'bg-purple-500 text-white' : 'bg-gray-200'
                  }`}
                  onClick={() => handleCandidateClick(candidate.id)}
                >
                  {rankings[candidate.id] || ''}
                </button>
              </div>
            ))}
          </div>

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
            Submit Vote
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
                      const candidate = candidates.find(c => c.id === parseInt(id));
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