import { useId, type InputHTMLAttributes } from 'react';

export type InputSelectProps = {
  options: string[];
  label?: string;
} & InputHTMLAttributes<HTMLSelectElement>;

export function InputSelect({ options, label, ...props }: InputSelectProps) {
  const id = useId();

  return (
    <>
      {label && (
        <label htmlFor={id} className="pl-1 pr-2">
          {label}
        </label>
      )}
      <select id={id} {...props}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}
