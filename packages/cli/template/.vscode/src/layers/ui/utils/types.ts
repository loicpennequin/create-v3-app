export type ButtonVariant = 'full' | 'outlined' | 'ghost' | 'light';

export type BaseButtonProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  leftIcon?: string;
  rightIcon?: string;
  isLoading?: boolean;
  pill?: boolean;
};

export type ViewportBreakpoint =
  | 'xxs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'xxl';
