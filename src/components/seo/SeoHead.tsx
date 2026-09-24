import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'FewerSweatyDays';
const DEFAULT_TITLE = 'FewerSweatyDays | Lifestyle Change for Hyperhidrosis';
const DEFAULT_DESCRIPTION =
  'Fewer sweaty days through lifestyle change. Real answers for people with hyperhidrosis who have been ignored.';
const SITE_URL = 'https://fewersweatydays.com';

export interface SeoHeadProps {
  title?: string;
  description?: string;
  path?: string;
  /** When false, use title as-is without the site suffix. Default true. */
  appendSiteName?: boolean;
  ogImage?: string;
}

export default function SeoHead({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  appendSiteName = true,
  ogImage,
}: SeoHeadProps) {
  const fullTitle =
    title == null
      ? DEFAULT_TITLE
      : appendSiteName
        ? `${title} | ${SITE_NAME}`
        : title;
  const canonical = `${SITE_URL}${path === '/' ? '/' : path}`;
  const image = ogImage
    ? ogImage.startsWith('http')
      ? ogImage
      : `${SITE_URL}${ogImage}`
    : undefined;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content={path.startsWith('/blog/') ? 'article' : 'website'} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      {image ? <meta property="og:image" content={image} /> : null}
      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image ? <meta name="twitter:image" content={image} /> : null}
    </Helmet>
  );
}
