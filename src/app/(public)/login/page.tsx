"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageLayout from "@/components/primitives/PageLayout";
import PageHeader from "@/components/primitives/PageHeader";
import LoginFormCard from "@/components/Login/LoginFormCard";
import { publicLoginText, publicPageTitles } from "@/constants/ui/public";

const Login = () => {
  return (
    <PageLayout>
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 bg-white p-6 md:p-12">
        <LoginFormCard />
      </div>
    </PageLayout>
  );
};

export default Login;
