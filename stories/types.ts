// Shared type definitions for better autocomplete
export const ButtonVariants = ['primary', 'secondary', 'ghost', 'danger', 'cyber', 'clipped'] as const;
export type ButtonVariant = typeof ButtonVariants[number];

export const ComponentSizes = ['small', 'medium', 'large'] as const;
export type ComponentSize = typeof ComponentSizes[number];

export const AlertVariants = ['info', 'success', 'warning', 'danger'] as const;
export type AlertVariant = typeof AlertVariants[number];

export const Positions = ['top', 'right', 'bottom', 'left'] as const;
export type Position = typeof Positions[number];

export const InputTypes = ['text', 'email', 'password', 'number', 'tel', 'url', 'search'] as const;
export type InputType = typeof InputTypes[number];