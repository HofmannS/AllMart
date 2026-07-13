import { Link } from "react-router-dom";

export default function SectionHeader({ label, title, linkTo, linkText = "View all" }) {
  return (
    <div className="flex justify-between items-end mb-8">
      <div>
        {label && <p className="section-title mb-2">{label}</p>}
        <h2 className="text-2xl md:text-3xl font-medium tracking-tight">{title}</h2>
      </div>
      {linkTo && (
        <Link
          to={linkTo}
          className="text-sm text-muted hover:text-brand transition-colors duration-150 hidden sm:block"
        >
          {linkText} →
        </Link>
      )}
    </div>
  );
}
