import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser, clearAuthError } from "../features/auth/authSlice";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(registerUser(form));

    if (registerUser.fulfilled.match(result)) {
      toast.success("Account created! Please sign in.");
      dispatch(clearAuthError());
      navigate("/login");
    }
  };

  return (
    <div className="max-w-sm mx-auto px-4 py-16 md:py-24">
      <p className="section-title text-center mb-2">Account</p>
      <h1 className="text-2xl font-medium tracking-tight text-center mb-8">Create account</h1>

      <form onSubmit={handleSubmit} className="border border-border p-6 space-y-5 bg-surface">
        {error && (
          <div className="text-sm text-muted border border-border p-3">{error}</div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <Input label="First name" value={form.firstName} onChange={handleChange("firstName")} required />
          <Input label="Last name" value={form.lastName} onChange={handleChange("lastName")} required />
        </div>
        <Input label="Email" type="email" value={form.email} onChange={handleChange("email")} required />
        <Input label="Username" value={form.username} onChange={handleChange("username")} required />
        <Input label="Password" type="password" value={form.password} onChange={handleChange("password")} required />

        <Button type="submit" className="w-full" size="lg" disabled={status === "loading"}>
          {status === "loading" ? "Creating..." : "Register"}
        </Button>
      </form>

      <p className="text-center text-xs text-muted mt-6">
        Have an account?{" "}
        <Link to="/login" className="text-brand hover:opacity-60 transition-opacity">
          Sign in
        </Link>
      </p>
    </div>
  );
}
