import PageLayout from "@/components/primitives/PageLayout";
import PageHeader from "@/components/primitives/PageHeader";
import LoginFormCard from "@/components/Login/LoginFormCard";
import { publicLoginText, publicPageTitles } from "@/constants/ui/public";

const Login = () => {
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
