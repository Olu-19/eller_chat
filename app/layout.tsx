import "./globals.css";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import AuthContext from "@/app/context/AuthContext";
import ActiveStatus from "@/app/components/ActiveStatus";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Eller chat",
  description: "A lightening-speed, scalable Next.js chat application.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <main className="bg-gray-200 dark:bg-gray-950">
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem={true}
              disableTransitionOnChange
            >
              <ActiveStatus />
              {children}
            </ThemeProvider>
          </main>
          <Toaster />
        </AuthContext>
      </body>
    </html>
  );
}
