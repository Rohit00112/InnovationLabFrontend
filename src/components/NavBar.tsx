"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import TransitionLink from "./TransitionLink";
import PageLayout from "./primitives/PageLayout";
import { navigationRoutes } from "@/constants/ui/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <PageLayout>
      <nav className="site-navbar sticky top-0 z-50 border-b border-gray-300 bg-white/80 px-4 py-4 backdrop-blur-md md:px-12 md:py-5">
        <div className="flex items-center justify-between gap-4">
          <div className="text-lg font-black tracking-tighter uppercase">
            <Image
              src="/ivLabsLogo.svg"
              alt="Innovation Lab Logo"
              width={120}
              height={32}
              className="h-8 w-auto scale-190"
            />
          </div>

          <div className="hidden md:flex gap-10 text-[14px] font-bold uppercase tracking-[2px]">
            <TransitionLink
              href={navigationRoutes.home}
              className="hover:text-primary transition-colors"
            >
              Home
            </TransitionLink>
            <TransitionLink
              href={navigationRoutes.about}
              className="hover:text-primary transition-colors"
            >
              About
            </TransitionLink>
            <TransitionLink
              href={navigationRoutes.events}
              className="hover:text-primary transition-colors"
            >
              Events
            </TransitionLink>
            <TransitionLink
              href={navigationRoutes.communities}
              className="hover:text-primary transition-colors"
            >
              Communities
            </TransitionLink>
            <TransitionLink
              href={navigationRoutes.contact}
              className="hover:text-primary transition-colors"
            >
              Contact
            </TransitionLink>
            <TransitionLink
              href={navigationRoutes.company}
              className="hover:text-primary transition-colors"
            >
              Company
            </TransitionLink>
          </div>

          <Link
            href={navigationRoutes.login}
            className="hidden border border-gray-300 px-6 py-3 md:block"
          >
            login
          </Link>

          <button
            aria-label="Toggle navigation menu"
            className="inline-flex h-10 w-10 items-center justify-center border border-gray-300 bg-white md:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            type="button"
          >
            <span className="text-xl leading-none">
              {isMenuOpen ? "×" : "☰"}
            </span>
          </button>
        </div>

        <div
          className={`grid overflow-hidden transition-all duration-300 md:hidden ${
            isMenuOpen
              ? "mt-4 grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="min-h-0">
            <div className="grid gap-1 border border-gray-300 bg-white p-2 text-xs font-bold uppercase tracking-[0.2em]">
              <Link
                href={navigationRoutes.home}
                className="border border-transparent px-3 py-2 hover:border-gray-300"
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                href={navigationRoutes.about}
                className="border border-transparent px-3 py-2 hover:border-gray-300"
                onClick={closeMenu}
              >
                About
              </Link>
              <Link
                href={navigationRoutes.events}
                className="border border-transparent px-3 py-2 hover:border-gray-300"
                onClick={closeMenu}
              >
                Events
              </Link>
              <Link
                href={navigationRoutes.communities}
                className="border border-transparent px-3 py-2 hover:border-gray-300"
                onClick={closeMenu}
              >
                Communities
              </Link>
              <Link
                href={navigationRoutes.contact}
                className="border border-transparent px-3 py-2 hover:border-gray-300"
                onClick={closeMenu}
              >
                Contact
              </Link>
              <Link
                href={navigationRoutes.company}
                className="border border-transparent px-3 py-2 hover:border-gray-300"
                onClick={closeMenu}
              >
                Company
              </Link>
              <Link
                href={navigationRoutes.login}
                onClick={closeMenu}
                className="mt-2 border border-gray-300 px-3 py-2 text-left"
              >
                login
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </PageLayout>
  );
}
