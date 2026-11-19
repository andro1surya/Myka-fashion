import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import InquiryDrawer from '../components/InquiryDrawer';
import WhatsAppButton from '../components/WhatsAppButton';
import CookieConsent from '../components/CookieConsent';
import { InquiryProvider } from '../context/InquiryContext';
import ToastContainer from '../components/ToastContainer';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://mykafashion.com'),
  title: {
    default: 'MYKA FASHION | Indian Garment Export & B2B Wholesale Catalogue',
    template: '%s | MYKA FASHION'
  },
  description: "Exquisite Indian women's fashion export and wholesale manufacturer. Specializing in artisanal block-printed kurtis, Lucknowi chikankari tunics, linen co-ord sets, and conscious natural fabrics for global boutique chains and importers.",
  keywords: [
    'Indian Garment Export',
    'B2B Wholesale Clothing',
    'Cotton Kurti Manufacturer',
    'Chikankari Wholesale',
    'Jaipur Block Print Exporter',
    'Private Label Women Fashion',
    'Linen Co-ord Sets India',
    'Low MOQ Fashion Wholesale'
  ],
  authors: [{ name: 'MYKA FASHION Export Desk' }],
  creator: 'MYKA FASHION',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mykafashion.com',
    siteName: 'MYKA FASHION',
    title: 'MYKA FASHION | Premium B2B Women’s Fashion Wholesale & Export',
    description: 'Inquiry-based wholesale garment lookbook featuring 16 signature Indian craft styles with low MOQs and international FOB/CIF dispatch.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 800,
        alt: 'MYKA FASHION B2B Lookbook'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MYKA FASHION | B2B Wholesale & Indian Garment Export',
    description: 'Handcrafted kurtis, chikankari tunics, and linen garments with low MOQs from 50 pieces.'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <InquiryProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <InquiryDrawer />
          <WhatsAppButton />
          <CookieConsent />
          <ToastContainer />
        </InquiryProvider>
      </body>
    </html>
  );
}
