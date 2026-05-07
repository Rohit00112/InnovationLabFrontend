import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";

const styles: Record<Variant, string> = {
  primary: "bg-black text-white border-transparent",
  secondary: "bg-slate-700 text-white border-transparent",
  outline: "bg-transparent text-black border border-sky-400",
  ghost: "bg-transparent text-black border-transparent",
  danger: "bg-red-600 text-white border-transparent",
};

const accent: Record<Variant, string> = {
  primary: "bg-sky-400",
  secondary: "bg-slate-400",
  outline: "bg-sky-400",
  ghost: "bg-sky-400",
  danger: "bg-red-400",
};

const Button = ({
  children,
  variant = "primary",
  href,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
  href?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  if (href) {
    return (
      <Link href={href} className="relative inline-block group font-medium">
        <span
          className={`
          absolute left-0 bottom-0 w-full h-1
          ${accent[variant]}
          transition-all duration-100 ease-out
        `}
        />
        <span
          className={`
          relative z-10 block px-6 pt-3 pb-4 border
          transform transition-all duration-100 ease-out
          -translate-y-1 group-active:translate-y-0
          ${styles[variant]}
        `}
        >
          {children}
        </span>
      </Link>
    );
  }

  return (
    <button
      {...rest}
      className={`relative inline-block group font-medium`}
    >
      <span
        className={`
          absolute left-0 bottom-0 w-full h-1
          ${accent[variant]}
          transition-all duration-100 ease-out
        `}
      />
      <span
        className={`
          relative z-10 block px-6 pt-3 pb-4 border
          transform transition-all duration-100 ease-out
          -translate-y-1 group-active:translate-y-0
          ${styles[variant]}
        `}
      >
        {children}
      </span>
    </button>
  );
};

export default Button;
