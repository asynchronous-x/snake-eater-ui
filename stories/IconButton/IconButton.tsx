import React from 'react';
import './iconbutton.css';
import { useErrorLogger } from '../utils/errorLogger';
import { validateEnum, safeEventHandler, validators, validateProps } from '../utils/propValidation';
import { ErrorBoundary } from '../utils/ErrorBoundary';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon content */
  icon: React.ReactNode;
  /** Button variant */
  variant?: 'default' | 'primary' | 'secondary' | 'ghost' | 'danger';
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Shape variant */
  shape?: 'square' | 'circle';
  /** Loading state */
  loading?: boolean;
  /** Tooltip text */
  tooltip?: string;
  /** Badge content */
  badge?: string | number;
  /** Badge variant */
  badgeVariant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}

const VALID_VARIANTS = ['default', 'primary', 'secondary', 'ghost', 'danger'] as const;
const VALID_SIZES = ['small', 'medium', 'large'] as const;
const VALID_SHAPES = ['square', 'circle'] as const;
const VALID_BADGE_VARIANTS = ['default', 'success', 'warning', 'danger', 'info'] as const;

/** IconButton component for icon-only actions */
const IconButtonComponent: React.FC<IconButtonProps> = ({
  icon,
  variant = 'default',
  size = 'medium',
  shape = 'square',
  loading = false,
  tooltip,
  badge,
  badgeVariant = 'danger',
  disabled = false,
  className = '',
  onClick,
  ...props
}) => {
  const logger = useErrorLogger('IconButton');

  // Validate props in development
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Validate required prop
      if (!icon && !loading) {
        logger.logWarning('IconButton should have an icon or be in loading state');
      }

      // Validate enums
      if (variant && !validateEnum(variant, VALID_VARIANTS, 'variant', 'IconButton')) {
        logger.logPropError('variant', `one of [${VALID_VARIANTS.join(', ')}]`, variant);
      }

      if (size && !validateEnum(size, VALID_SIZES, 'size', 'IconButton')) {
        logger.logPropError('size', `one of [${VALID_SIZES.join(', ')}]`, size);
      }

      if (shape && !validateEnum(shape, VALID_SHAPES, 'shape', 'IconButton')) {
        logger.logPropError('shape', `one of [${VALID_SHAPES.join(', ')}]`, shape);
      }

      if (
        badgeVariant &&
        !validateEnum(badgeVariant, VALID_BADGE_VARIANTS, 'badgeVariant', 'IconButton')
      ) {
        logger.logPropError(
          'badgeVariant',
          `one of [${VALID_BADGE_VARIANTS.join(', ')}]`,
          badgeVariant,
        );
      }

      // Validate other props
      const propSchema = {
        loading: { validator: validators.isBoolean },
        disabled: { validator: validators.isBoolean },
        tooltip: { validator: validators.isString },
        badge: { validator: validators.oneOfType([validators.isString, validators.isNumber]) },
      };

      validateProps({ loading, disabled, tooltip, badge }, propSchema, 'IconButton');

      // Accessibility warning
      if (!tooltip && !props['aria-label']) {
        logger.logWarning('IconButton should have a tooltip or aria-label for accessibility');
      }
    }
  }, [icon, variant, size, shape, loading, tooltip, badge, badgeVariant, disabled, props, logger]);
  const buttonClasses = [
    'snake-icon-button',
    `snake-icon-button--${variant}`,
    `snake-icon-button--${size}`,
    `snake-icon-button--${shape}`,
    loading && 'snake-icon-button--loading',
    disabled && 'snake-icon-button--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Wrap onClick in safe handler
  const handleClick = safeEventHandler(onClick, 'IconButton', 'onClick');

  return (
    <button
      type="button"
      className={buttonClasses}
      disabled={disabled || loading}
      title={tooltip}
      aria-label={tooltip || props['aria-label']}
      onClick={handleClick}
      {...props}
    >
      <span className="snake-icon-button__content">
        {loading ? <span className="snake-icon-button__loader" /> : icon}
      </span>

      {badge !== undefined && !loading && (
        <span className={`snake-icon-button__badge snake-icon-button__badge--${badgeVariant}`}>
          {badge}
        </span>
      )}

      {shape === 'square' && (
        <>
          <span className="snake-icon-button__corner snake-icon-button__corner--top-left" />
          <span className="snake-icon-button__corner snake-icon-button__corner--top-right" />
          <span className="snake-icon-button__corner snake-icon-button__corner--bottom-left" />
          <span className="snake-icon-button__corner snake-icon-button__corner--bottom-right" />
        </>
      )}
    </button>
  );
};

/** IconButton with error boundary */
export const IconButton: React.FC<IconButtonProps> = (props) => {
  return (
    <ErrorBoundary componentName="IconButton" resetOnPropsChange>
      <IconButtonComponent {...props} />
    </ErrorBoundary>
  );
};
