import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
      <p className="text-8xl font-bold text-sc-secondary mb-4">404</p>
      <h1 className="text-4xl font-bold text-sc-text mb-4">Page Not Found</h1>
      <p className="text-lg text-sc-text-muted mb-12 max-w-md mx-auto">
        Looks like this candy got lost on the way from Sweden. Let us help you
        find what you&apos;re looking for.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-sc-primary hover:bg-sc-primary/90 text-white px-8 py-3 rounded-lg font-medium transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/candy"
          className="inline-flex items-center justify-center bg-sc-card border border-sc-primary text-sc-primary hover:bg-sc-primary hover:text-white px-8 py-3 rounded-lg font-medium transition-colors"
        >
          Browse All Candy
        </Link>
        <Link
          href="/brands"
          className="inline-flex items-center justify-center bg-sc-card border border-sc-border text-sc-text hover:border-sc-primary hover:text-sc-primary px-8 py-3 rounded-lg font-medium transition-colors"
        >
          Explore Brands
        </Link>
      </div>
    </div>
  );
}
