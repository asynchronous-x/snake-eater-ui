/**
 * Error logging system for Snake Eater UI component library
 * Provides centralized error handling and logging for all components
 */

import React from 'react';

export enum ErrorLevel {
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical',
}

export enum ErrorCategory {
  PROP_VALIDATION = 'prop_validation',
  RENDER_ERROR = 'render_error',
  EVENT_HANDLER = 'event_handler',
  LIFECYCLE = 'lifecycle',
  STATE_UPDATE = 'state_update',
}

interface ErrorContext {
  componentName: string;
  props?: Record<string, any>;
  state?: Record<string, any>;
  additionalInfo?: any;
}

interface LogEntry {
  timestamp: Date;
  level: ErrorLevel;
  category: ErrorCategory;
  message: string;
  error?: Error;
  context: ErrorContext;
  stack?: string;
}

class ErrorLogger {
  private static instance: ErrorLogger;
  private logs: LogEntry[] = [];
  private errorHandlers: ((entry: LogEntry) => void)[] = [];
  private isDevelopment = process.env.NODE_ENV === 'development';
  private maxLogs = 100;

  private constructor() {}

  static getInstance(): ErrorLogger {
    if (!ErrorLogger.instance) {
      ErrorLogger.instance = new ErrorLogger();
    }
    return ErrorLogger.instance;
  }

  /**
   * Log an error with context
   */
  log(
    level: ErrorLevel,
    category: ErrorCategory,
    message: string,
    context: ErrorContext,
    error?: Error,
  ): void {
    const entry: LogEntry = {
      timestamp: new Date(),
      level,
      category,
      message,
      context,
      error,
      stack: error?.stack || new Error().stack,
    };

    // Add to internal log buffer
    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // Console output in development
    if (this.isDevelopment) {
      this.consoleOutput(entry);
    }

    // Notify registered handlers
    this.errorHandlers.forEach((handler) => handler(entry));

    // Throw in development for critical errors
    if (level === ErrorLevel.CRITICAL && this.isDevelopment) {
      throw new Error(`[${context.componentName}] ${message}`);
    }
  }

  /**
   * Log a warning
   */
  warn(category: ErrorCategory, message: string, context: ErrorContext): void {
    this.log(ErrorLevel.WARNING, category, message, context);
  }

  /**
   * Log an error
   */
  error(category: ErrorCategory, message: string, context: ErrorContext, error?: Error): void {
    this.log(ErrorLevel.ERROR, category, message, context, error);
  }

  /**
   * Log a critical error
   */
  critical(category: ErrorCategory, message: string, context: ErrorContext, error?: Error): void {
    this.log(ErrorLevel.CRITICAL, category, message, context, error);
  }

  /**
   * Register an error handler
   */
  addHandler(handler: (entry: LogEntry) => void): void {
    this.errorHandlers.push(handler);
  }

  /**
   * Remove an error handler
   */
  removeHandler(handler: (entry: LogEntry) => void): void {
    this.errorHandlers = this.errorHandlers.filter((h) => h !== handler);
  }

  /**
   * Get recent logs
   */
  getLogs(limit?: number): LogEntry[] {
    const logs = [...this.logs].reverse();
    return limit ? logs.slice(0, limit) : logs;
  }

  /**
   * Clear all logs
   */
  clearLogs(): void {
    this.logs = [];
  }

  /**
   * Console output formatting
   */
  private consoleOutput(entry: LogEntry): void {
    const prefix = `[Snake Eater UI - ${entry.context.componentName}]`;
    const style = this.getConsoleStyle(entry.level);

    console.group(`%c${prefix} ${entry.level.toUpperCase()}: ${entry.message}`, style);

    console.log('Category:', entry.category);
    console.log('Timestamp:', entry.timestamp.toISOString());

    if (entry.context.props) {
      console.log('Props:', entry.context.props);
    }

    if (entry.context.state) {
      console.log('State:', entry.context.state);
    }

    if (entry.context.additionalInfo) {
      console.log('Additional Info:', entry.context.additionalInfo);
    }

    if (entry.error) {
      console.error('Error Object:', entry.error);
    }

    if (entry.stack) {
      console.log('Stack Trace:', entry.stack);
    }

    console.groupEnd();
  }

  private getConsoleStyle(level: ErrorLevel): string {
    switch (level) {
      case ErrorLevel.WARNING:
        return 'color: #f1fa8c; font-weight: bold;';
      case ErrorLevel.ERROR:
        return 'color: #ff5555; font-weight: bold;';
      case ErrorLevel.CRITICAL:
        return 'color: #ff5555; background: #1f1d20; padding: 2px 4px; font-weight: bold;';
      default:
        return '';
    }
  }
}

// Export singleton instance
export const errorLogger = ErrorLogger.getInstance();

/**
 * HOC to wrap components with error logging
 */
export function withErrorLogging<P extends object>(
  Component: React.ComponentType<P>,
  componentName: string,
): React.ComponentType<P> {
  return (props: P) => {
    try {
      return <Component {...props} />;
    } catch (error) {
      errorLogger.critical(
        ErrorCategory.RENDER_ERROR,
        `Component failed to render: ${error instanceof Error ? error.message : 'Unknown error'}`,
        {
          componentName,
          props: props as Record<string, any>,
        },
        error instanceof Error ? error : new Error(String(error)),
      );

      // Re-throw in development
      if (process.env.NODE_ENV === 'development') {
        throw error;
      }

      // Return null in production to prevent app crash
      return null;
    }
  };
}

/**
 * Hook for error logging within components
 */
export function useErrorLogger(componentName: string) {
  return {
    logWarning: (message: string, additionalInfo?: any) => {
      errorLogger.warn(ErrorCategory.PROP_VALIDATION, message, { componentName, additionalInfo });
    },
    logError: (message: string, error?: Error, additionalInfo?: any) => {
      errorLogger.error(
        ErrorCategory.RENDER_ERROR,
        message,
        { componentName, additionalInfo },
        error,
      );
    },
    logPropError: (propName: string, expected: string, received: any) => {
      errorLogger.error(
        ErrorCategory.PROP_VALIDATION,
        `Invalid prop "${propName}": expected ${expected}, received ${typeof received}`,
        {
          componentName,
          props: { [propName]: received },
        },
      );
    },
    logEventError: (eventName: string, error: Error) => {
      errorLogger.error(
        ErrorCategory.EVENT_HANDLER,
        `Error in ${eventName} handler`,
        { componentName },
        error,
      );
    },
  };
}
