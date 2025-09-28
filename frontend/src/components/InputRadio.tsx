import { useId, type InputHTMLAttributes } from 'react';

export type FormInputProps = {
  label?: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function InputRadio({ label, className, ...props }: FormInputProps) {
  const id = useId();

  return (
    <>
      <input type="radio" id={id} {...props} className={`${className}`} />
      {label && (
        <label htmlFor={id} className="pl-1 pr-2">
          {label}
        </label>
      )}
    </>
  );
}
