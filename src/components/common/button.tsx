import clsx from 'clsx';
import { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonSizeKey = 'xs' | 'sm' | 'base' | 'lg' | 'xl';
export type ButtonVariantKey =
  | 'primary'
  | 'secondary'
  | 'white'
  | 'dark'
  | 'danger';
export type RoundedKey = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariantKey;
  loading?: boolean;
  size?: ButtonSizeKey;
  rounded?: RoundedKey;
  fullWidth?: boolean;
  className?: string;
}

const ButtonSize: Record<ButtonSizeKey, string> = {
  xs: 'px-2 py-2 leading-5 text-sm',
  sm: 'px-3 py-2 leading-5 text-sm',
  base: 'px-3 py-1 leading-6 text-sm',
  lg: 'px-4 py-2 text-base',
  xl: 'px-6 py-3 text-base',
};

const ButtonVariants: Record<ButtonVariantKey, string> = {
  primary:
    'text-white border-indigo-700 bg-indigo-700 hover:bg-indigo-800 hover:border-indigo-800 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 active:bg-indigo-700 active:border-indigo-700',
  secondary:
    'border-pink-200 bg-pink-200 text-pink-700 hover:text-pink-700 hover:bg-pink-300 hover:border-pink-300 focus:ring focus:ring-pink-500 focus:ring-opacity-50 active:bg-pink-200 active:border-pink-200',
  white:
    'border border-gray-300 text-gray-700 bg-white hover:bg-gray-300 focus:outline-none focus:ring-offset-2 focus:ring-brand-500',
  dark: 'border border-gray-300 dark:border-gray-800 dark:text-gray-100 bg-white shadow-sm dark:bg-gray-700 hover:bg-gray-50 hover:dark:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-500 active:bg-gray-200 active:dark:bg-gray-800',
  danger:
    'text-white bg-red-700 hover:bg-red-800 border border-red-800 focus:outline-none',
};

export default function Button({
  children,
  variant = 'primary',
  loading = false,
  size = 'base',
  rounded,
  fullWidth,
  className,
  ...props
}: ButtonProps) {
  const sizeStyles = ButtonSize[size];
  const variantStyles = ButtonVariants[variant];

  return (
    <button
      className={clsx(
        'inline-flex justify-center items-center font-medium shadow-sm focus:outline-none cursor-pointer',
        rounded !== 'full' ? sizeStyles : '',
        variantStyles,
        rounded === 'full'
          ? 'rounded-full p-2'
          : rounded
            ? `rounded-${rounded}`
            : 'rounded-md',
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
      {loading && (
        <svg
          className='w-5 h-5 ml-2 fill-current animate-spin'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
        >
          <path fill='none' d='M0 0h24v24H0z' />
          <path d='M12 3a9 9 0 0 1 9 9h-2a7 7 0 0 0-7-7V3z' />
        </svg>
      )}
    </button>
  );
}
