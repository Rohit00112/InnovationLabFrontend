import TransitionProvider from "@/components/TransitionProvider";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";

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
