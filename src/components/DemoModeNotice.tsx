import React from 'react'
import { AlertCircle } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext';

interface DemoModeNoticeProps {
  onDismiss: () => void;
}

export function DemoModeNotice({ onDismiss }: DemoModeNoticeProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 mb-8 backdrop-blur-sm">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <AlertCircle className="w-6 h-6 text-yellow-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-yellow-400 mb-2">{t.demoModeNoticeTitle}</h3>
          <div className="space-y-2 text-sm text-gray-300">
            <p>{t.demoModeNoticeDesc1}</p>
            <p>{t.demoModeNoticeDesc2}</p>
            <p>{t.demoModeNoticeDesc3}</p>
          </div>
        </div>
        <button
          onClick={onDismiss}
          className="text-gray-400 hover:text-white transition-colors px-3 py-1 bg-white/10 rounded-lg hover:bg-white/20"
        >
          {t.dismiss}
        </button>
      </div>
    </div>
  );
}
