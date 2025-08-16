import React from 'react';
import { X, Minimize2 } from 'lucide-react';
import { ActiveView } from '../App';
import ChatInterface from './ChatInterface';
import VoiceAgent from './VoiceAgent';

interface ChatWidgetProps {
  activeView: ActiveView;
  onClose: () => void;
  onMinimize: () => void;
  onViewChange: (view: ActiveView) => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({
  activeView,
  onClose,
  onMinimize,
  onViewChange,
}) => {
  return (
    <div className="fixed bottom-4 right-4 w-96 h-[600px] pointer-events-auto">
      <div className="w-full h-full bg-gray-900 border border-gray-600 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* Widget Header */}
        <div className="flex items-center justify-between p-3 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">AI Assistant</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={onMinimize}
              className="p-1.5 text-gray-400 hover:text-white rounded hover:bg-gray-700 transition-colors"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white rounded hover:bg-gray-700 transition-colors"
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
            />
          ) : (
            <VoiceAgent
              viewMode="widget"
              onBack={() => onViewChange('chat')}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;