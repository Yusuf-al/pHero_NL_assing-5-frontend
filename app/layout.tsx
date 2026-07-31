import "./globals.css";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
       lang="en"
      className="h-full antialiased font-sans"
      suppressHydrationWarning
    >
      
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        {/* Main Content */}
        <main className="flex-1">{children}</main>
        <Toaster/>

        {/* Global Footer */}
        <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row">
            <div className="text-center md:text-left">
              <p className="text-sm font-medium">RentNest</p>
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} RentNest. All rights reserved.
              </p>
            </div>

            <nav className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link href="/about" className="hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}