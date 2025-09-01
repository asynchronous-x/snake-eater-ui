import React from 'react';
import './button.css';
import { useErrorLogger } from '../utils/errorLogger';
import { validateEnum, safeEventHandler, validators, validateProps } from '../utils/propValidation';
import { ErrorBoundary } from '../utils/ErrorBoundary';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'cyber' | 'clipped';
  /** How large should the button be? */
  size?: 'small' | 'medium' | 'large';
  /** Is the button in a loading state? */
  loading?: boolean;
  /** Should the button fill its container? */
  fullWidth?: boolean;
  /** Button contents */
  children: React.ReactNode;
}

const VALID_VARIANTS = ['primary', 'secondary', 'ghost', 'danger', 'cyber', 'clipped'] as const;
const VALID_SIZES = ['small', 'medium', 'large'] as const;

/** Primary UI component for user interaction */
const ButtonComponent: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  loading = false,
  fullWidth = false,
  disabled = false,
  children,
  className = '',
  onClick,
  ...props
}) => {
  const logger = useErrorLogger('Button');

  // Validate props in development
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Validate variant
      if (variant && !validateEnum(variant, VALID_VARIANTS, 'variant', 'Button')) {
        logger.logPropError('variant', `one of [${VALID_VARIANTS.join(', ')}]`, variant);
      }

      // Validate size
      if (size && !validateEnum(size, VALID_SIZES, 'size', 'Button')) {
        logger.logPropError('size', `one of [${VALID_SIZES.join(', ')}]`, size);
      }

      // Validate children
      if (!children && !loading) {
        logger.logWarning('Button should have children or be in loading state');
      }

      // Validate boolean props
      const propSchema = {
        loading: { validator: validators.isBoolean },
        fullWidth: { validator: validators.isBoolean },
        disabled: { validator: validators.isBoolean },
      };

      validateProps({ loading, fullWidth, disabled }, propSchema, 'Button');
    }
  }, [variant, size, loading, fullWidth, disabled, children, logger]);

  const classes = [
    'snake-button',
    `snake-button--${variant}`,
    `snake-button--${size}`,
    fullWidth && 'snake-button--full-width',
    loading && 'snake-button--loading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Wrap onClick in safe handler
  const handleClick = safeEventHandler(onClick, 'Button', 'onClick');

  return (
    <button
      type="button"
      className={classes}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {loading ? <span className="snake-button__loader">Loading...</span> : children}
    </button>
  );
};

/** Button with error boundary */
export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <ErrorBoundary componentName="Button" resetOnPropsChange>
      <ButtonComponent {...props} />
    </ErrorBoundary>
  );
};
