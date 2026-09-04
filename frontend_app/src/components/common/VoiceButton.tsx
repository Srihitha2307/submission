import React from 'react';
import { Volume2 } from 'lucide-react';
import { useToast } from './Toast';

interface VoiceButtonProps {
  textToSpeak?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const VoiceButton: React.FC<VoiceButtonProps> = ({
  size = 'md',
  className = '',
}) => {
  const { showToast } = useToast();

  const handleVoiceTap = (e: React.MouseEvent) => {
    e.stopPropagation();
    showToast({
      message: 'Voice guidance will be connected in the next version.',
      type: 'info',
    });
  };

  const btnSizes = size === 'sm' ? 'p-1.5 w-7 h-7' : 'p-2 w-9 h-9';
  const iconSizes = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';

  return (
    <button
      id="voice-guidance-btn"
      type="button"
      onClick={handleVoiceTap}
      title="Voice guidance"
      aria-label="Voice guidance"
      className={`inline-flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white border border-white/30 transition-colors ${btnSizes} ${className}`}
    >
      <Volume2 className={iconSizes} />
    </button>
  );
};
