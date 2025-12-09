import React, { useState, useEffect } from 'react'
import { Wallet, Loader2, ExternalLink } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog'
import { detectWallets, connectWallet, type WalletInfo } from '../utils/web3'

interface WalletSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConnect: (address: string, provider: any) => void
}

export function WalletSelector({
  open,
  onOpenChange,
  onConnect,
}: WalletSelectorProps) {
  const [wallets, setWallets] = useState<WalletInfo[]>([])
  const [connecting, setConnecting] = useState<string | null>(null)

  useEffect(() => {
    console.log('WalletSelector open 状态变化:', open)
    if (open) {
      const detectedWallets = detectWallets()
      console.log('检测到的钱包:', detectedWallets)
      setWallets(detectedWallets)
    } else {
      setWallets([])
      setConnecting(null)
    }
  }, [open])

  const handleConnect = async (wallet: WalletInfo) => {
    console.log('点击钱包:', wallet)

    if (!wallet.isInstalled) {
      // 打开安装页面
      if (wallet.id === 'metamask-install') {
        window.open('https://metamask.io/download/', '_blank')
      } else if (wallet.id === 'coinbase-install') {
        window.open('https://www.coinbase.com/wallet', '_blank')
      }
      return
    }

    setConnecting(wallet.id)
    try {
      console.log('开始连接钱包:', wallet.id)
      const result = await connectWallet(wallet.id)
      console.log('连接结果:', result)
      if (result) {
        onConnect(result.address, result.provider)
        onOpenChange(false)
      } else {
        console.warn('连接返回 null')
      }
    } catch (error) {
      console.error('连接失败:', error)
      alert('连接钱包失败，请重试')
    } finally {
      setConnecting(null)
    }
  }

  const installedWallets = wallets.filter((w) => w.isInstalled)
  const uninstalledWallets = wallets.filter((w) => !w.isInstalled)

  console.log('WalletSelector 渲染，open:', open, 'wallets:', wallets.length)

  // 添加 DOM 检查
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        const dialog = document.querySelector('[data-slot="dialog-content"]')
        const overlay = document.querySelector('[data-slot="dialog-overlay"]')
        console.log('Dialog DOM 检查:', {
          dialog: dialog ? '存在' : '不存在',
          overlay: overlay ? '存在' : '不存在',
          dialogVisible: dialog
            ? window.getComputedStyle(dialog).display
            : 'N/A',
          dialogZIndex: dialog ? window.getComputedStyle(dialog).zIndex : 'N/A',
          dialogOpacity: dialog
            ? window.getComputedStyle(dialog).opacity
            : 'N/A',
          dialogTransform: dialog
            ? window.getComputedStyle(dialog).transform
            : 'N/A',
        })
        if (dialog) {
          console.log('Dialog 元素:', dialog)
          console.log('Dialog 类名:', dialog.className)
        }
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="!bg-slate-800 !border-slate-700 text-white max-w-md"
        onOpenAutoFocus={(e) => e.preventDefault()}
        style={{
          zIndex: 100,
          backgroundColor: '#1e293b',
          borderColor: '#475569',
        }}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Wallet className="w-6 h-6" />
            选择钱包
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            选择要连接的钱包以继续
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 mt-4">
          {installedWallets.length > 0 && (
            <>
              <h3 className="text-sm font-semibold text-gray-400 mb-2">
                已安装的钱包
              </h3>
              {installedWallets.map((wallet) => (
                <button
                  key={wallet.id}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleConnect(wallet)
                  }}
                  disabled={connecting !== null}
                  className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{wallet.icon}</span>
                    <div className="text-left">
                      <div className="font-semibold text-white">
                        {wallet.name}
                      </div>
                      <div className="text-xs text-gray-400">点击连接</div>
                    </div>
                  </div>
                  {connecting === wallet.id ? (
                    <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                  ) : (
                    <Wallet className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              ))}
            </>
          )}

          {uninstalledWallets.length > 0 && (
            <>
              <h3 className="text-sm font-semibold text-gray-400 mb-2 mt-4">
                未安装的钱包
              </h3>
              {uninstalledWallets.map((wallet) => (
                <button
                  key={wallet.id}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleConnect(wallet)
                  }}
                  className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all opacity-60 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{wallet.icon}</span>
                    <div className="text-left">
                      <div className="font-semibold text-white">
                        {wallet.name}
                      </div>
                      <div className="text-xs text-gray-400">点击安装</div>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400" />
                </button>
              ))}
            </>
          )}

          {wallets.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <p>未检测到可用的钱包</p>
              <p className="text-sm mt-2">请安装 MetaMask 或其他 Web3 钱包</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
