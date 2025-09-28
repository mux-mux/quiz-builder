import { useEffect } from 'react';

export function useOutsideClick<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  onClose: () => void
) {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onClose]);
}

export default useOutsideClick;
