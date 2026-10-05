import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SEO from '../../utils/seo';
import { Lock, Mail, AlertCircle, ArrowLeft, ShieldCheck, KeyRound } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login, isAdminAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already authenticated
  const from = location.state?.from?.pathname || '/admin/products';
  if (isAdminAuthenticated) {
    navigate(from, { replace: true });
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    setSubmitting(true);
    const result = login(email, password);
    setSubmitting(false);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error || 'Authentication failed.');
    }
  };

  return (
    <>
      <SEO title="Admin Login" description="MV Finds Private Product Manager Login" />

      <div className="min-h-screen bg-sand-50/50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-500 hover:text-charcoal-900 transition-colors mb-6"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to MV Finds website</span>
            </Link>

            <div className="w-14 h-14 rounded-2xl bg-charcoal-900 text-cream-50 mx-auto flex items-center justify-center shadow-soft mb-4">
              <KeyRound className="w-7 h-7 text-terracotta-400" />
            </div>

            <h1 className="font-serif text-3xl font-bold text-charcoal-900 tracking-tight">
              Product Manager
            </h1>
            <p className="mt-1 text-xs text-charcoal-500 font-medium uppercase tracking-wider">
              Private Content Dashboard
            </p>
          </div>

          {/* Development Security Warning Banner */}
          <div className="mt-6 p-4 rounded-2xl bg-sand-100 border border-sand-200 text-xs text-charcoal-600 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-charcoal-800">
              <ShieldCheck className="w-4 h-4 text-terracotta-600" />
              <span>Development Admin</span>
            </div>
            <p className="text-[11px] leading-relaxed text-charcoal-500">
              Frontend credential verification for local development only. Configure credentials via{' '}
              <code className="bg-sand-200 px-1 py-0.5 rounded font-mono text-[10px]">
                .env
              </code>{' '}
              (defaults: <span className="font-mono font-medium">admin@mvfinds.in</span> /{' '}
              <span className="font-mono font-medium">admin123</span>).
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-6 shadow-soft sm:rounded-3xl sm:px-10 border border-sand-200">
            {error && (
              <div className="mb-5 p-3.5 bg-terracotta-50 border border-terracotta-200 rounded-xl text-terracotta-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
                  Admin Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@mvfinds.in"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-sand-50 border border-sand-200 text-sm text-charcoal-900 focus:bg-white focus:border-charcoal-400 focus:outline-none transition-colors"
                  />
                  <Mail className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3.5 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-sand-50 border border-sand-200 text-sm text-charcoal-900 focus:bg-white focus:border-charcoal-400 focus:outline-none transition-colors"
                  />
                  <Lock className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3.5 pointer-events-none" />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 px-4 rounded-xl bg-charcoal-900 hover:bg-charcoal-800 text-cream-50 font-semibold text-sm transition-all shadow-soft hover:shadow-soft-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Lock className="w-4 h-4 text-terracotta-400" />
                <span>{submitting ? 'Verifying...' : 'Sign In to Manager'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
