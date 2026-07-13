import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-bg border-t border-border mt-auto">
      <div className="page-container py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted">
        <Link to="/" className="font-semibold text-brand tracking-tight">
          AllMart
        </Link>

        <nav className="flex items-center gap-6">
          <Link to="/products" className="hover:text-brand transition-colors duration-150">
            Catalog
          </Link>
          <Link to="/orders" className="hover:text-brand transition-colors duration-150">
            Orders
          </Link>
          <a
            href="https://github.com/HofmannS/AllMart"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand transition-colors duration-150"
          >
            GitHub
          </a>
        </nav>

        <p className="text-xs">&copy; {new Date().getFullYear()} AllMart</p>
      </div>
    </footer>
  );
}
