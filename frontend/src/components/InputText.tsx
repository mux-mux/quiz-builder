import { useId, type InputHTMLAttributes } from 'react';

export type InputTextProps = {
  label?: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;

export function InputText({ label, className, ...props }: InputTextProps) {
  const id = useId();

  return (
    <>
      {label && (
        <label htmlFor={id} className="block text-xl">
          {label}
        </label>
      )}
      <input
        type="text"
        id={id}
        {...props}
        className={`input border rounded-md border-gray-200 ${className}`}
      />
    </>
  );
}
