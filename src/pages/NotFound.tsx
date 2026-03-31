import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  useEffect(() => {
    document.title = "404 — Page Not Found";
    return () => { document.title = "Mohamed Waheed | AI-Powered Growth Systems Builder"; };
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center px-6">
        <span className="label-tech text-primary block mb-4">// ERROR 404</span>
        <h1 className="font-headline text-6xl md:text-8xl font-bold gradient-text mb-4">404</h1>
        <p className="text-muted-foreground text-lg mb-8">This page doesn't exist.</p>
        <Link
          to="/"
          className="inline-block px-8 py-3.5 font-label text-xs uppercase tracking-[0.15em] font-semibold bg-primary text-primary-foreground hover-glow"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
