/**
 * Custom error classes for Snake Eater UI component library
 */

export class ComponentError extends Error {
  public componentName: string;
  public props?: Record<string, any>;

  constructor(componentName: string, message: string, props?: Record<string, any>) {
    super(`[${componentName}] ${message}`);
    this.name = 'ComponentError';
    this.componentName = componentName;
    this.props = props;

    // Maintains proper stack trace for where error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ComponentError);
    }
  }
}

export class PropValidationError extends ComponentError {
  public propName: string;
  public expectedType: string;
  public receivedValue: any;

  constructor(componentName: string, propName: string, expectedType: string, receivedValue: any) {
    const receivedType = Array.isArray(receivedValue)
      ? 'array'
      : receivedValue === null
        ? 'null'
        : typeof receivedValue;

    super(
      componentName,
      `Invalid prop "${propName}": expected ${expectedType}, received ${receivedType}`,
      { [propName]: receivedValue },
    );

    this.name = 'PropValidationError';
    this.propName = propName;
    this.expectedType = expectedType;
    this.receivedValue = receivedValue;
  }
}

export class RequiredPropError extends ComponentError {
  public propName: string;

  constructor(componentName: string, propName: string) {
    super(componentName, `Required prop "${propName}" is missing`);
    this.name = 'RequiredPropError';
    this.propName = propName;
  }
}

export class InvalidPropValueError extends ComponentError {
  public propName: string;
  public validValues: any[];
  public receivedValue: any;

  constructor(componentName: string, propName: string, validValues: any[], receivedValue: any) {
    super(
      componentName,
      `Invalid value for prop "${propName}": received "${receivedValue}", expected one of [${validValues.join(', ')}]`,
      { [propName]: receivedValue },
    );

    this.name = 'InvalidPropValueError';
    this.propName = propName;
    this.validValues = validValues;
    this.receivedValue = receivedValue;
  }
}

export class EventHandlerError extends ComponentError {
  public eventName: string;
  public originalError: Error;

  constructor(componentName: string, eventName: string, originalError: Error) {
    super(componentName, `Error in ${eventName} event handler: ${originalError.message}`);

    this.name = 'EventHandlerError';
    this.eventName = eventName;
    this.originalError = originalError;
    this.stack = originalError.stack;
  }
}

export class StateError extends ComponentError {
  public stateName: string;
  public invalidState: any;

  constructor(componentName: string, stateName: string, message: string, invalidState?: any) {
    super(componentName, `State error in "${stateName}": ${message}`);
    this.name = 'StateError';
    this.stateName = stateName;
    this.invalidState = invalidState;
  }
}

export class RenderError extends ComponentError {
  public phase: 'mount' | 'update' | 'unmount';
  public originalError: Error;

  constructor(
    componentName: string,
    phase: 'mount' | 'update' | 'unmount',
    originalError: Error,
    props?: Record<string, any>,
  ) {
    super(componentName, `Render error during ${phase}: ${originalError.message}`, props);

    this.name = 'RenderError';
    this.phase = phase;
    this.originalError = originalError;
    this.stack = originalError.stack;
  }
}

export class AccessibilityError extends ComponentError {
  public issue: string;
  public recommendation: string;

  constructor(componentName: string, issue: string, recommendation: string) {
    super(componentName, `Accessibility issue: ${issue}. Recommendation: ${recommendation}`);

    this.name = 'AccessibilityError';
    this.issue = issue;
    this.recommendation = recommendation;
  }
}
