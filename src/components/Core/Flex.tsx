import React, { ReactNode } from "react";
import clsx from "clsx";

type FlexProps = {
  children: ReactNode;
  className?: string;
  direction?: "row" | "row-reverse" | "col" | "col-reverse";
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
  align?: "start" | "end" | "center" | "baseline" | "stretch";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  gap?: string; // allow "0" | "1" | "2" | "4" | ... or custom like "px"
};

const Flex: React.FC<FlexProps> = ({
  children,
  className = "",
  direction = "row",
  justify = "start",
  align = "stretch",
  wrap = "nowrap",
  gap = "0",
}) => {
  return (
    <div
      className={clsx(
        "flex",
        `flex-${direction}`,
        `justify-${justify}`,
        `items-${align}`,
        `flex-${wrap}`,
        `gap-${gap}`,
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Flex;
