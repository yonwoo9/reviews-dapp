import React, { useEffect } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useBalance } from 'wagmi'
import { LogOut } from 'lucide-react'

interface WalletConnectRainbowProps {
  onWalletChange: (address: string | null, provider?: any) => void
}

export function WalletConnectRainbow({ onWalletChange }: WalletConnectRainbowProps) {
  const { address, isConnected, connector } = useAccount()
  const { data: balance } = useBalance({
    address: address,
  })

  // 当连接状态变化时通知父组件
  useEffect(() => {
    if (isConnected && address) {
      onWalletChange(address, connector)
    } else {
      onWalletChange(null, null)
    }
  }, [isConnected, address, connector, onWalletChange])

  return (
    <div className="flex items-center gap-3">
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          // 注意：`authenticationStatus` 是异步的，所以需要检查加载状态
          const ready = mounted && authenticationStatus !== 'loading'
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus ||
              authenticationStatus === 'authenticated')

          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                style: {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button
                      onClick={openConnectModal}
                      type="button"
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 h-10 rounded-lg flex items-center gap-2 hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/30"
                    >
                      连接钱包
                    </button>
                  )
                }

                if (chain.unsupported) {
                  return (
                    <button
                      onClick={openChainModal}
                      type="button"
                      className="bg-red-500 text-white px-4 py-2 h-10 rounded-lg"
                    >
                      错误的网络
                    </button>
                  )
                }

                return (
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={openChainModal}
                      type="button"
                      className="bg-white/10 backdrop-blur-sm px-3 py-2 h-10 rounded-lg border border-white/20 flex items-center gap-2 hover:bg-white/20 transition-all whitespace-nowrap flex-shrink-0"
                      style={{ minWidth: 'fit-content' }}
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 12,
                            height: 12,
                            borderRadius: 999,
                            overflow: 'hidden',
                            marginRight: 0,
                          }}
                          className="flex-shrink-0"
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              style={{ width: 12, height: 12 }}
                            />
                          )}
                        </div>
                      )}
                      <span className="text-white text-sm whitespace-nowrap">{chain.name}</span>
                    </button>

                    <div className="bg-white/10 backdrop-blur-sm px-3 py-2 h-10 rounded-lg border border-white/20 flex items-center gap-2 whitespace-nowrap flex-shrink-0" style={{ minWidth: 'fit-content' }}>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
                        <span className="text-white font-medium text-sm whitespace-nowrap">
                          {account.displayName}
                        </span>
                      </div>
                      {balance && (
                        <>
                          <div className="h-4 w-px bg-white/20 flex-shrink-0"></div>
                          <span className="text-sm text-gray-300 whitespace-nowrap">
                            {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
                          </span>
                        </>
                      )}
                    </div>

                    <button
                      onClick={openAccountModal}
                      type="button"
                      className="p-2 h-10 w-10 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-gray-300 hover:text-white flex items-center justify-center flex-shrink-0"
                      title="账户详情"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                )
              })()}
            </div>
          )
        }}
      </ConnectButton.Custom>
    </div>
  )
}

