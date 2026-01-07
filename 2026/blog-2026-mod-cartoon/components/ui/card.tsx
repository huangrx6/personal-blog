import { HTMLAttributes } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined" | "flat";
  hover?: boolean;
}

export function Card({
  children,
  variant = "default",
  hover = false,
  className = "",
  ...props
}: CardProps) {
  const baseStyles = [
    "rounded-xl",
    "p-6",
    "transition-all",
    "duration-200",
    "ease-out",
  ];

  const variantStyles = {
    default: [
      "bg-surface",
      "shadow-md",
      "border",
      "border-border",
    ],
    elevated: [
      "bg-surface",
      "shadow-lg",
      "border",
      "border-border-light",
    ],
    outlined: [
      "bg-surface",
      "shadow-sm",
      "border-2",
      "border-border",
    ],
    flat: [
      "bg-surface",
      "shadow-none",
      "border",
      "border-border-light",
    ],
  };

  const hoverStyles = hover
    ? [
        "hover:shadow-xl",
        "hover:-translate-y-1",
        "cursor-pointer",
      ]
    : [];

  const classes = [
    ...baseStyles,
    ...variantStyles[variant],
    ...hoverStyles,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export function CardHeader({
  children,
  className = "",
  ...props
}: CardHeaderProps) {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export function CardTitle({
  children,
  className = "",
  ...props
}: CardTitleProps) {
  return (
    <h3
      className={`text-xl font-bold font-heading text-text ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

export function CardContent({
  children,
  className = "",
  ...props
}: CardContentProps) {
  return (
    <div className={`text-text-muted ${className}`} {...props}>
      {children}
    </div>
  );
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

export function CardFooter({
  children,
  className = "",
  ...props
}: CardFooterProps) {
  return (
    <div className={`mt-4 pt-4 border-t border-border-light ${className}`} {...props}>
      {children}
    </div>
  );
}
