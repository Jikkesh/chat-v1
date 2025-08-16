import React from 'react';
import { Message } from './ChatInterface';
import FileUpload from './FileUpload';

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  if (messages.length === 0) return null;

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[80%] rounded-2xl px-4 py-3 ${
              message.type === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-200'
            }`}
          >
            {message.files && message.files.length > 0 && (
              <div className="mb-2">
                <FileUpload 
                  files={message.files} 
                  onRemove={() => {}} // Files in messages shouldn't be removable
                />
              </div>
            )}
            
            {message.content && (
              <div className="whitespace-pre-wrap">{message.content}</div>
            )}
            
            <div className="text-xs opacity-70 mt-1">
              {message.timestamp.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;