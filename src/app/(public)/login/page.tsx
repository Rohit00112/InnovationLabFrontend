"use client";

import PageLayout from "@/components/primitives/PageLayout";
import LoginFormCard from "@/components/Login/LoginFormCard";

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
