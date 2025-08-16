import React from 'react';
import { X, Minimize2, Maximize2 } from 'lucide-react';
import { ActiveView } from '../App';
import { Theme } from '../types/theme';
import ChatInterface from './ChatInterface';
import VoiceAgent from './VoiceAgent';

interface ChatWidgetProps {
  activeView: ActiveView;
  onClose: () => void;
  onMinimize: () => void;
  onFullscreen: () => void;
  onViewChange: (view: ActiveView) => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({
  activeView,
  onClose,
  onMinimize,
  onFullscreen,
  onViewChange,
  theme,
  onThemeChange,
}) => {
  return (
    <div className="fixed bottom-4 right-4 w-96 h-[600px] pointer-events-auto">
      <div 
        className="w-full h-full border rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl transition-colors duration-300"
        style={{ 
          backgroundColor: theme.backgroundColor,
          borderColor: theme.borderColor
        }}
      >
        {/* Widget Header */}
        <div 
          className="flex items-center justify-between p-3 border-b transition-colors duration-300"
          style={{ 
            backgroundColor: theme.surfaceColor,
            borderColor: theme.borderColor
          }}
        >
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm" style={{ color: theme.textColor }}>AI Assistant</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={onFullscreen}
              className="p-1.5 rounded transition-colors hover:opacity-80"
              style={{ 
                color: theme.textSecondaryColor,
                backgroundColor: `${theme.backgroundColor}50`
              }}
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={onMinimize}
              className="p-1.5 rounded transition-colors hover:opacity-80"
              style={{ 
                color: theme.textSecondaryColor,
                backgroundColor: `${theme.backgroundColor}50`
              }}
            >
              <Minimize2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded transition-colors hover:opacity-80"
              style={{ 
                color: theme.textSecondaryColor,
                backgroundColor: `${theme.backgroundColor}50`
              }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Widget Content */}
        <div className="h-[calc(600px-60px)]">
          {activeView === 'chat' ? (
            <ChatInterface
              viewMode="widget"
              onModeChange={() => {}}
              onViewChange={onViewChange}
              theme={theme}
              onThemeChange={onThemeChange}
            />
          ) : (
            <VoiceAgent
              viewMode="widget"
              onBack={() => onViewChange('chat')}
              theme={theme}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;