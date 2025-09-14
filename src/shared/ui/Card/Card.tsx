import React from "react";
import { cn } from "@/shared/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined";
  padding?: "sm" | "md" | "lg";
  interactive?: boolean;
}

// Reusable Card component
export const Card = React.memo<CardProps>(
  ({
    children,
    className,
    variant = "default",
    padding = "md",
    interactive = false,
    ...props
  }) => {
    const baseClasses = "bg-white rounded-lg transition-all duration-200";

    const variantClasses = {
      default: "shadow-sm border border-gray-200",
      elevated: "shadow-md border border-gray-100",
      outlined: "border-2 border-gray-200",
    };

    const paddingClasses = {
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
    };

    const interactiveClasses = interactive
      ? "hover:shadow-lg hover:border-gray-300 cursor-pointer"
      : "";

    return (
      <div
        className={cn(
          baseClasses,
          variantClasses[variant],
          paddingClasses[padding],
          interactiveClasses,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
