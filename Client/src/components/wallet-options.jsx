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

  return (
    <button disabled={!ready} onClick={onClick}>
      {connector.name}
    </button>
  )
}
