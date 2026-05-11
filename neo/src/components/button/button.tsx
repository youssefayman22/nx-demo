import "./button.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

// comment
export const Button = ({ variant = "primary", className, children, type = "button", ...props }: ButtonProps) => {
  const buttonClassName = className
    ? `neo-button neo-button--${variant} ${className}`
    : `neo-button neo-button--${variant}`;

  return (
    <button className={buttonClassName} type={type} {...props}>
      {children}
    </button>
  );
};
