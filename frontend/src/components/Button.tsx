import type { ReactNode, ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  const base = 'btn';
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
  };

  return (
    <button
      className={`${base} ${variants[variant]}${
        className ? ` ${className}` : ''
      }`}
      {...props}
    >
      {children}
    </button>
  );
}
