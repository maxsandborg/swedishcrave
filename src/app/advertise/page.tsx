import { Metadata } from 'next';
import Link from 'next/link';
import {
  Star,
  ArrowRight,
  Crown,
  BadgeCheck,
  Globe,
  TrendingUp,
  Users,
  Search,
  BarChart3,
  Zap,
  CheckCircle2,
  XCircle,
  Gem,
  Mail,
  FileText,
  Megaphone,
} from 'lucide-react';
import { stores } from '@/data/stores';

export const metadata: Metadata = {
  title: 'Advertise on SwedishCrave — Get Your Store Featured',
  description:
    'Reach thousands of Swedish candy buyers every month. Featured listings, full review pages, and premium placement on the #1 Swedish candy guide.',
  alternates: {
    canonical: '/advertise',
  },
};

const totalStores = stores.length;
const featuredCount = stores.filter((s) => s.affiliateStatus === 'live').length;

export default function AdvertisePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-sc-primary via-sc-purple to-sc-pink py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="relative max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white font-semibold text-[13px] px-4 py-1.5 rounded-sc-full mb-6">
            <TrendingUp className="w-3.5 h-3.5" /> For Stores & Brands
          </span>
          <h1 className="font-display text-[38px] sm:text-[52px] font-extrabold text-white tracking-[-0.5px] mb-5 leading-[1.1]">
            Get Your Store in Front of Swedish Candy Buyers
          </h1>
          <p className="text-lg sm:text-xl text-white/85 max-w-[640px] mx-auto mb-8 leading-relaxed">
            SwedishCrave is the #1 guide to Swedish candy online. Our directory of {totalStores}+ stores
            helps thousands of buyers find the right store every month.
          </p>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 bg-white text-sc-primary font-bold text-[15px] px-8 py-4 rounded-sc-full hover:-translate-y-0.5 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
          >
            See Pricing <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Why Advertise */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-sc-text mb-3">
              Why Stores Choose SwedishCrave
            </h2>
            <p className="text-sc-text-muted max-w-[560px] mx-auto">
              We connect Swedish candy stores with high-intent buyers who are ready to purchase
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Search className="w-7 h-7 text-sc-primary" />,
                title: 'SEO-Driven Traffic',
                desc: 'We rank for "where to buy Swedish candy", "best Swedish candy stores", and dozens of high-intent keywords. Your listing gets found by people actively looking to buy.',
              },
              {
                icon: <Users className="w-7 h-7 text-sc-purple" />,
                title: 'High-Intent Audience',
                desc: "Our visitors aren't browsing — they're buying. Every visitor on our store pages is actively looking for a place to purchase Swedish candy.",
              },
              {
                icon: <BarChart3 className="w-7 h-7 text-sc-teal" />,
                title: 'AI Visibility',
                desc: 'SwedishCrave is cited by AI assistants including ChatGPT, Perplexity, and Google AI Overviews. Your store gets recommended by AI.',
              },
              {
                icon: <Star className="w-7 h-7 text-sc-yellow" />,
                title: 'Trusted Reviews',
                desc: 'Our detailed, honest store reviews build buyer confidence. Featured stores see higher click-through rates than any ad campaign.',
              },
              {
                icon: <Globe className="w-7 h-7 text-sc-blue" />,
                title: 'Global Reach',
                desc: 'Our audience spans the US, UK, Canada, Australia, and beyond. Reach Swedish candy buyers wherever they are.',
              },
              {
                icon: <Zap className="w-7 h-7 text-sc-orange" />,
                title: 'Always-On Exposure',
                desc: "Unlike ads that stop when you stop paying, your SEO-powered listing works 24/7. It's the gift that keeps giving.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-sc-card border border-sc-border rounded-sc-lg p-6">
                <span className="block mb-4">{item.icon}</span>
                <h3 className="font-display text-[17px] font-bold text-sc-text mb-2">{item.title}</h3>
                <p className="text-[14px] text-sc-text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 md:py-20 bg-sc-bg-alt border-t border-sc-border">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-sc-text mb-3">
              Simple, Transparent Pricing
            </h2>
            <p className="text-sc-text-muted max-w-[560px] mx-auto">
              Choose the listing tier that fits your store. Upgrade or cancel anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Basic — Free */}
            <div className="bg-white border border-sc-border rounded-sc-lg p-6 flex flex-col">
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-5 h-5 text-sc-text-muted" />
                  <h3 className="font-display text-lg font-bold text-sc-text">Basic</h3>
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-display text-[32px] font-extrabold text-sc-text">Free</span>
                </div>
                <p className="text-[13px] text-sc-text-muted leading-relaxed">
                  Your store listed in our directory. A starting point for visibility.
                </p>
              </div>

              <ul className="space-y-2.5 mb-6 flex-1">
                {[
                  { included: true, text: 'Name listed in directory' },
                  { included: true, text: 'Country & shipping info' },
                  { included: true, text: 'Basic store page' },
                  { included: false, text: 'No logo in directory' },
                  { included: false, text: 'No dofollow link' },
                  { included: false, text: 'No homepage placement' },
                  { included: false, text: 'No review content' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-[12.5px]">
                    {item.included ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-sc-text-muted/40 mt-0.5 flex-shrink-0" />
                    )}
                    <span className={item.included ? 'text-sc-text' : 'text-sc-text-muted/60'}>{item.text}</span>
                  </li>
                ))}
              </ul>

              <p className="text-[11px] text-sc-text-muted text-center">Included for all {totalStores} stores</p>
            </div>

            {/* Verified — $199/mo */}
            <div className="bg-white border border-sc-border rounded-sc-lg p-6 flex flex-col relative">
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <BadgeCheck className="w-5 h-5 text-sc-primary" />
                  <h3 className="font-display text-lg font-bold text-sc-text">Verified</h3>
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-display text-[32px] font-extrabold text-sc-text">$199</span>
                  <span className="text-sc-text-muted text-sm">/mo</span>
                </div>
                <p className="text-[13px] text-sc-text-muted leading-relaxed">
                  Stand out with your logo, a dedicated preview page, and a permanent dofollow backlink.
                </p>
              </div>

              <ul className="space-y-2.5 mb-6 flex-1">
                {[
                  { included: true, text: 'Everything in Basic' },
                  { included: true, text: 'Logo shown in directory' },
                  { included: true, text: 'Preview store page with key info' },
                  { included: true, text: 'Dofollow backlink to your site' },
                  { included: true, text: '"Verified" trust badge' },
                  { included: false, text: 'No full review page' },
                  { included: false, text: 'No homepage placement' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-[12.5px]">
                    {item.included ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-sc-text-muted/40 mt-0.5 flex-shrink-0" />
                    )}
                    <span className={item.included ? 'text-sc-text' : 'text-sc-text-muted/60'}>{item.text}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-sc-primary text-white font-bold text-[14px] px-6 py-3 rounded-sc-full hover:-translate-y-0.5 transition-all shadow-[0_4px_16px_rgba(0,136,255,0.3)] w-full"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Featured — $499/mo */}
            <div className="bg-white border-2 border-sc-primary rounded-sc-lg p-6 flex flex-col relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-sc-primary text-white text-[11px] font-bold uppercase tracking-wider px-4 py-1 rounded-sc-full">
                  Most Popular
                </span>
              </div>

              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <Crown className="w-5 h-5 text-sc-orange" />
                  <h3 className="font-display text-lg font-bold text-sc-text">Featured</h3>
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-display text-[32px] font-extrabold text-sc-text">$499</span>
                  <span className="text-sc-text-muted text-sm">/mo</span>
                </div>
                <p className="text-[13px] text-sc-text-muted leading-relaxed">
                  Full review page, homepage placement, product showcase, and priority positioning everywhere.
                </p>
              </div>

              <ul className="space-y-2.5 mb-6 flex-1">
                {[
                  { included: true, text: 'Everything in Verified' },
                  { included: true, text: 'Full detailed review page' },
                  { included: true, text: 'Homepage "Featured" placement' },
                  { included: true, text: 'Product showcase with images' },
                  { included: true, text: 'Priority directory ranking' },
                  { included: true, text: '"Editor\'s Pick" badge' },
                  { included: true, text: 'Affiliate tracking integration' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-[12.5px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sc-text">{item.text}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-sc-primary text-white font-bold text-[14px] px-6 py-3 rounded-sc-full hover:-translate-y-0.5 transition-all shadow-[0_4px_16px_rgba(0,136,255,0.3)] w-full"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Premium Partner — Custom */}
            <div className="bg-gradient-to-br from-[#1A1A2E] to-[#2D2D55] rounded-sc-lg p-6 flex flex-col relative text-white">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-sc-yellow to-sc-orange text-sc-text text-[11px] font-bold uppercase tracking-wider px-4 py-1 rounded-sc-full">
                  Premium
                </span>
              </div>

              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <Gem className="w-5 h-5 text-sc-yellow" />
                  <h3 className="font-display text-lg font-bold text-white">Premium Partner</h3>
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-display text-[32px] font-extrabold text-white">Custom</span>
                </div>
                <p className="text-[13px] text-white/70 leading-relaxed">
                  Full content marketing partnership. We become your dedicated growth channel.
                </p>
              </div>

              <ul className="space-y-2.5 mb-6 flex-1">
                {[
                  { icon: <CheckCircle2 className="w-3.5 h-3.5 text-sc-yellow mt-0.5 flex-shrink-0" />, text: 'Everything in Featured' },
                  { icon: <FileText className="w-3.5 h-3.5 text-sc-yellow mt-0.5 flex-shrink-0" />, text: 'Dedicated SEO articles/month' },
                  { icon: <Mail className="w-3.5 h-3.5 text-sc-yellow mt-0.5 flex-shrink-0" />, text: 'Featured in email newsletter' },
                  { icon: <Megaphone className="w-3.5 h-3.5 text-sc-yellow mt-0.5 flex-shrink-0" />, text: 'Seasonal campaign promotions' },
                  { icon: <Star className="w-3.5 h-3.5 text-sc-yellow mt-0.5 flex-shrink-0" />, text: 'Category sponsorship placement' },
                  { icon: <TrendingUp className="w-3.5 h-3.5 text-sc-yellow mt-0.5 flex-shrink-0" />, text: 'Monthly performance reports' },
                  { icon: <Users className="w-3.5 h-3.5 text-sc-yellow mt-0.5 flex-shrink-0" />, text: 'Dedicated account manager' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-[12.5px]">
                    {item.icon}
                    <span className="text-white/90">{item.text}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-sc-yellow to-sc-orange text-sc-text font-bold text-[14px] px-6 py-3 rounded-sc-full hover:-translate-y-0.5 transition-all shadow-[0_4px_16px_rgba(255,199,0,0.3)] w-full"
              >
                Let&apos;s Talk <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Affiliate Alternative */}
          <div className="mt-10 max-w-[700px] mx-auto text-center">
            <p className="text-sc-text-muted text-[14px] leading-relaxed">
              <span className="font-semibold text-sc-text">Prefer a performance model?</span>{' '}
              We also offer affiliate partnerships where you pay only for results.
              Currently {featuredCount} stores use our affiliate program with commissions from 10-15%.{' '}
              <Link href="/contact" className="text-sc-primary font-semibold hover:underline">
                Contact us to discuss &rarr;
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-sc-text mb-3">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Choose Your Tier',
                desc: 'Pick the listing level that fits your budget and goals. Start with Verified or go all-in with Featured.',
              },
              {
                step: '2',
                title: 'We Build Your Page',
                desc: "Send us your store info, logo, and any products you'd like highlighted. We create your listing within 48 hours.",
              },
              {
                step: '3',
                title: 'Start Getting Traffic',
                desc: 'Your listing goes live and starts driving qualified buyers to your store. Track results and upgrade anytime.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-sc-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-display text-xl font-extrabold text-sc-primary">{item.step}</span>
                </div>
                <h3 className="font-display text-[17px] font-bold text-sc-text mb-2">{item.title}</h3>
                <p className="text-[14px] text-sc-text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-sc-primary via-sc-purple to-sc-pink">
        <div className="max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-4">
            Ready to Grow Your Store?
          </h2>
          <p className="text-lg text-white/85 mb-8 max-w-[520px] mx-auto">
            Join the {totalStores}+ stores already listed on SwedishCrave. Get in front of buyers who are actively searching for Swedish candy.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-sc-primary font-bold text-[15px] px-8 py-4 rounded-sc-full hover:-translate-y-0.5 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
          >
            Contact Us to Get Started <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
