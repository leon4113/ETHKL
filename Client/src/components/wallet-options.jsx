import * as React from 'react'
import { useConnect } from 'wagmi'

export function WalletOptions() {
  const { connectors, connect } = useConnect()

  return connectors.map((connector) => (
    <WalletOption
      key={connector.id}  // change this if necessary, uid -> id
      connector={connector}
      onClick={() => connect({ connector })}
    />
  ))
}

function WalletOption({ connector, onClick }) {
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    (async () => {
      const provider = await connector.getProvider()
      setReady(!!provider)
    })()
  }, [connector])

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    border: 'none',
    fontSize: '16px',
    // Add these additional styles for better UX
    opacity: ready ? 1 : 0.5,
    transition: 'opacity 0.3s ease',
    margin: '10px',
  }

  return (
    <button 
      disabled={!ready} 
      onClick={onClick} 
      style={buttonStyle}
    >
      {connector.name}
    </button>
  )
}
