"use client";
import { LayoutDashboard, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  return (
    <header className="sticky  top-0 z-50 w-full border-b border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-6 mx-auto max-w-7xl flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">
              MB
            </span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-[hsl(195,100%,50%)] bg-clip-text text-transparent">
            FinTrade
          </span>
        </div>

        <nav className="flex items-center gap-1">
          <Link
            href={"/"}
            className={`nav-link ${
              pathname === "/" ? "bg-primary/10 text-primary" : ""
            }`}
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <Link
            href="/dashboard"
            className={`nav-link ${
              pathname === "/dashboard" ? "bg-primary/10 text-primary" : ""
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
