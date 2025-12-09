import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { sepolia, mainnet, polygon, bsc } from 'wagmi/chains'

export const config = getDefaultConfig({
  appName: 'Reviews DApp',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID', // 可选，用于 WalletConnect
  chains: [sepolia, mainnet, polygon, bsc],
  ssr: false, // 如果使用 SSR，设置为 true
})

