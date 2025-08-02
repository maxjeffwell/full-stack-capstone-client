import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const SEO = ({
  title = 'educationELLy: Where All Teachers Are Language Teachers',
  description = 'A comprehensive platform helping mainstream teachers engage with English Language Learning (ELL) students through integrated curriculum development, student tracking, and language proficiency assessment tools.',
  keywords = 'ELL, English Language Learning, education, teachers, language instruction, student tracking, proficiency assessment, mainstream integration, curriculum development',
  canonicalUrl = 'https://educationelly-client-71a1b1901aaa.herokuapp.com',
  ogImage = 'https://educationelly-client-71a1b1901aaa.herokuapp.com/og-image.png',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  noIndex = false,
  structuredData = null,
}) => {
  const siteUrl = 'https://educationelly-client-71a1b1901aaa.herokuapp.com';
  const fullUrl = canonicalUrl.startsWith('http')
    ? canonicalUrl
    : `${siteUrl}${canonicalUrl}`;
  const fullImageUrl = ogImage.startsWith('http')
    ? ogImage
    : `${siteUrl}${ogImage}`;

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullUrl} />

      {/* Robots meta tag */}
      <meta
        name="robots"
        content={noIndex ? 'noindex, nofollow' : 'index, follow'}
      />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:site_name" content="educationELLy" />

      {/* Twitter */}
      <meta property="twitter:card" content={twitterCard} />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImageUrl} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  canonicalUrl: PropTypes.string,
  ogImage: PropTypes.string,
  ogType: PropTypes.string,
  twitterCard: PropTypes.string,
  noIndex: PropTypes.bool,
  structuredData: PropTypes.object,
};

export default SEO;
