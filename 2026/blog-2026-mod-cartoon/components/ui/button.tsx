import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      fullWidth = false,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = [
      "inline-flex",
      "items-center",
      "justify-center",
      "gap-2",
      "font-medium",
      "transition-all",
      "duration-200",
      "ease-out",
      "cursor-pointer",
      "focus-visible:outline-2",
      "focus-visible:outline-offset-2",
      "focus-visible:outline-primary",
      "disabled:cursor-not-allowed",
      "disabled:opacity-50",
    ];

    const variantStyles = {
      primary: [
        "bg-primary",
        "text-white",
        "hover:bg-primary-light",
        "active:scale-[0.98]",
        "shadow-md",
        "hover:shadow-lg",
      ],
      secondary: [
        "bg-secondary",
        "text-white",
        "hover:bg-secondary-light",
        "active:scale-[0.98]",
        "shadow-md",
        "hover:shadow-lg",
      ],
      outline: [
        "bg-transparent",
        "text-text",
        "border-2",
        "border-text",
        "hover:bg-text",
        "hover:text-white",
        "active:scale-[0.98]",
      ],
      ghost: [
        "bg-transparent",
        "text-text",
        "hover:bg-border-light",
        "active:scale-[0.98]",
      ],
    };

    const sizeStyles = {
      sm: ["px-4", "py-2", "text-sm", "rounded-md"],
      md: ["px-6", "py-3", "text-base", "rounded-lg"],
      lg: ["px-8", "py-4", "text-lg", "rounded-xl"],
    };

    const widthStyles = fullWidth ? ["w-full"] : [];

    const classes = [
      ...baseStyles,
      ...variantStyles[variant],
      ...sizeStyles[size],
      ...widthStyles,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
