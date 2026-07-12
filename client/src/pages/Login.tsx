import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdEmail, MdLock, MdDirectionsBus, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@transitops.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  const demoCredentials = [
    { label: 'Admin', email: 'admin@transitops.com', password: 'admin123' },
    { label: 'Fleet Manager', email: 'fleet@transitops.com', password: 'fleet123' },
    { label: 'Driver', email: 'driver@transitops.com', password: 'driver123' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* Left Panel */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-blue-500 blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-cyan-500 blur-3xl" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <MdDirectionsBus size={22} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-white">
              Transit<span className="text-blue-400">Ops</span>
            </span>
          </div>

          <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
            Manage your fleet<br />
            <span className="text-blue-400">smarter & faster</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            A comprehensive Transport Management System for modern logistics operations.
          </p>
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-3 gap-4">
          {[
            { label: 'Vehicles Tracked', value: '500+' },
            { label: 'Trips Managed', value: '10K+' },
            { label: 'Cost Saved', value: '30%' },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-4">
              <p className="text-2xl font-bold text-blue-400">{s.value}</p>
              <p className="text-xs text-slate-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-1 flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <MdDirectionsBus size={22} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-white">
              Transit<span className="text-blue-400">Ops</span>
            </span>
          </div>

          <h2 className="text-2xl font-bold text-slate-100 mb-1">Welcome back</h2>
          <p className="text-slate-500 text-sm mb-8">Sign in to your account to continue</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              id="email"
              type="email"
              label="Email Address"
              placeholder="you@transitops.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<MdEmail size={16} />}
              required
            />

            <div>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<MdLock size={16} />}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="mt-1 flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPassword ? <MdVisibilityOff size={14} /> : <MdVisibility size={14} />}
                {showPassword ? 'Hide' : 'Show'} password
              </button>
            </div>

            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full justify-center"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 rounded-xl border border-slate-700/50 bg-slate-800/40 p-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Demo Credentials
            </p>
            <div className="space-y-2">
              {demoCredentials.map((cred) => (
                <button
                  key={cred.email}
                  type="button"
                  onClick={() => { setEmail(cred.email); setPassword(cred.password); }}
                  className="w-full flex items-center justify-between rounded-lg bg-slate-700/50 hover:bg-slate-700 px-3 py-2 text-xs transition-colors text-left"
                >
                  <span className="font-medium text-slate-300">{cred.label}</span>
                  <span className="text-slate-500">{cred.email}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
