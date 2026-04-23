import "./label.css";

type LabelProps = {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
};

export const Label = ({ variant = "primary", children }: LabelProps) => {
  return <span className={`neo-label neo-label--${variant}`}>{children}</span>;
};
