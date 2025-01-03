import { http, cookieStorage, createConfig, createStorage } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

const projectId = "e067db921ed6238dcfa9aeb4536e2583";

export function getConfig() {
  return createConfig({
    chains: [mainnet, sepolia],
    connectors: [
      injected(),
      coinbaseWallet(),
      walletConnect({projectId}),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
    },
  })
}

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>
  }
}
