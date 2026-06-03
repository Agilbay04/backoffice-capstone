import { Button } from '@/app/_components/ui/button';

interface IErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: IErrorStateProps) {
  return (
    <div className="w-full h-64 bg-white rounded-lg border border-red-200 shadow-sm flex flex-col items-center justify-center gap-3">
      <span className="text-sm font-medium text-red-600">
        {message ?? 'An error occurred.'}
      </span>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>Retry</Button>
      )}
    </div>
  );
}
