import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

type PanelProps = HTMLAttributes<HTMLElement> & {
  as?: "section" | "article" | "aside";
};

export function Panel({ as: Element = "section", className, ...props }: PanelProps) {
  return <Element className={cn("panel", className)} {...props} />;
}
