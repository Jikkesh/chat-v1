import React, { useState, useRef } from 'react';
import { Plus, Send, Phone, Minimize2, Maximize2, X, Paperclip, Image } from 'lucide-react';
import { ViewMode, ActiveView } from '../App';
import FileUpload from './FileUpload';
import MessageList from './MessageList';

interface ChatInterfaceProps {
  viewMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
  onViewChange: (view: ActiveView) => void;
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
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
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

  return (
    <div 
      className={`flex flex-col h-full ${isDragOver ? 'bg-blue-900/20' : ''} transition-colors duration-200`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-400">Free plan</span>
          <button className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
            Upgrade
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          {viewMode === 'fullscreen' && (
            <button
              onClick={() => onModeChange('widget')}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700 transition-all duration-200"
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
            <span className="text-orange-400 text-3xl">✱</span>{' '}
            <span className="text-gray-200">Happy Saturday, Tara</span>
          </div>
        </div>

        {/* Messages */}
        <MessageList messages={messages} />

        {/* Input Area */}
        <div className="p-4 border-t border-gray-700">
          <div className="max-w-4xl mx-auto">
            {/* File Previews */}
            {uploadedFiles.length > 0 && (
              <div className="mb-3">
                <FileUpload
                  files={uploadedFiles}
                  onRemove={handleRemoveFile}
                />
              </div>
            )}

            {/* Input Field */}
            <div className="relative bg-gray-800 rounded-2xl border border-gray-600 focus-within:border-gray-500 transition-colors">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="How can I help you today?"
                className="w-full bg-transparent text-white placeholder-gray-400 p-4 pr-24 resize-none focus:outline-none"
                rows={1}
                style={{ minHeight: '60px' }}
              />
              
              {/* Action Buttons */}
              <div className="absolute right-2 bottom-2 flex items-center space-x-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700 transition-all duration-200"
                  title="Upload files"
                >
                  <Plus className="w-5 h-5" />
                </button>
                
                <button
                  onClick={() => onViewChange('voice')}
                  className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700 transition-all duration-200"
                  title="Voice call"
                >
                  <Phone className="w-5 h-5" />
                </button>
                
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() && uploadedFiles.length === 0}
                  className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  title="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Tools Banner */}
            <div className="flex items-center justify-between mt-3 text-sm text-gray-400">
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