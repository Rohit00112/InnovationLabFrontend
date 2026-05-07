"use client";

import { useRouter } from "next/navigation";

import { logout } from "@/lib/services/domain/auth";

type LogoutButtonProps = {
  redirectTo?: string;
  onLoggedOut?: () => void;
  label?: string;
};

export default function LogoutButton({
  redirectTo = "/login",
  onLoggedOut,
  label = "Logout",
}: LogoutButtonProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      onLoggedOut?.();
      router.replace(redirectTo);
      router.refresh();
    }
  };

  return (
    <button type="button" onClick={handleLogout}>
      {label}
    </button>
  );
}
