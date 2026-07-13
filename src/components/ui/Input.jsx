export default function Input({ label, error, id, className = "", ...props }) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="block text-xs uppercase tracking-wider text-muted mb-2">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full border border-border rounded-sm px-3 py-2.5 text-sm bg-surface transition-colors duration-150 focus:outline-none focus:border-brand ${
          error ? "border-brand" : ""
        }`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-muted">{error}</p>}
    </div>
  );
}
