"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";

import { LocalApiError } from "@/lib/services/bff-client";
import { useRouter, useSearchParams } from "next/navigation";

import { login as loginRequest } from "@/lib/services/domain/auth";

const DEFAULT_RETURN_TO = "/admin";

function normalizeReturnTo(value: string | null): string {
  if (!value) {
    return DEFAULT_RETURN_TO;
  }

  if (!value.startsWith("/") || value.startsWith("//")) {
    return DEFAULT_RETURN_TO;
  }

  return value;
}

export default function LoginFormCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const returnTo = useMemo(
    () =>
      normalizeReturnTo(
        searchParams.get("returnTo") ?? searchParams.get("redirect"),
      ),
    [searchParams],
  );

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoggingIn(true);

    try {
      await loginRequest({ email, password });
      setSuccess("Login successful. Redirecting to admin...");
      router.replace(returnTo);
    } catch (err) {
      if (err instanceof LocalApiError) {
        setError(err.message);
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="w-full max-w-xl rounded-xl border border-(--neutral-200) bg-white p-6 shadow-sm md:p-8">
      <form className="space-y-4" onSubmit={handleLogin}>
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-(--neutral-700)"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
            className="block w-full rounded-md border border-(--neutral-400) p-2.5 shadow-sm transition-colors focus:border-(--color-primary) focus:ring-(--color-primary)"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-(--neutral-700)"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
            className="block w-full rounded-md border border-(--neutral-400) p-2.5 shadow-sm transition-colors focus:border-(--color-primary) focus:ring-(--color-primary)"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          disabled={isLoggingIn}
          className="w-full rounded-md bg-(--color-primary) px-4 py-2.5 font-medium text-white transition-colors hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-(--color-primary) focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoggingIn ? "Signing in..." : "Sign in"}
        </button>
      </form>

      {error && (
        <div className="mt-4 rounded-md border border-error bg-error-background p-3 text-sm text-error">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-4 rounded-md border border-success bg-success-background p-3 text-sm text-success">
          {success}
        </div>
      )}
    </div>
  );
}
