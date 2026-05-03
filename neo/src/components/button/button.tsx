import "./button.css";

// comment to test the build cache
type ButtonProps = {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
};

export const Button = ({ variant = "primary", children }: ButtonProps) => {
  return <button className={`neo-button neo-button--${variant}`}>{children}</button>;
};
