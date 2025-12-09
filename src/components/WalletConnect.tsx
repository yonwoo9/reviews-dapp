import React, { useState, useEffect } from 'react'
import { Wallet, LogOut, ChevronDown } from 'lucide-react'
import { shortenAddress, getBalance } from '../utils/web3'
import { WalletSelector } from './WalletSelector'

interface WalletConnectProps {
  onWalletChange: (address: string | null, provider?: any) => void
}

export function WalletConnect({ onWalletChange }: WalletConnectProps) {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState<string>('0.00')
  const [isLoadingBalance, setIsLoadingBalance] = useState(false)
  const [showSelector, setShowSelector] = useState(false)
  const [currentProvider, setCurrentProvider] = useState<any>(null)

  useEffect(() => {
    checkIfWalletIsConnected()

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('chainChanged', handleChainChanged)
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
        window.ethereum.on('chainChanged', handleChainChanged)
      }
    }
  }, [])

  useEffect(() => {
    if (walletAddress && currentProvider) {
      loadBalance()
    }
  }, [walletAddress, currentProvider])

  const checkIfWalletIsConnected = async () => {
    if (typeof window.ethereum === 'undefined') return

    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' })
      if (accounts.length > 0) {
        setWalletAddress(accounts[0])
        setCurrentProvider(window.ethereum)
        onWalletChange(accounts[0], window.ethereum)
      }
    } catch (error) {
      console.error('检查钱包连接状态失败:', error)
    }
  }

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      setWalletAddress(null)
      setBalance('0.00')
      setCurrentProvider(null)
      onWalletChange(null, null)
    } else {
      setWalletAddress(accounts[0])
      setCurrentProvider(window.ethereum)
      onWalletChange(accounts[0], window.ethereum)
    }
  }

  const handleChainChanged = () => {
    // 链切换时重新加载余额
    if (walletAddress) {
      loadBalance()
    }
  }

  const loadBalance = async () => {
    if (!walletAddress) return

    setIsLoadingBalance(true)
    try {
      const bal = await getBalance(walletAddress, currentProvider)
      setBalance(parseFloat(bal).toFixed(4))
    } catch (error) {
      console.error('加载余额失败:', error)
    } finally {
      setIsLoadingBalance(false)
    }
  }

  const handleConnect = (address: string, provider: any) => {
    setWalletAddress(address)
    setCurrentProvider(provider)
    onWalletChange(address, provider)
  }

  const handleDisconnect = () => {
    setWalletAddress(null)
    setBalance('0.00')
    setCurrentProvider(null)
    onWalletChange(null, null)
  }

  if (walletAddress) {
    return (
      <div className="flex items-center gap-3">
        <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-white font-medium">
              {shortenAddress(walletAddress)}
            </span>
          </div>
          <div className="h-4 w-px bg-white/20"></div>
          <div className="flex items-center gap-1">
            {isLoadingBalance ? (
              <div className="w-12 h-4 bg-white/10 rounded animate-pulse"></div>
            ) : (
              <span className="text-sm text-gray-300">
                {balance} ETH
              </span>
            )}
          </div>
        </div>
        <button
          onClick={handleDisconnect}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-gray-300 hover:text-white"
          title="断开连接"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    )
  }

  return (
    <>
      <button
        onClick={() => {
          console.log('点击连接钱包按钮，设置 showSelector 为 true')
          setShowSelector(true)
        }}
        className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/30"
      >
        <Wallet className="w-5 h-5" />
        连接钱包
        <ChevronDown className="w-4 h-4" />
      </button>

      <WalletSelector
        open={showSelector}
        onOpenChange={(open) => {
          console.log('WalletSelector onOpenChange:', open)
          setShowSelector(open)
        }}
        onConnect={handleConnect}
      />
    </>
  )
}
