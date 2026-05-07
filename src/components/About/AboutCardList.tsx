import React from "react";
import { AboutCard } from "./AboutCard";

type AboutCardListItem = {
  title: string;
  category: string;
  imageUrl: string;
};

type AboutCardListProps = {
  items: AboutCardListItem[];
};

export default function AboutCardList({ items }: AboutCardListProps) {
  return (
    <>
      <div className="w-full bg-white px-4 pb-10 pt-6 sm:px-6 sm:pb-12 md:px-8 md:pb-22 md:pt-30">
        <div className="w-full">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((about) => (
              <AboutCard
                key={about.title}
                title={about.title}
                category={about.category}
                imageUrl={about.imageUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
