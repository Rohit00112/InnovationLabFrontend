import { notFound } from "next/navigation";
import { TEMPORARILY_HIDE_ADMIN_AND_LOGIN_ROUTES } from "@/constants/routeAccess";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (TEMPORARILY_HIDE_ADMIN_AND_LOGIN_ROUTES) {
    notFound();
  }

  return children;
}