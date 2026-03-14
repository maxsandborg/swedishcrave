import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
      <p className="text-8xl font-display font-extrabold text-sc-pink mb-4">404</p>
      <h1 className="font-display text-4xl font-extrabold text-sc-text mb-4">Page Not Found</h1>
      <p className="text-lg text-sc-text-muted mb-12 max-w-md mx-auto">
        Looks like this candy got lost on the way from Sweden. Let us help you
        find what you&apos;re looking for.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-sc-pink text-white px-7 py-3 rounded-sc-full font-semibold hover:bg-sc-pink-hover hover:-translate-y-0.5 transition-all shadow-[0_4px_16px_rgba(255,45,135,0.3)]"
        >
          Go Home
        </Link>
        <Link
          href="/candy"
          className="inline-flex items-center justify-center bg-sc-card border-[1.5px] border-sc-pink text-sc-pink px-7 py-3 rounded-sc-full font-semibold hover:bg-sc-pink hover:text-white hover:-translate-y-0.5 transition-all"
        >
          Browse All Candy
        </Link>
        <Link
          href="/brands"
          className="inline-flex items-center justify-center bg-sc-card border-[1.5px] border-sc-border text-sc-text px-7 py-3 rounded-sc-full font-semibold hover:border-sc-purple hover:text-sc-purple hover:-translate-y-0.5 transition-all"
        >
          Explore Brands
        </Link>
      </div>
    </div>
  );
}
