import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "icon";
};

export function Button({ className, variant = "ghost", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        variant === "icon" ? "icon-button" : "pill-button",
        variant === "primary" && "primary",
        variant === "ghost" && "ghost",
        className
      )}
      {...props}
    />
  );
}
