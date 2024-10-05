import React from 'react';
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName });
  const navigate = useNavigate(); // Initialize navigate

  const handleDisconnect = () => {
    disconnect(); // Disconnect the wallet
    navigate('/'); // Redirect to the landing page
  };

  return (
    <div>
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
      <button onClick={handleDisconnect}>Disconnect</button> {/* Use handleDisconnect */}
    </div>
  );
}
