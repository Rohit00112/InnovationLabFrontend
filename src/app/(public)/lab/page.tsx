import React from "react";
import PageLayout from "@/components/primitives/PageLayout";
import PageHeader from "@/components/primitives/PageHeader";
import { publicLabText, publicPageTitles } from "@/constants/ui/public";

const Lab = () => {
  return (
    <PageLayout>
      <PageHeader title={publicPageTitles.lab} />
      <div className="flex min-h-[50vh] items-center justify-center bg-white p-6 md:p-12">
        <p className="text-lg text-gray-600">{publicLabText.content}</p>
      </div>
    </PageLayout>
  );
};

export default Lab;
