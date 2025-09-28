import { useRef } from 'react';
import useOutsideClick from '../hooks/useOutsideClick.js';

type AlertProps = {
  variant: string;
  message: string;
  onClose: () => void;
};

const Alert = ({ variant, message, onClose }: AlertProps) => {
  const alertRef = useRef<HTMLDivElement>(null);
  useOutsideClick(alertRef, onClose);

  const classNames =
    variant === 'success'
      ? 'bg-teal-100 border-teal-400 text-teal-700'
      : 'bg-red-100 border-red-400 text-red-700';

  return (
    <div
      ref={alertRef}
      role="alert"
      className={
        `fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center px-4 py-2 rounded z-50 ` +
        classNames
      }
    >
      <span>{message}</span>
      <button
        className="p-1 ml-3 hover:cursor-pointer hover:opacity-80"
        onClick={onClose}
        aria-label={`Close ${message}`}
      >
        <b>X</b>
      </button>
    </div>
  );
};
export default Alert;
