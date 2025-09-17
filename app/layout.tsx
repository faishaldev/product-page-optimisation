import type { Metadata } from 'next';
import './globals.css';
import Providers from '../components/Providers';
import Header from '../components/Header';

export const metadata: Metadata = {
  title: 'Product Store - Optimized E-commerce Experience',
  description:
    'Discover amazing products at great prices with our optimized e-commerce platform featuring fast loading times and responsive design.',
  keywords: 'products, e-commerce, shopping, online store, deals, discounts',
  authors: [{ name: 'Product Store Team' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Product Store - Optimized E-commerce Experience',
    description:
      'Discover amazing products at great prices with our optimized e-commerce platform.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Product Store - Optimized E-commerce Experience',
    description:
      'Discover amazing products at great prices with our optimized e-commerce platform.',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://dummyjson.com" />
        <link rel="preconnect" href="https://cdn.dummyjson.com" />
        <link rel="dns-prefetch" href="https://dummyjson.com" />
        <link rel="dns-prefetch" href="https://cdn.dummyjson.com" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body className="h-full font-sans antialiased bg-gray-50 text-gray-900">
        <div className="min-h-full">
          <Providers>
            <Header />
            {children}
          </Providers>
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                window.addEventListener('load', function() {
                  if ('performance' in window) {
                    const navigation = performance.getEntriesByType('navigation')[0];
                    if (navigation) {
                      console.log('Performance Metrics:', {
                        TTFB: navigation.responseStart - navigation.requestStart,
                        FCP: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
                        LCP: 0,
                        CLS: 0,
                        FID: 0,
                      });
                    }
                  }
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
