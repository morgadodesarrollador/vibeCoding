import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mosque focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-mosque text-white shadow-lg shadow-mosque/20 hover:bg-mosque/90",
        outline:
          "border border-nordic-dark/10 bg-transparent text-nordic-dark hover:border-mosque hover:text-mosque dark:border-white/10 dark:text-white",
        ghost: "text-nordic-dark hover:bg-mosque/10 hover:text-mosque dark:text-white",
        secondary: "bg-white text-nordic-dark shadow-card hover:shadow-soft dark:bg-white/10 dark:text-white",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 px-3",
        lg: "h-13 px-6 py-4",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { buttonVariants };
