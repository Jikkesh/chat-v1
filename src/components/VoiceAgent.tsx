import React, { useState, useEffect } from 'react';
import { Mic, X, MicOff } from 'lucide-react';
import { ViewMode } from '../App';

interface VoiceAgentProps {
  viewMode: ViewMode;
  onBack: () => void;
}

const VoiceAgent: React.FC<VoiceAgentProps> = ({ viewMode, onBack }) => {
  const [isListening, setIsListening] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Central Orb */}
      <div className="relative z-10 mb-16">
        <div 
          className={`w-48 h-48 rounded-full relative overflow-hidden transition-all duration-1000 ${
            isListening ? 'scale-110' : 'scale-100'
          }`}
          style={{
            background: `conic-gradient(from ${animationPhase}deg, 
              #60a5fa 0deg, 
              #a78bfa 72deg, 
              #f472b6 144deg, 
              #fb7185 216deg, 
              #fbbf24 288deg, 
              #60a5fa 360deg
            )`,
            filter: 'blur(1px)',
          }}
        >
          <div className="absolute inset-2 bg-gradient-to-br from-blue-400 via-cyan-300 to-white rounded-full">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-transparent via-white/20 to-transparent animate-pulse">
              {/* Inner glow effect */}
              <div className="absolute inset-4 bg-gradient-to-br from-blue-200/50 via-cyan-100/30 to-white/60 rounded-full blur-sm"></div>
            </div>
          </div>
          
          {/* Ripple effects when listening */}
          {isListening && (
            <>
              <div className="absolute inset-0 border-2 border-blue-400/30 rounded-full animate-ping"></div>
              <div className="absolute inset-[-20px] border border-blue-300/20 rounded-full animate-ping delay-300"></div>
              <div className="absolute inset-[-40px] border border-blue-200/10 rounded-full animate-ping delay-700"></div>
            </>
          )}
        </div>
      </div>

      {/* Status Text */}
      <div className="text-center mb-12 z-10">
        <p className="text-gray-300 text-lg mb-2">Advanced Voice is now ChatGPT Voice</p>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-blue-400 opacity-60"></div>
          <p className="text-gray-400 text-sm">
            {isListening ? 'Listening...' : 'Tap to speak'}
          </p>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center space-x-8 z-10">
        <button
          onClick={toggleListening}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
            isListening 
              ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/30' 
              : 'bg-gray-700 hover:bg-gray-600 shadow-lg shadow-gray-700/30'
          }`}
        >
          {isListening ? (
            <MicOff className="w-8 h-8 text-white" />
          ) : (
            <Mic className="w-8 h-8 text-white" />
          )}
        </button>

        <button
          onClick={onBack}
          className="w-16 h-16 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-all duration-300 shadow-lg shadow-gray-700/30"
        >
          <X className="w-8 h-8 text-white" />
        </button>
      </div>

      {/* Close button for fullscreen mode */}
      {viewMode === 'fullscreen' && (
        <button
          onClick={onBack}
          className="absolute top-6 right-6 w-12 h-12 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-600 flex items-center justify-center hover:bg-gray-700 transition-all duration-300 z-20"
        >
          <X className="w-6 h-6 text-gray-300" />
        </button>
      )}
    </div>
  );
};

export default VoiceAgent;