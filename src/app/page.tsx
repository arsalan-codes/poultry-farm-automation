'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { useLanguage } from '@/lib/language';
import { useTheme } from '@/lib/theme';
import { useRouter } from 'next/navigation';
import { MdDarkMode, MdLightMode, MdLanguage } from 'react-icons/md';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const { t, language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = await login(username, password);
      if (success) {
        router.push('/dashboard');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-md-surface md-p-4">
      <div className="w-full max-w-md">
        <div className="md-card-elevated">
          <div className="flex justify-between items-center mb-md-8">
            <button
              onClick={toggleTheme}
              className="md-fab-small"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <MdDarkMode className="text-lg" /> : <MdLightMode className="text-lg" />}
            </button>
            <button
              onClick={toggleLanguage}
              className="md-button-text md-label-large flex items-center md-gap-1"
            >
              <MdLanguage className="text-sm" />
              {language === 'en' ? 'فا' : 'EN'}
            </button>
          </div>
          
          <div className="text-center mb-md-8">
            <h1 className="md-headline-medium text-md-on-surface mb-md-2">
              {t('app.title')}
            </h1>
            <p className="md-body-medium text-md-on-surface-variant">
              {t('auth.login')}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-md-6">
            <div>
              <label htmlFor="username" className="block md-label-large text-md-on-surface mb-md-2">
                {t('auth.username')}
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="md-input"
                placeholder={t('auth.username')}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block md-label-large text-md-on-surface mb-md-2">
                {t('auth.password')}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="md-input"
                placeholder={t('auth.password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="md-card md-status-danger">
                <p className="md-body-medium text-center">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full md-button-filled"
            >
              <span className="md-label-large">
                {loading ? t('loading') : t('auth.login')}
              </span>
            </button>
          </form>

          <div className="mt-md-8 md-card-outlined">
            <h3 className="md-title-small text-md-on-surface mb-md-3 text-center">
              {t('demo.accounts')}
            </h3>
            <div className="space-y-md-2 md-body-small text-md-on-surface-variant">
              <div className="flex justify-between">
                <span className="font-medium">{t('demo.admin')}:</span>
                <span>admin / admin123</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{t('demo.manager')}:</span>
                <span>manager / manager123</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{t('demo.user')}:</span>
                <span>user / user123</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}