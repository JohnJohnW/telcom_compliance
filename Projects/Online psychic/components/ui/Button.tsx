import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
    
    const variants = {
      default: 'bg-gradient-mystic text-white hover:opacity-90 focus-visible:ring-mystic-500 glow-effect hover:scale-[1.02] hover:shadow-md hover:shadow-mystic-500/15 active:scale-[0.98] transition-all duration-300',
      outline: 'border border-mystic-600 bg-transparent text-mystic-200 hover:bg-mystic-800/20 focus-visible:ring-mystic-500 hover:border-mystic-500 hover:scale-[1.02] hover:shadow-sm hover:shadow-mystic-500/10 active:scale-[0.98] transition-all duration-300',
      ghost: 'text-mystic-200 hover:bg-mystic-800/20 focus-visible:ring-mystic-500 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300',
    }
    
    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 py-2',
      lg: 'h-12 px-6 text-lg',
    }

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

