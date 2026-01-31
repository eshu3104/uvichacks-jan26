import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-foreground">
          {label}
        </label>
      )}
      <input
        className={`px-4 py-3 rounded-[14px] border border-input bg-input-background text-foreground 
          placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring 
          transition-all duration-200 ${error ? 'border-destructive' : ''} ${className}`}
        {...props}
      />
      {error && (
        <span className="text-sm text-destructive">{error}</span>
      )}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className = '', ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-foreground">
          {label}
        </label>
      )}
      <textarea
        className={`px-4 py-3 rounded-[14px] border border-input bg-input-background text-foreground 
          placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring 
          transition-all duration-200 min-h-[120px] resize-y ${error ? 'border-destructive' : ''} ${className}`}
        {...props}
      />
      {error && (
        <span className="text-sm text-destructive">{error}</span>
      )}
    </div>
  );
}
