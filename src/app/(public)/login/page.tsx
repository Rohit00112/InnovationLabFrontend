"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageLayout from "@/components/primitives/PageLayout";
import PageHeader from "@/components/primitives/PageHeader";
import LoginFormCard from "@/components/Login/LoginFormCard";
import { publicLoginText, publicPageTitles } from "@/constants/ui/public";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        process.env.BACKEND_API_BASE_URL + "users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Login failed");
      }

      localStorage.setItem("token", data.Token);

      // Redirect after login
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <PageHeader title={publicPageTitles.login} />
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 bg-white p-6 md:p-12">
        <p className="max-w-2xl text-center text-base text-gray-600 md:text-lg">
          {publicLoginText.content}
        </p>
        <LoginFormCard />
      </div>
    </PageLayout>
  );
};

export default Login;
