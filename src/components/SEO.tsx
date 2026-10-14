import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = 'Tanvi Impex | Wholesale California Almonds, Irani Pistachios & Premium Seeds Importer Mumbai',
  description = 'Leading importer, trader and bulk distributor of California Almonds, Nútböld Almonds, Irani & California Pistachios, Pumpkin Seeds, Sunflower Seeds & Chia Seeds based in APMC Market, Navi Mumbai.',
  canonical,
  ogType = 'website',
  ogImage = 'https://www.tanviimpex.com/og-image.jpg',
}) => {
  const location = useLocation();
  const currentCanonical = canonical || `https://www.tanviimpex.com${location.pathname === '/' ? '/' : location.pathname}`;

  useEffect(() => {
    // Update Title
    document.title = title;

    // Helper to set or create meta tag
    const setMetaTag = (attrName: string, attrVal: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard Meta
    setMetaTag('name', 'title', title);
    setMetaTag('name', 'description', description);

    // Canonical link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', currentCanonical);

    // Open Graph
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', currentCanonical);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('property', 'og:image:secure_url', ogImage);

    // Twitter
    setMetaTag('property', 'twitter:title', title);
    setMetaTag('property', 'twitter:description', description);
    setMetaTag('property', 'twitter:url', currentCanonical);
    setMetaTag('property', 'twitter:image', ogImage);
  }, [title, description, currentCanonical, ogType, ogImage]);

  return null;
};
