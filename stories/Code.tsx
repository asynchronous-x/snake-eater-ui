import React, { useState } from 'react';
import './code.css';

interface CodeProps {
  /** Code content */
  children: string;
  /** Programming language for syntax highlighting */
  language?: string;
  /** Display variant */
  variant?: 'inline' | 'block';
  /** Show line numbers (block only) */
  showLineNumbers?: boolean;
  /** Enable copy button (block only) */
  copyable?: boolean;
  /** Theme variant */
  theme?: 'dark' | 'darker';
  /** Maximum height before scrolling (block only) */
  maxHeight?: string;
  /** Highlight specific lines (block only) */
  highlightLines?: number[];
  /** File name to display (block only) */
  fileName?: string;
  /** Additional CSS classes */
  className?: string;
}

/** Code component for displaying code snippets */
export const Code: React.FC<CodeProps> = ({
  children,
  language = 'text',
  variant = 'block',
  showLineNumbers = false,
  copyable = true,
  theme = 'dark',
  maxHeight,
  highlightLines = [],
  fileName,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (variant === 'inline') {
    return (
      <code className={`snake-code snake-code--inline snake-code--${theme} ${className}`}>
        {children}
      </code>
    );
  }

  const lines = children.split('\n');
  const lineCount = lines.length;

  return (
    <div className={`snake-code-block snake-code-block--${theme} ${className}`}>
      {fileName && (
        <div className="snake-code-block__header">
          <span className="snake-code-block__filename">{fileName}</span>
          <span className="snake-code-block__language">{language}</span>
        </div>
      )}
      
      <div className="snake-code-block__wrapper">
        {copyable && (
          <button
            className="snake-code-block__copy"
            onClick={handleCopy}
            title={copied ? 'Copied!' : 'Copy code'}
          >
            {copied ? '✓' : '📋'}
          </button>
        )}
        
        <pre 
          className="snake-code-block__pre"
          style={{ maxHeight }}
        >
          {showLineNumbers && (
            <div className="snake-code-block__line-numbers">
              {lines.map((_, index) => (
                <div 
                  key={index} 
                  className={[
                    'snake-code-block__line-number',
                    highlightLines.includes(index + 1) && 'snake-code-block__line-number--highlighted'
                  ].filter(Boolean).join(' ')}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          )}
          
          <code className="snake-code-block__code" data-language={language}>
            {lines.map((line, index) => (
              <div 
                key={index}
                className={[
                  'snake-code-block__line',
                  highlightLines.includes(index + 1) && 'snake-code-block__line--highlighted'
                ].filter(Boolean).join(' ')}
              >
                {line || '\n'}
              </div>
            ))}
          </code>
        </pre>
      </div>
      
      <div className="snake-code-block__corner snake-code-block__corner--top-left" />
      <div className="snake-code-block__corner snake-code-block__corner--top-right" />
      <div className="snake-code-block__corner snake-code-block__corner--bottom-left" />
      <div className="snake-code-block__corner snake-code-block__corner--bottom-right" />
    </div>
  );
};