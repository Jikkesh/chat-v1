import React, { useState, useEffect } from 'react';
import { Mic, X, MicOff, Volume2 } from 'lucide-react';
import { ViewMode } from '../App';
import { Theme } from '../types/theme';

interface VoiceAgentProps {
  viewMode: ViewMode;
  onBack: () => void;
  theme: Theme;
}

const VoiceAgent: React.FC<VoiceAgentProps> = ({ viewMode, onBack, theme }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [pulseIntensity, setPulseIntensity] = useState(0);
  const [audioWaves, setAudioWaves] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 360);
      
      // Simulate audio waves when speaking or listening
      if (isListening || isSpeaking) {
        setPulseIntensity(Math.random() * 0.5 + 0.5);
        setAudioWaves(Array.from({ length: 8 }, () => Math.random() * 100 + 20));
      } else {
        setPulseIntensity(0.3);
        setAudioWaves(Array.from({ length: 8 }, () => 30));
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isListening, isSpeaking]);

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate speaking after listening
      setTimeout(() => {
        setIsListening(false);
        setIsSpeaking(true);
        setTimeout(() => setIsSpeaking(false), 3000);
      }, 2000);
    }
  };

  return (
    <div 
      className="flex flex-col items-center justify-center h-full relative overflow-hidden transition-colors duration-500"
      style={{
        background: theme.mode === 'dark' 
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)'
      }}
    >
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
          style={{ backgroundColor: theme.primaryColor }}
        ></div>
        <div 
          className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
          style={{ 
            backgroundColor: theme.primaryColor,
            animationDelay: '1s'
          }}
        ></div>
        <div 
          className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
          style={{ 
            backgroundColor: theme.primaryColor,
            animationDelay: '2s'
          }}
        ></div>
      </div>

      {/* Audio Visualization */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="flex items-end space-x-1 opacity-30">
          {audioWaves.map((height, index) => (
            <div
              key={index}
              className="w-1 rounded-full transition-all duration-100"
              style={{
                height: `${height * (isListening || isSpeaking ? pulseIntensity : 0.3)}px`,
                backgroundColor: theme.primaryColor,
                animationDelay: `${index * 100}ms`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Central Orb */}
      <div className="relative z-10 mb-16">
        <div 
          className={`w-48 h-48 rounded-full relative overflow-hidden transition-all duration-500 ${
            isListening ? 'scale-125' : isSpeaking ? 'scale-115' : 'scale-100'
          }`}
          style={{
            background: `conic-gradient(from ${animationPhase * (isListening || isSpeaking ? 2 : 1)}deg, 
              ${theme.primaryColor} 0deg, 
              ${theme.primaryColor}80 72deg, 
              ${theme.primaryColor}60 144deg, 
              ${theme.primaryColor}40 216deg, 
              ${theme.primaryColor}20 288deg, 
              ${theme.primaryColor} 360deg
            )`,
            filter: `blur(${isListening || isSpeaking ? '2px' : '1px'})`,
          }}
        >
          <div 
            className="absolute inset-2 rounded-full"
            style={{
              background: theme.mode === 'dark'
                ? `linear-gradient(135deg, ${theme.primaryColor}60 0%, ${theme.primaryColor}40 50%, ${theme.backgroundColor}80 100%)`
                : `linear-gradient(135deg, ${theme.primaryColor}40 0%, ${theme.primaryColor}20 50%, ${theme.backgroundColor} 100%)`
            }}
          >
            <div 
              className="w-full h-full rounded-full animate-pulse"
              style={{
                background: `linear-gradient(135deg, transparent 0%, ${theme.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'} 50%, transparent 100%)`
              }}
            >
              {/* Inner glow effect */}
              <div 
                className="absolute inset-4 rounded-full blur-sm"
                style={{
                  background: `linear-gradient(135deg, ${theme.primaryColor}30 0%, ${theme.primaryColor}20 50%, ${theme.primaryColor}10 100%)`
                }}
              ></div>
            </div>
          </div>
          
          {/* Ripple effects when listening or speaking */}
          {isListening && (
            <>
              <div 
                className="absolute inset-0 border-2 rounded-full animate-ping"
                style={{ borderColor: `${theme.primaryColor}50` }}
              ></div>
              <div 
                className="absolute inset-[-20px] border rounded-full animate-ping"
                style={{ 
                  borderColor: `${theme.primaryColor}30`,
                  animationDelay: '300ms'
                }}
              ></div>
              <div 
                className="absolute inset-[-40px] border rounded-full animate-ping"
                style={{ 
                  borderColor: `${theme.primaryColor}20`,
                  animationDelay: '700ms'
                }}
              ></div>
            </>
          )}
          
          {/* Speaking effects */}
          {isSpeaking && (
            <>
              <div 
                className="absolute inset-0 border-2 rounded-full animate-pulse"
                style={{ borderColor: `${theme.primaryColor}60` }}
              ></div>
              <div 
                className="absolute inset-[-10px] border rounded-full animate-pulse"
                style={{ 
                  borderColor: `${theme.primaryColor}40`,
                  animationDelay: '200ms'
                }}
              ></div>
            </>
          )}
        </div>
      </div>

      {/* Status Text */}
      <div className="text-center mb-12 z-10">
        <p 
          className="text-lg mb-2 transition-colors duration-300"
          style={{ color: theme.textColor }}
        >
          Advanced Voice Agent
        </p>
        <div className="flex items-center justify-center space-x-2">
          <div 
            className="w-4 h-4 rounded-full opacity-60"
            style={{ backgroundColor: theme.primaryColor }}
          ></div>
          <p 
            className="text-sm transition-colors duration-300"
            style={{ color: theme.textSecondaryColor }}
          >
            {isListening ? 'Listening...' : isSpeaking ? 'Speaking...' : 'Tap to speak'}
          </p>
          {(isListening || isSpeaking) && (
            <Volume2 
              className="w-4 h-4 animate-pulse"
              style={{ color: theme.primaryColor }}
            />
          )}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center space-x-8 z-10">
        <button
          onClick={toggleListening}
          className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg"
          style={{
            backgroundColor: isListening ? '#ef4444' : theme.surfaceColor,
            boxShadow: isListening 
              ? '0 10px 25px rgba(239, 68, 68, 0.3)' 
              : `0 10px 25px ${theme.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'}`
          }}
        >
          {isListening ? (
            <MicOff className="w-8 h-8 text-white" />
          ) : (
            <Mic 
              className="w-8 h-8"
              style={{ color: theme.mode === 'dark' ? 'white' : theme.textColor }}
            />
          )}
        </button>

        <button
          onClick={onBack}
          className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:opacity-80"
          style={{
            backgroundColor: theme.surfaceColor,
            boxShadow: theme.mode === 'dark' 
              ? '0 10px 25px rgba(0,0,0,0.3)' 
              : '0 10px 25px rgba(0,0,0,0.1)'
          }}
        >
          <X 
            className="w-8 h-8"
            style={{ color: theme.mode === 'dark' ? 'white' : theme.textColor }}
          />
        </button>
      </div>

      {/* Close button for fullscreen mode */}
      {viewMode === 'fullscreen' && (
        <button
          onClick={onBack}
          className="absolute top-6 right-6 w-12 h-12 rounded-full backdrop-blur-sm border flex items-center justify-center hover:opacity-80 transition-all duration-300 z-20"
          style={{
            backgroundColor: `${theme.surfaceColor}80`,
            borderColor: theme.borderColor
          }}
        >
          <X 
            className="w-6 h-6"
            style={{ color: theme.textSecondaryColor }}
          />
        </button>
      )}
    </div>
  );
};

export default VoiceAgent;