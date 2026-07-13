import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <p className="text-6xl font-medium text-border mb-4">404</p>
      <h1 className="text-xl font-medium tracking-tight mb-2">Page not found</h1>
      <p className="text-sm text-muted mb-8 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link to="/">
        <Button>Back to home</Button>
      </Link>
    </div>
  );
}
