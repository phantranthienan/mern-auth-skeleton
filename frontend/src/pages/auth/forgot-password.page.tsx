import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

import { LINKS } from '@/constants/links';

const ForgotPasswordPage = () => {
  return (
    <div>
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-bold">Forgot Your Password?</h1>
        <p className="text-base-content/60">
          Enter your email to receive a reset link
        </p>
      </header>

      <form onSubmit={() => {}} className="space-y-3">
        <div className="fieldset w-xs sm:w-sm">
          <span className="fieldset-label text-base font-medium">Email</span>
          <div className="input input-bordered w-full">
            <Mail className="text-base-content/40 pointer-events-none" />
            <input type="text" placeholder="you@example.com" />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={false}
        >
          Receive Reset Link
        </button>
      </form>

      <footer className="mt-8 text-center">
        <p className="text-base-content/60">
          Remember now?{' '}
          <Link to={LINKS.LOGIN} className="link link-primary">
            Back to login
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default ForgotPasswordPage;
