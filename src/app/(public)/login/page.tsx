import PageLayout from "@/components/primitives/PageLayout";
import PageHeader from "@/components/primitives/PageHeader";
import { publicLoginText, publicPageTitles } from "@/constants/ui/public";

const Login = () => {
  return (
    <PageLayout>
      <PageHeader title={publicPageTitles.login} />
      <div className="flex min-h-[50vh] items-center justify-center bg-white p-6 md:p-12">
        <p className="text-center text-base text-gray-600 md:text-lg">
          {publicLoginText.content}
        </p>
      </div>
    </PageLayout>
  );
};

export default Login;
