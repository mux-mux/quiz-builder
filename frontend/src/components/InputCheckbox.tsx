import { useId, type InputHTMLAttributes } from 'react';

export type InputCheckboxProps = {
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function InputCheckbox({ label, ...props }: InputCheckboxProps) {
  const id = useId();

  return (
    <>
      <input type="checkbox" id={id} {...props} />
      {label && (
        <label htmlFor={id} className="pl-1 pr-2">
          {label}
        </label>
      )}
    </>
  );
}
