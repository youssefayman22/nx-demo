import "./input.css";

type InputProps = {
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "number" | "password";
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
};

export const Input = ({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
}: InputProps) => {
  return (
    <div className="neo-input">
      <label className="neo-input__label">{label}</label>
      <input
        className={`neo-input__field ${error ? "neo-input__field--error" : ""}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
      {error && <span className="neo-input__error">{error}</span>}
    </div>
  );
};
