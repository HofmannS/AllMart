import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { login, clearAuthError } from "../features/auth/authSlice";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const { status, error, token } = useSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (token) navigate(redirect);
  }, [token, navigate, redirect]);

  useEffect(() => {
    return () => dispatch(clearAuthError());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login({ username, password }));

    if (login.fulfilled.match(result)) {
      toast.success("Welcome back!");
      navigate(redirect);
    }
  };

  return (
    <div className="max-w-sm mx-auto px-4 py-16 md:py-24">
      <p className="section-title text-center mb-2">Account</p>
      <h1 className="text-2xl font-medium tracking-tight text-center mb-8">Sign in</h1>

      <p className="text-muted text-center text-xs mb-8">
        Demo: <code className="border border-border px-1">emilys</code> / <code className="border border-border px-1">emilyspass</code>
      </p>

      <form onSubmit={handleSubmit} className="border border-border p-6 space-y-5 bg-surface">
        {error && (
          <div className="text-sm text-muted border border-border p-3">{error}</div>
        )}

        <Input
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit" className="w-full" size="lg" disabled={status === "loading"}>
          {status === "loading" ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <p className="text-center text-xs text-muted mt-6">
        No account?{" "}
        <Link to="/register" className="text-brand hover:opacity-60 transition-opacity">
          Register
        </Link>
      </p>
    </div>
  );
}
