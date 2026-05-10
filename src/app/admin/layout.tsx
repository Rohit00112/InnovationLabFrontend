
import React from "react";
import { notFound } from "next/navigation";
import AdminSideBar from "@/components/Admin/AdminSideBar";
import { TEMPORARILY_HIDE_ADMIN_AND_LOGIN_ROUTES } from "@/constants/routeAccess";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	if (TEMPORARILY_HIDE_ADMIN_AND_LOGIN_ROUTES) {
		notFound();
	}

	return (
		<>
			<div className="flex h-dvh overflow-hidden bg-white min-h-0">
				<AdminSideBar />
				<main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
			</div>
		</>
	);
}

