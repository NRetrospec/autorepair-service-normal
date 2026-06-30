import { cn } from '@/utils/cn';
import { type ReactNode, useState } from 'react';
import { X, Loader2, ChevronDown } from 'lucide-react';

// ===== BUTTON =====
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

export function Button({ variant = 'primary', size = 'md', loading, icon, children, className, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-600/25 focus:ring-primary-500',
    secondary: 'bg-dark-700 hover:bg-dark-600 text-white dark:bg-dark-200 dark:text-dark-900 dark:hover:bg-dark-300 focus:ring-dark-500',
    accent: 'bg-accent-500 hover:bg-accent-600 text-white shadow-lg shadow-accent-500/25 focus:ring-accent-500',
    ghost: 'hover:bg-dark-100 dark:hover:bg-dark-800 text-dark-700 dark:text-dark-300 focus:ring-dark-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/25 focus:ring-red-500',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white dark:border-primary-400 dark:text-primary-400 focus:ring-primary-500',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  };

  return (
    <button className={cn(base, variants[variant], sizes[size], className)} disabled={loading || props.disabled} {...props}>
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : icon}
      {children}
    </button>
  );
}

// ===== CARD =====
interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, hover, glass, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-2xl border transition-all duration-300',
        glass
          ? 'bg-white/5 backdrop-blur-lg border-white/10 dark:bg-dark-900/50'
          : 'bg-white border-dark-200 dark:bg-dark-800 dark:border-dark-700',
        hover && 'hover:shadow-xl hover:shadow-primary-500/5 hover:-translate-y-1 cursor-pointer',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}

// ===== BADGE =====
interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
  const variants = {
    default: 'bg-dark-100 text-dark-700 dark:bg-dark-700 dark:text-dark-300',
    success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  };
  const sizes = { sm: 'px-2 py-0.5 text-xs', md: 'px-3 py-1 text-sm' };

  return <span className={cn('inline-flex items-center font-medium rounded-full', variants[variant], sizes[size], className)}>{children}</span>;
}

// ===== INPUT =====
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

export function Input({ label, error, icon, className, ...props }: InputProps) {
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-medium text-dark-700 dark:text-dark-300">{label}</label>}
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400">{icon}</div>}
        <input
          className={cn(
            'w-full rounded-xl border bg-white px-4 py-2.5 text-dark-900 placeholder-dark-400 transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            'dark:bg-dark-800 dark:border-dark-600 dark:text-white dark:placeholder-dark-500',
            icon && 'pl-10',
            error ? 'border-red-500' : 'border-dark-300 dark:border-dark-600',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

// ===== SELECT =====
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, options, className, ...props }: SelectProps) {
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-medium text-dark-700 dark:text-dark-300">{label}</label>}
      <div className="relative">
        <select
          className={cn(
            'w-full appearance-none rounded-xl border bg-white px-4 py-2.5 pr-10 text-dark-900 transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            'dark:bg-dark-800 dark:border-dark-600 dark:text-white',
            'border-dark-300 dark:border-dark-600',
            className
          )}
          {...props}
        >
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400 pointer-events-none" />
      </div>
    </div>
  );
}

// ===== TEXTAREA =====
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function Textarea({ label, className, ...props }: TextareaProps) {
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-medium text-dark-700 dark:text-dark-300">{label}</label>}
      <textarea
        className={cn(
          'w-full rounded-xl border bg-white px-4 py-2.5 text-dark-900 placeholder-dark-400 transition-colors resize-none',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          'dark:bg-dark-800 dark:border-dark-600 dark:text-white dark:placeholder-dark-500',
          'border-dark-300 dark:border-dark-600',
          className
        )}
        rows={4}
        {...props}
      />
    </div>
  );
}

