import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import VoiceAgent from './components/VoiceAgent';
import ChatWidget from './components/ChatWidget';
import FloatingChatButton from './components/FloatingChatButton';

export type ViewMode = 'fullscreen' | 'widget' | 'minimized';
export type ActiveView = 'chat' | 'voice';

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('fullscreen');
  const [activeView, setActiveView] = useState<ActiveView>('chat');
  const [isOpen, setIsOpen] = useState(true);

  const handleModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    if (mode === 'minimized') {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const handleToggleOpen = () => {
    if (viewMode === 'minimized') {
      setViewMode('widget');
      setIsOpen(true);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleViewChange = (view: ActiveView) => {
    setActiveView(view);
  };

  if (viewMode === 'minimized') {
    return <FloatingChatButton onClick={handleToggleOpen} />;
  }

  if (viewMode === 'fullscreen') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {activeView === 'chat' ? (
          <ChatInterface
            viewMode={viewMode}
            onModeChange={handleModeChange}
            onViewChange={handleViewChange}
          />
        ) : (
          <VoiceAgent
            viewMode={viewMode}
            onBack={() => handleViewChange('chat')}
          />
        )}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {isOpen && (
        <ChatWidget
          activeView={activeView}
          onClose={() => setIsOpen(false)}
          onMinimize={() => handleModeChange('minimized')}
          onViewChange={handleViewChange}
        />
      )}
      {!isOpen && <FloatingChatButton onClick={handleToggleOpen} />}
    </div>
  );
}

export default App;