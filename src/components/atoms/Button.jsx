import React from "react";
import { cn } from "@/utils/cn";

const Button = React.forwardRef(({ 
  className, 
  variant = "default", 
  size = "default",
  children,
  ...props 
}, ref) => {
  const variants = {
    default: "bg-primary text-white hover:bg-primary/90 shadow-sm",
    secondary: "bg-secondary text-white hover:bg-secondary/90 shadow-sm",
    success: "bg-success text-white hover:bg-success/90 shadow-sm",
    outline: "border border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "hover:bg-surface text-primary",
    danger: "bg-error text-white hover:bg-error/90 shadow-sm"
  };

  const sizes = {
    default: "h-10 px-4 py-2 text-sm",
    sm: "h-8 px-3 text-xs",
    lg: "h-12 px-8 text-base"
  };

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;