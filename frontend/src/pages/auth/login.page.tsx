import { useState } from 'react';

import { Mail, KeyRound, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      {/* Header for register form */}
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-bold">Create Account</h1>
        <p className="text-base-content/60">
          Get started with your free account
        </p>
      </header>

      {/* Register form */}
      <form onSubmit={() => {}} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label font-medium">Email</span>
          </label>
          <div className="input input-bordered">
            <Mail className="text-base-content/40 pointer-events-none" />
            <input type="text" placeholder="you@example.com" />
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label font-medium">Password</span>
          </label>
          <div className="input input-bordered">
            <KeyRound className="text-base-content/40 pointer-events-none" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="•••••••••••••••••••••"
            />
            <button
              type="button"
              className="cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="text-base-content/40" />
              ) : (
                <Eye className="text-base-content/40" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={false}
        >
          Create Account
        </button>
      </form>

      {/* Footer for register form */}
      <footer className="mt-8 text-center">
        <p className="text-base-content/60">
          Already have an account?{' '}
          <Link to="/auth/login" className="link link-primary">
            Login
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default LoginPage;
