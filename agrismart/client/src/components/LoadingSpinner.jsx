import { Sprout } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

export default function LoadingSpinner({ message }) {
  const { t } = useLang();
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-2 border-green-800 border-t-green-400 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Sprout size={20} className="text-green-400 animate-pulse" />
        </div>
      </div>
      <p className="text-green-300/70 text-sm animate-pulse">{message || t('loading')}</p>
    </div>
  );
}
