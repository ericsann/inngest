'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState(searchParams.get('error') === '1');
  const [loading, setLoading] = useState(false);

  console.log('[LOGIN] Component rendered');
  console.log('[LOGIN] Search params:', searchParams.toString());
  console.log('[LOGIN] Error from params:', searchParams.get('error'));

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const formData = new FormData(e.currentTarget);
    const password = formData.get('password') as string;

    console.log('[LOGIN] Submitting form with password:', password ? '***' : 'empty');

    try {
      console.log('[LOGIN] Making API call to /api/login');
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      console.log('[LOGIN] API response status:', response.status);
      console.log('[LOGIN] API response ok:', response.ok);

      if (response.ok) {
        console.log('[LOGIN] Login successful, redirecting to /');
        router.push('/');
      } else {
        console.log('[LOGIN] Login failed');
        setError(true);
      }
    } catch (err) {
      console.log('[LOGIN] API call error:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Inngest Development Server
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">Digite a senha para acessar</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="password" className="sr-only">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Senha"
              />
            </div>
          </div>

          {error && (
            <div className="text-center text-sm text-red-600">
              Senha incorreta. Tente novamente.
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Entrar
            </button>
          </div>

          {process.env.NODE_ENV === 'development' && (
            <div className="text-center text-xs text-gray-500">
              Senha de desenvolvimento: {process.env.INNGEST_DEV_DASHBOARD_PASSWORD}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