// ===== MODAL =====
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  if (!isOpen) return null;
  const sizes = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className={cn('relative w-full bg-white dark:bg-dark-800 rounded-2xl shadow-2xl animate-fade-in overflow-hidden', sizes[size])}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-dark-200 dark:border-dark-700">
          <h3 className="text-lg font-bold text-dark-900 dark:text-white">{title}</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-700 transition-colors">
            <X className="w-5 h-5 text-dark-500" />
          </button>
        </div>
        <div className="p-6 max-h-[70vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

// ===== STAT CARD =====
interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: ReactNode;
  color: string;
}

export function StatCard({ title, value, change, changeType = 'neutral', icon, color }: StatCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-dark-500 dark:text-dark-400">{title}</p>
          <p className="mt-1 text-2xl font-bold text-dark-900 dark:text-white">{value}</p>
          {change && (
            <p className={cn('mt-1 text-sm font-medium', changeType === 'positive' ? 'text-green-500' : changeType === 'negative' ? 'text-red-500' : 'text-dark-500')}>
              {change}
            </p>
          )}
        </div>
        <div className={cn('p-3 rounded-xl', color)}>{icon}</div>
      </div>
    </Card>
  );
}

// ===== PROGRESS BAR =====
interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md';
}

export function ProgressBar({ value, max = 100, color = 'bg-primary-500', showLabel, size = 'md' }: ProgressBarProps) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="w-full">
      {showLabel && <div className="flex justify-between text-sm mb-1"><span className="text-dark-600 dark:text-dark-400">{value}/{max}</span><span className="font-medium text-dark-900 dark:text-white">{pct.toFixed(0)}%</span></div>}
      <div className={cn('w-full bg-dark-200 dark:bg-dark-700 rounded-full overflow-hidden', size === 'sm' ? 'h-1.5' : 'h-2.5')}>
        <div className={cn('h-full rounded-full transition-all duration-500', color)} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

// ===== TABS =====
interface TabsProps {
  tabs: { id: string; label: string; icon?: ReactNode }[];
  active: string;
  onChange: (id: string) => void;
}

export function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div className="flex gap-1 p-1 bg-dark-100 dark:bg-dark-800 rounded-xl overflow-x-auto">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap',
            active === tab.id
              ? 'bg-white dark:bg-dark-700 text-primary-600 dark:text-primary-400 shadow-sm'
              : 'text-dark-600 dark:text-dark-400 hover:text-dark-900 dark:hover:text-white'
          )}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// ===== AVATAR =====
export function Avatar({ name, size = 'md', className }: { name: string; size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-lg' };
  const colors = ['bg-primary-500', 'bg-accent-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-cyan-500'];
  const color = colors[name.charCodeAt(0) % colors.length];
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className={cn('rounded-full flex items-center justify-center font-bold text-white', sizes[size], color, className)}>
      {initials}
    </div>
  );
}

// ===== SKELETON LOADER =====
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('shimmer rounded-lg', className)} />;
}

// ===== EMPTY STATE =====
export function EmptyState({ icon, title, description, action }: { icon: ReactNode; title: string; description: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="text-dark-300 dark:text-dark-600 mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-2">{title}</h3>
      <p className="text-dark-500 dark:text-dark-400 mb-6 max-w-sm">{description}</p>
      {action}
    </div>
  );
}

// ===== TOOLTIP =====
export function Tooltip({ children, text }: { children: ReactNode; text: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative inline-block" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-dark-900 dark:bg-dark-100 text-white dark:text-dark-900 text-xs font-medium rounded-lg whitespace-nowrap z-50 animate-fade-in">
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-dark-900 dark:border-t-dark-100" />
        </div>
      )}
    </div>
  );
}

// ===== TOGGLE =====
export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label?: string }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <div
        className={cn('relative w-11 h-6 rounded-full transition-colors', checked ? 'bg-primary-600' : 'bg-dark-300 dark:bg-dark-600')}
        onClick={() => onChange(!checked)}
      >
        <div className={cn('absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform', checked && 'translate-x-5')} />
      </div>
      {label && <span className="text-sm font-medium text-dark-700 dark:text-dark-300">{label}</span>}
    </label>
  );
}
