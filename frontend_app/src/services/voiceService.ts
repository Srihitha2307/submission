/**
 * Voice Guidance Service Abstraction
 * Designed for future vernacular speech synthesis & audio prompt integration.
 */

export interface VoicePlaybackFeedback {
  status: 'pending_next_version' | 'playing' | 'unsupported';
  message: string;
}

export const voiceService = {
  /**
   * Triggers instructional voice guidance.
   * In future versions, this connects to Indian language TTS (e.g. Bhashini or on-device neural TTS).
   */
  playInstruction(instructionText: string, lang = 'hi'): VoicePlaybackFeedback {
    // Check if Web Speech API is present for an immediate accessible preview
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(instructionText);
        utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
        utterance.rate = 0.95;
        window.speechSynthesis.speak(utterance);
        return {
          status: 'playing',
          message: 'Playing audio guidance...'
        };
      } catch {
        // Fallback gracefully
      }
    }

    return {
      status: 'pending_next_version',
      message: 'Voice guidance will be connected in the next version.'
    };
  }
};
