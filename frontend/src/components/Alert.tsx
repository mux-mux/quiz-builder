import { useRef } from 'react';
import useOutsideClick from '../hooks/useOutsideClick.js';

export type StatusTypes = 'success' | 'failed' | 'info';

type AlertProps = {
  status: StatusTypes;
  message: string;
  onClose: () => void;
};

const Alert = ({ status, message, onClose }: AlertProps) => {
  const alertRef = useRef<HTMLDivElement>(null);
  useOutsideClick(alertRef, onClose);

  const variants = {
    success: {
      emoji: '✅',
      bg: 'bg-green-100 text-green-800 border-green-300',
    },
    failed: {
      emoji: '❌',
      bg: 'bg-red-100 text-red-800 border-red-300',
    },
    info: {
      emoji: 'ℹ️',
      bg: 'bg-blue-100 text-blue-800 border-blue-300',
    },
  };

  const { emoji, bg } = variants[status] || variants.info;

  return (
    <div
      ref={alertRef}
      role="alert"
      className={
        `fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center px-4 py-2 rounded z-50 max-w-[280px] w-[80%] justify-center sm:w-auto ` +
        bg
      }
    >
      <span>{emoji}</span>
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
