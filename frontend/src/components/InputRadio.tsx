import { useId, type InputHTMLAttributes } from 'react';

export type InputRadioProps = {
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function InputRadio({ label, ...props }: InputRadioProps) {
  const id = useId();

  return (
    <>
      <input type="radio" id={id} {...props} />
      {label && (
        <label htmlFor={id} className="pl-1 pr-2">
          {label}
        </label>
      )}
    </>
  );
}
