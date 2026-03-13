import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with SwedishCrave. Questions about Swedish candy, partnership inquiries, or just want to say hi.',
};

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Contact' }]} />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
        <h1 className="font-display text-[38px] sm:text-[44px] font-extrabold text-sc-text tracking-[-0.5px] mb-3">
          Contact Us
        </h1>
        <p className="text-lg text-sc-text-muted mb-10 max-w-2xl">
          Have a question about Swedish candy? Want to suggest a review? Interested
          in partnering with us? We&apos;d love to hear from you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-sc-card border border-sc-border rounded-sc-lg p-7">
            <h2 className="font-display text-xl font-bold text-sc-text mb-2">
              General Inquiries
            </h2>
            <p className="text-sc-text-muted text-[15px] mb-4">
              Questions, suggestions, or just want to talk candy.
            </p>
            <a
              href="mailto:hello@swedishcrave.com"
              className="text-sc-pink font-semibold hover:underline"
            >
              hello@swedishcrave.com
            </a>
          </div>

          <div className="bg-sc-card border border-sc-border rounded-sc-lg p-7">
            <h2 className="font-display text-xl font-bold text-sc-text mb-2">
              Partnerships & Press
            </h2>
            <p className="text-sc-text-muted text-[15px] mb-4">
              Brand collaborations, affiliate partnerships, or media inquiries.
            </p>
            <a
              href="mailto:partners@swedishcrave.com"
              className="text-sc-pink font-semibold hover:underline"
            >
              partners@swedishcrave.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
