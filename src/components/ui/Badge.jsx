const variants = {
  outline: "border border-border text-brand bg-transparent",
  sale: "text-brand bg-transparent",
};

export default function Badge({ children, variant = "outline", className = "" }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
