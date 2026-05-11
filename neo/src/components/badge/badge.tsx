import "./badge.css";

type BadgeProps = {
  children: React.ReactNode;
  variant?: "info" | "success" | "warning" | "error";
};

export const Badge = ({ children, variant = "info" }: BadgeProps) => {
  return <span className={`neo-badge neo-badge--${variant}`}>{children}</span>;
};
