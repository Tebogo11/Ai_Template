type LoadingProps = {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "neutral"
    | "base-100"
    | "base-content";
};

const Loading = ({ size = "md", color = "primary" }: LoadingProps) => {
  return (
    <div>
      <span
        className={`loading loading-spinner  text-${color} loading-${size}`}
      />
    </div>
  );
};

export default Loading;
