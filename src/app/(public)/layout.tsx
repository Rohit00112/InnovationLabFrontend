import TransitionProvider from "@/components/TransitionProvider";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Innovation Lab",
  description:
    "Learning extends beyond the classroom through projects, collaboration, and practical experience at Innovation Lab",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TransitionProvider>
      <Navbar />
      {children}
      <Footer />
    </TransitionProvider>
  );
}
