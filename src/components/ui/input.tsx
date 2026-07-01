import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={twMerge(
          'w-full rounded-md border-gray-300 shadow-sm',
          'focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50',
          'focus:outline-none caret-blue-500',
          'placeholder:text-gray-400',
          'transition-colors duration-200',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';