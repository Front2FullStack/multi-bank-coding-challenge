const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border bg-background py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">
                MB
              </span>
            </div>
            <span className="text-xl font-bold text-foreground">FinTrade</span>
          </div>

          <p className="text-muted-foreground text-center md:text-right">
            © {year} FinTrade. Real-time market data and insights.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
