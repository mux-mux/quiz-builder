import { useNavigate } from 'react-router';
import Button from './Button';
import type { ReactNode } from 'react';

interface BackButtonProps {
  children: ReactNode;
}

export function BackButton({ children }: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <Button variant="outline" onClick={() => navigate(-1)}>
      {children}
    </Button>
  );
}
