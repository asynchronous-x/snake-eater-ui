/**
 * Prop validation utilities for Snake Eater UI component library
 */

import React from 'react';
import { errorLogger, ErrorCategory } from './errorLogger';
import { PropValidationError, RequiredPropError, InvalidPropValueError } from './errors';

type ValidatorFunction = (value: any, propName: string, componentName: string) => boolean;

interface ValidationRule {
  validator: ValidatorFunction;
  message?: string;
  required?: boolean;
}

interface ValidationSchema {
  [propName: string]: ValidationRule | ValidationRule[];
}

/**
 * Common validators
 */
export const validators = {
  isString: (value: any): boolean => typeof value === 'string',

  isNumber: (value: any): boolean => typeof value === 'number' && !isNaN(value),

  isBoolean: (value: any): boolean => typeof value === 'boolean',

  isFunction: (value: any): boolean => typeof value === 'function',

  isArray: (value: any): boolean => Array.isArray(value),

  isObject: (value: any): boolean =>
    value !== null && typeof value === 'object' && !Array.isArray(value),

  isNode: (value: any): boolean =>
    value === null ||
    value === undefined ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    React.isValidElement(value) ||
    (Array.isArray(value) && value.every(validators.isNode)),

  isElement: (value: any): boolean => React.isValidElement(value),

  oneOf:
    <T>(validValues: T[]) =>
    (value: any): boolean =>
      validValues.includes(value),

  oneOfType:
    (validators: ValidatorFunction[]) =>
    (value: any, propName: string, componentName: string): boolean =>
      validators.some((validator) => validator(value, propName, componentName)),

  arrayOf:
    (itemValidator: ValidatorFunction) =>
    (value: any, propName: string, componentName: string): boolean =>
      Array.isArray(value) && value.every((item) => itemValidator(item, propName, componentName)),

  objectOf:
    (valueValidator: ValidatorFunction) =>
    (value: any, propName: string, componentName: string): boolean =>
      validators.isObject(value) &&
      Object.values(value).every((val) => valueValidator(val, propName, componentName)),

  shape:
    (shape: { [key: string]: ValidatorFunction }) =>
    (value: any, propName: string, componentName: string): boolean => {
      if (!validators.isObject(value)) return false;

      return Object.keys(shape).every((key) => {
        if (!(key in value)) return false;
        return shape[key](value[key], `${propName}.${key}`, componentName);
      });
    },

  instanceOf:
    (constructor: any) =>
    (value: any): boolean =>
      value instanceof constructor,

  custom: (validator: (value: any) => boolean) => validator,

  minLength:
    (min: number) =>
    (value: any): boolean =>
      (typeof value === 'string' || Array.isArray(value)) && value.length >= min,

  maxLength:
    (max: number) =>
    (value: any): boolean =>
      (typeof value === 'string' || Array.isArray(value)) && value.length <= max,

  min:
    (min: number) =>
    (value: any): boolean =>
      typeof value === 'number' && value >= min,

  max:
    (max: number) =>
    (value: any): boolean =>
      typeof value === 'number' && value <= max,

  pattern:
    (regex: RegExp) =>
    (value: any): boolean =>
      typeof value === 'string' && regex.test(value),

  email: (value: any): boolean =>
    typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),

  url: (value: any): boolean => {
    if (typeof value !== 'string') return false;
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  },

  hex: (value: any): boolean =>
    typeof value === 'string' && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value),
};

/**
 * Create a required validator
 */
export function required(validator: ValidatorFunction): ValidationRule {
  return {
    validator,
    required: true,
  };
}

/**
 * Validate props against a schema
 */
export function validateProps(
  props: Record<string, any>,
  schema: ValidationSchema,
  componentName: string,
  throwOnError = false,
): boolean {
  let isValid = true;

  for (const [propName, rules] of Object.entries(schema)) {
    const rulesArray = Array.isArray(rules) ? rules : [rules];
    const propValue = props[propName];

    for (const rule of rulesArray) {
      // Check if required
      if (rule.required && (propValue === undefined || propValue === null)) {
        const error = new RequiredPropError(componentName, propName);

        errorLogger.error(
          ErrorCategory.PROP_VALIDATION,
          error.message,
          { componentName, props },
          error,
        );

        if (throwOnError) throw error;
        isValid = false;
        continue;
      }

      // Skip validation if not required and value is undefined/null
      if (!rule.required && (propValue === undefined || propValue === null)) {
        continue;
      }

      // Run validator
      try {
        const validationResult = rule.validator(propValue, propName, componentName);

        if (!validationResult) {
          const message = rule.message || `Invalid prop "${propName}"`;
          const error = new PropValidationError(componentName, propName, 'valid value', propValue);

          errorLogger.error(
            ErrorCategory.PROP_VALIDATION,
            message,
            { componentName, props },
            error,
          );

          if (throwOnError) throw error;
          isValid = false;
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));

        errorLogger.error(
          ErrorCategory.PROP_VALIDATION,
          `Validation error for prop "${propName}": ${error.message}`,
          { componentName, props },
          error,
        );

        if (throwOnError) throw error;
        isValid = false;
      }
    }
  }

  return isValid;
}

/**
 * Validate enum prop
 */
export function validateEnum<T extends string>(
  value: any,
  validValues: T[],
  propName: string,
  componentName: string,
): value is T {
  if (!validValues.includes(value)) {
    const error = new InvalidPropValueError(componentName, propName, validValues, value);

    errorLogger.error(
      ErrorCategory.PROP_VALIDATION,
      error.message,
      { componentName, props: { [propName]: value } },
      error,
    );

    return false;
  }

  return true;
}

/**
 * Safe event handler wrapper
 */
export function safeEventHandler<E extends React.SyntheticEvent>(
  handler: ((event: E) => void) | undefined,
  componentName: string,
  eventName: string,
): ((event: E) => void) | undefined {
  if (!handler) return undefined;

  return (event: E) => {
    try {
      handler(event);
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));

      errorLogger.error(
        ErrorCategory.EVENT_HANDLER,
        `Error in ${eventName} handler`,
        {
          componentName,
          additionalInfo: {
            event: eventName,
            eventType: event.type,
            target: event.target,
          },
        },
        err,
      );

      // Re-throw in development
      if (process.env.NODE_ENV === 'development') {
        throw error;
      }
    }
  };
}
