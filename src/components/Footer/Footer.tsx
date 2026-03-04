const currentYear = new Date().getFullYear();

export const Footer = () => (
  <footer className="relative z-10 border-t border-white/10 bg-[#0E0820]/90 py-4 text-center text-xs text-white/80 backdrop-blur-md">
    <p>
      Built for{' '}
      <a
        href="https://procurified.com"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-brand-accent transition-colors hover:text-brand-accent-light"
      >
        Procurified
      </a>{' '}
      by Bothwell &copy; {currentYear}
    </p>
  </footer>
);
