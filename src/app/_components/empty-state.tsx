interface IEmptyStateProps {
  message?: string;
}

export function EmptyState({ message }: IEmptyStateProps) {
  return (
    <div className="w-full h-64 bg-white rounded-lg border border-slate-200 shadow-sm flex items-center justify-center">
      <span className="text-sm font-medium text-slate-400">
        {message ?? 'No data found.'}
      </span>
    </div>
  );
}
