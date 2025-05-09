import { cn } from '@shared/lib/utils';

type Props = {
  onClick: () => void;
  icon: React.ReactNode;
  active?: boolean;
};

export function IconButton({ onClick, icon, active }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn('rounded p-1 hover:bg-muted transition-all', active && 'bg-muted')}
    >
      {icon}
    </button>
  );
}
