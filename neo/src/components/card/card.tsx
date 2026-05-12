import "./card.css";

type CardProps = {
  title?: string;
  children: React.ReactNode;
  variant?: "default" | "elevated" | "outlined";
};

//comment
export const Card = ({ title, children, variant = "default" }: CardProps) => {
  return (
    <div className={`neo-card neo-card--${variant}`}>
      {title && <div className="neo-card__header">{title}</div>}
      <div className="neo-card__body">{children}</div>
    </div>
  );
};
