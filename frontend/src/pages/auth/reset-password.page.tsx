import { useState } from 'react';

import { LockKeyhole, Eye, EyeOff } from 'lucide-react';

const ResetPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-bold">Reset Your Password</h1>
        <p className="text-base-content/60">Enter your new password below</p>
      </header>

      <form onSubmit={() => {}} className="space-y-3">
        <div className="fieldset w-xs sm:w-sm">
          <span className="fieldset-label text-base font-medium">Password</span>
          <div className="input input-bordered w-full">
            <LockKeyhole className="text-base-content/40 pointer-events-none" />
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

        <div className="fieldset w-xs sm:w-sm">
          <span className="fieldset-label text-base font-medium">
            Confirm Password
          </span>
          <div className="input input-bordered w-full">
            <LockKeyhole className="text-base-content/40 pointer-events-none" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="•••••••••••••••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={false}
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
