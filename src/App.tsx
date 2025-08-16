import React, { useState } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import ChatInterface from './components/ChatInterface';
import VoiceAgent from './components/VoiceAgent';
import ChatWidget from './components/ChatWidget';
import FloatingChatButton from './components/FloatingChatButton';
import { createTheme } from './types/theme';

export type ViewMode = 'fullscreen' | 'widget' | 'minimized';
export type ActiveView = 'chat' | 'voice';

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('minimized');
  const [activeView, setActiveView] = useState<ActiveView>('chat');
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(createTheme('dark', '#f97316'));

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
    return (
      <ThemeProvider initialTheme={currentTheme}>
        <FloatingChatButton onClick={handleToggleOpen} />
      </ThemeProvider>
    );
  }

  if (viewMode === 'fullscreen') {
    return (
      <ThemeProvider initialTheme={currentTheme}>
        <div 
          className="min-h-screen transition-colors duration-300"
          style={{ 
            background: currentTheme.mode === 'dark' 
              ? 'linear-gradient(135deg, #111827 0%, #1f2937 50%, #111827 100%)'
              : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)'
          }}
        >
          {activeView === 'chat' ? (
            <ChatInterface
              viewMode={viewMode}
              onModeChange={handleModeChange}
              onViewChange={handleViewChange}
              theme={currentTheme}
              onThemeChange={setCurrentTheme}
            />
          ) : (
            <VoiceAgent
              viewMode={viewMode}
              onBack={() => handleViewChange('chat')}
              theme={currentTheme}
            />
          )}
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider initialTheme={currentTheme}>
      <div className="fixed inset-0 pointer-events-none z-50">
        {isOpen && (
          <ChatWidget
            activeView={activeView}
            onClose={() => setIsOpen(false)}
            onMinimize={() => handleModeChange('minimized')}
            onViewChange={handleViewChange}
            onFullscreen={() => handleModeChange('fullscreen')}
            theme={currentTheme}
            onThemeChange={setCurrentTheme}
          />
        )}
        {!isOpen && <FloatingChatButton onClick={handleToggleOpen} />}
      </div>
    </ThemeProvider>
  );
}

export default App;