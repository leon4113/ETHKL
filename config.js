import { http, createConfig } from 'wagmi'
import { base, mainnet, optimism } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'

const projectId = 'a37743b17ea2878a673d4ea37671f149'

export const config = createConfig({
  chains: [mainnet, base],
  connectors: [

  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
})