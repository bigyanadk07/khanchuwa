// Login.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginRequest } from "../../api/api";
import { useAuth } from "../../context/AuthContext";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Basic validation
      if (!email || !password) {
        setError("Please fill in all fields");
        setLoading(false);
        return;
      }

      const data = await loginRequest(email, password);

      // Validate response
      if (!data?.token) {
        throw new Error("Invalid response from server");
      }

      // Save token/user in context
      login({
        token: data.token,
        user: data.user || { email } // Include user data if available
      });

      console.log("Logged in successfully");

      // Redirect to dashboard
      navigate("/dashboard", { replace: true });

    } catch (err: any) {
      const errorMessage = err.message || "Invalid credentials";
      setError(errorMessage);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="text-sm text-gray-600">Sign in to your account</p>
          {error && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter your email"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter your password"
                disabled={loading}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                disabled={loading}
              />
              <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <a href="#" className="text-sm text-orange-500 hover:text-orange-600">
              Forgot password?
            </a>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white rounded-lg font-medium transition-colors duration-200"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link 
              to="/signup" 
              className="text-orange-500 hover:text-orange-600 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
        </form>
      </div>
    </div>
  );
};

export default Login;