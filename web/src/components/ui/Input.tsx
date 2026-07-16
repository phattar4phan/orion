import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ icon, className = '', ...props }, ref) => {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">
          {icon}
        </div>
      )}
      <input
        ref={ref}
        className={`glass-input ${icon ? 'pl-10' : ''} ${className}`}
        {...props}
      />
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
