import { CSSProperties, ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";

type RevealProps = {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
  variant?: "up" | "down" | "left" | "right" | "fade" | "scale";
  className?: string;
  style?: CSSProperties;
};

export default function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  variant = "up",
  className = "",
  style,
}: RevealProps) {
  const ref = useReveal<HTMLElement>();
  return (
    // @ts-expect-error dynamic tag
    <Tag
      // @ts-expect-error dynamic intrinsic tag ref
      ref={ref}
      className={`reveal reveal-${variant} ${className}`.trim()}
      style={{ "--reveal-delay": `${delay}ms`, ...style } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
