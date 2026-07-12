import React from 'react';
import { MdInbox } from 'react-icons/md';
import Button from './Button';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No records found',
  description = 'There are no items to display right now.',
  actionLabel,
  onAction,
  icon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 rounded-full bg-slate-800 p-5 text-slate-600">
        {icon ?? <MdInbox size={36} />}
      </div>
      <h3 className="mb-2 text-base font-semibold text-slate-300">{title}</h3>
      <p className="mb-6 max-w-sm text-sm text-slate-500">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
};

export default EmptyState;
