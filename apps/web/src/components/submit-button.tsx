'use client';

import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface Props {
  children: React.ReactNode;
  className?: string;
}

function SubmitButton({ children, className }: Props) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      aria-disabled={pending}
      className={cn('w-full mt-2', className)}
    >
      {pending ? 'Submitting...' : children}
    </Button>
  );
}

export default SubmitButton;
