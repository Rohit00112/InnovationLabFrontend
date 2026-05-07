"use client";

import React from "react";
import { useTransition } from "./TransitionProvider";

export default function TransitionLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { navigateWithTransition } = useTransition();

  const onClick: React.MouseEventHandler = async (e) => {
    e.preventDefault();
    await navigateWithTransition(href);
  };

  return (
    <a href={href} onClick={onClick} className={className}>
      {children}
    </a>
  );
}
