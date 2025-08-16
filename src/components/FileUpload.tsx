import React from 'react';
import { X, File, Image } from 'lucide-react';
import { Theme } from '../types/theme';

interface FileUploadProps {
  files: File[];
  onRemove: (index: number) => void;
  theme: Theme;
}

const FileUpload: React.FC<FileUploadProps> = ({ files, onRemove, theme }) => {
  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Image className="w-4 h-4" />;
    }
    return <File className="w-4 h-4" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="flex flex-wrap gap-2">
      {files.map((file, index) => (
        <div
          key={index}
          className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm transition-colors duration-300"
          style={{ backgroundColor: theme.surfaceColor }}
        >
          <div style={{ color: theme.textSecondaryColor }}>
            {getFileIcon(file)}
          </div>
          
          <div className="flex-1 min-w-0">
            <div 
              className="truncate max-w-[150px]" 
              title={file.name}
              style={{ color: theme.textColor }}
            >
              {file.name}
            </div>
            <div 
              className="text-xs"
              style={{ color: theme.textSecondaryColor }}
            >
              {formatFileSize(file.size)}
            </div>
          </div>
          
          <button
            onClick={() => onRemove(index)}
            className="transition-colors hover:opacity-80"
            style={{ color: theme.textSecondaryColor }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default FileUpload;