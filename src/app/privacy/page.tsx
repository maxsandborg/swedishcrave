import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for SwedishCrave.com — how we handle your data.',
};

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-5xl font-bold text-sc-text mb-4">Privacy Policy</h1>
        <p className="text-sc-text-muted mb-12">Last updated: March 13, 2026</p>

        <div className="space-y-8 text-sc-text">
          <div>
            <h2 className="text-2xl font-bold mb-3">Information We Collect</h2>
            <p>
              SwedishCrave does not collect personal information unless you
              voluntarily provide it (for example, by contacting us via email). We
              may use privacy-friendly analytics to understand how visitors use our
              site, but we do not track individual users or use cookies for
              advertising.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Affiliate Links</h2>
            <p>
              Our site contains affiliate links to third-party retailers. When you
              click these links, the retailer may use cookies to track your
              purchase for commission purposes. We do not control these
              third-party cookies. Please review the privacy policies of the
              respective retailers for more information.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Third-Party Services</h2>
            <p>
              We may use third-party analytics and hosting services that process
              data on our behalf. These services are chosen for their
              privacy-friendly practices and compliance with applicable
              regulations.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Your Rights</h2>
            <p>
              You have the right to request access to, correction of, or deletion
              of any personal data we may hold. Contact us at
              privacy@swedishcrave.com for any privacy-related requests.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. Changes will be
              posted on this page with an updated revision date.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Contact</h2>
            <p>
              For questions about this privacy policy, email us at
              privacy@swedishcrave.com.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
