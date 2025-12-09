import React, { ReactNode } from 'react'
import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider as RKProvider } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from '../config/wagmi'

const queryClient = new QueryClient()

interface RainbowKitProviderProps {
  children: ReactNode
}

export function RainbowKitProvider({ children }: RainbowKitProviderProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RKProvider
          locale="zh-CN"
          modalSize="compact"
        >
          {children}
        </RKProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

