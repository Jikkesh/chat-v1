import React, { useState, useRef } from 'react';
import { Plus, Send, Phone, Minimize2, Maximize2, X, Sun, Moon, Palette } from 'lucide-react';
import { ViewMode, ActiveView } from '../App';
import { Theme, createTheme } from '../types/theme';
import FileUpload from './FileUpload';
import MessageList from './MessageList';

interface ChatInterfaceProps {
  viewMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
  onViewChange: (view: ActiveView) => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  files?: File[];
  timestamp: Date;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  viewMode,
  onModeChange,
  onViewChange,
  theme,
  onThemeChange,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    if (!inputValue.trim() && uploadedFiles.length === 0) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      files: uploadedFiles.length > 0 ? uploadedFiles : undefined,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setUploadedFiles([]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileSelect = (files: File[]) => {
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFileSelect(files);
  };

  const handleThemeToggle = () => {
    const newMode = theme.mode === 'dark' ? 'light' : 'dark';
    onThemeChange(createTheme(newMode, theme.primaryColor));
  };

  const handleColorChange = (color: string) => {
    onThemeChange(createTheme(theme.mode, color));
    setShowColorPicker(false);
  };

  const colorOptions = [
    '#f97316', // orange
    '#2563eb', // blue
    '#dc2626', // red
    '#16a34a', // green
    '#9333ea', // purple
    '#ea580c', // orange-600
    '#0891b2', // cyan
    '#be185d', // pink
  ];

  return (
    <div 
      className={`flex flex-col h-full transition-colors duration-300`}
      style={{ 
        backgroundColor: isDragOver ? `${theme.primaryColor}20` : theme.backgroundColor,
        color: theme.textColor
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Header */}
      <div 
        className="flex items-center justify-between p-4 border-b transition-colors duration-300"
        style={{ borderColor: theme.borderColor }}
      >
        <div className="flex items-center space-x-2">
          <div 
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: '#10b981' }}
          ></div>
          <span className="text-sm" style={{ color: theme.textSecondaryColor }}>Free plan</span>
          <button 
            className="text-sm transition-colors hover:opacity-80"
            style={{ color: theme.primaryColor }}
          >
            Upgrade
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Theme Controls */}
          <div className="relative">
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="p-2 rounded-lg transition-all duration-200 hover:opacity-80"
              style={{ 
                color: theme.textSecondaryColor,
                backgroundColor: `${theme.surfaceColor}80`
              }}
            >
              <Palette className="w-4 h-4" />
            </button>
            
            {showColorPicker && (
              <div 
                className="absolute top-12 right-0 p-3 rounded-lg shadow-lg border z-50"
                style={{ 
                  backgroundColor: theme.surfaceColor,
                  borderColor: theme.borderColor
                }}
              >
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorChange(color)}
                      className="w-6 h-6 rounded-full border-2 hover:scale-110 transition-transform"
                      style={{ 
                        backgroundColor: color,
                        borderColor: theme.primaryColor === color ? theme.textColor : 'transparent'
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <button
            onClick={handleThemeToggle}
            className="p-2 rounded-lg transition-all duration-200 hover:opacity-80"
            style={{ 
              color: theme.textSecondaryColor,
              backgroundColor: `${theme.surfaceColor}80`
            }}
          >
            {theme.mode === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          
          {viewMode === 'fullscreen' && (
            <button
              onClick={() => onModeChange('widget')}
              className="p-2 rounded-lg transition-all duration-200 hover:opacity-80"
              style={{ 
                color: theme.textSecondaryColor,
                backgroundColor: `${theme.surfaceColor}80`
              }}
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Welcome Message */}
      <div className="flex-1 flex flex-col">
        <div className="text-center py-8">
          <div className="text-2xl mb-2">
            <span className="text-3xl" style={{ color: theme.primaryColor }}>✱</span>{' '}
            <span style={{ color: theme.textColor }}>Happy Saturday, Tara</span>
          </div>
        </div>

        {/* Messages */}
        <MessageList messages={messages} theme={theme} />

        {/* Input Area */}
        <div 
          className="p-4 border-t transition-colors duration-300"
          style={{ borderColor: theme.borderColor }}
        >
          <div className="max-w-4xl mx-auto">
            {/* File Previews */}
            {uploadedFiles.length > 0 && (
              <div className="mb-3">
                <FileUpload
                  files={uploadedFiles}
                  onRemove={handleRemoveFile}
                  theme={theme}
                />
              </div>
            )}

            {/* Input Field */}
            <div 
              className="relative rounded-2xl border transition-colors duration-300"
              style={{ 
                backgroundColor: theme.surfaceColor,
                borderColor: theme.borderColor
              }}
            >
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="How can I help you today?"
                className="w-full bg-transparent p-4 pr-24 resize-none focus:outline-none transition-colors duration-300"
                style={{ 
                  color: theme.textColor,
                }}
                rows={1}
                style={{ minHeight: '60px' }}
              />
              
              {/* Action Buttons */}
              <div className="absolute right-2 bottom-2 flex items-center space-x-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 rounded-lg transition-all duration-200 hover:opacity-80"
                  style={{ 
                    color: theme.textSecondaryColor,
                    backgroundColor: `${theme.backgroundColor}80`
                  }}
                  title="Upload files"
                >
                  <Plus className="w-5 h-5" />
                </button>
                
                <button
                  onClick={() => onViewChange('voice')}
                  className="p-2 rounded-lg transition-all duration-200 hover:opacity-80"
                  style={{ 
                    color: theme.textSecondaryColor,
                    backgroundColor: `${theme.backgroundColor}80`
                  }}
                  title="Voice call"
                >
                  <Phone className="w-5 h-5" />
                </button>
                
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() && uploadedFiles.length === 0}
                  className="p-2 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  style={{ 
                    backgroundColor: theme.primaryColor,
                  }}
                  title="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Tools Banner */}
            <div 
              className="flex items-center justify-between mt-3 text-sm"
              style={{ color: theme.textSecondaryColor }}
            >
              <span>Upgrade to connect your tools to Claude</span>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          handleFileSelect(files);
        }}
      />
    </div>
  );
};

export default ChatInterface;