import React from "react";

type LoadingProps = {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};
const Loading = ({ size = "md" }: LoadingProps) => {
  return (
    <div>
      <span
        className={`loading loading-spinner text-primary loading-${size}`}
      />
    </div>
  );
};

export default Loading;
