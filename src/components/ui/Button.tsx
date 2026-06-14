import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "outline" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-forest text-cream hover:bg-moss disabled:bg-stone disabled:text-cream/70",
  outline:
    "border border-forest text-forest hover:bg-forest hover:text-cream disabled:border-stone disabled:text-stone",
  ghost: "text-forest hover:text-moss disabled:text-stone",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center px-8 py-3 text-xs uppercase tracking-[0.2em] transition-colors duration-300 ease-smooth disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
