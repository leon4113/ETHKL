import { http, createConfig } from 'wagmi'
import { mainnet, base, scrollSepolia } from 'wagmi/chains' // Import scrollSepolia
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'

const projectId = 'a37743b17ea2878a673d4ea37671f149'

export const config = createConfig({
  chains: [scrollSepolia],  // Add scrollSepolia
  connectors: [
    // injected(),
    // walletConnect({ projectId }),
    // metaMask(),
    // safe(),
  ],
  transports: {
    [scrollSepolia.id]: http(), // Add transport for scrollSepolia
  },
})
