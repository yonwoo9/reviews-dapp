import React from 'react'
import { MessageSquare, Plus } from 'lucide-react'
import { WalletConnectRainbow } from './WalletConnectRainbow';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
  onAddClick: () => void;
  walletAddress: string | null;
  onWalletChange: (address: string | null, provider?: any) => void;
}

export function Header({ onAddClick, walletAddress, onWalletChange }: HeaderProps) {
  const { t } = useLanguage();

  return (
    <header className="bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-white">{t.appTitle}</h1>
            <p className="text-sm text-gray-400">{t.appSubtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <LanguageSelector />
          <WalletConnectRainbow onWalletChange={onWalletChange} />
          
          <button
            onClick={onAddClick}
            disabled={!walletAddress}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-2 h-10 rounded-lg flex items-center gap-1.5 hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap overflow-hidden flex-shrink-0"
            style={{ minWidth: 'fit-content' }}
            title={!walletAddress ? t.connectWalletFirst : ''}
          >
            <Plus className="w-4 h-4 flex-shrink-0" />
            <span className="text-xs whitespace-nowrap">{t.addReview}</span>
          </button>
        </div>
      </div>
    </header>
  );
}