/* eslint-disable react/require-default-props */
import React from 'react';
import Helmet from 'react-helmet';
import config from '../../config/SiteConfig';
import Post from '../models/Post';

interface SEO {
  postNode: Post;
  postPath: string;
  postSEO: boolean;
  pageTitle?: string;
  pageDescription?: string;
  pageImage?: string;
}

export const SEO = (props: SEO) => {
  const { postNode, postPath, postSEO, pageTitle, pageDescription, pageImage } = props;
  let title;
  let description;
  let image;
  let postURL;
  const realPrefix = config.blogPath === '/' ? '' : config.blogPath;

  const siteImage = config.siteBanner.replace('{format}', '');

  if (postSEO) {
    const postMeta = postNode.frontmatter;
    title = postMeta.title;

    console.table(postNode.frontmatter);

    description = postNode.frontmatter.description || postNode.excerpt;
    image = postNode.frontmatter?.banner?.replace('/{format}', '') ?? config.defaultArticleBanner;
    postURL = config.siteUrl + realPrefix + postPath;
  } else {
    title = pageTitle || config.siteTitle;
    description = pageDescription || config.siteDescription;
    image = pageImage?.replace('/{format}', '') || siteImage;
  }
  const blogURL = config.siteUrl + config.pathPrefix;
  let schemaOrgJSONLD = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      '@id': blogURL,
      url: blogURL,
      name: title,
      alternateName: config.siteTitleAlt ? config.siteTitleAlt : '',
    },
  ];
  if (postSEO) {
    schemaOrgJSONLD = [
      {
        '@context': 'http://schema.org',
        '@type': 'BlogPosting',
        // @ts-ignore
        '@id': postURL,
        // @ts-ignore
        url: postURL,
        name: title,
        alternateName: config.siteTitleAlt ? config.siteTitleAlt : '',
        headline: title,
        image: {
          '@type': 'ImageObject',
          url: image,
        },
        description: config.siteDescription,
        datePublished: postNode.frontmatter.date,
        dateModified: postNode.frontmatter.date,
        author: {
          '@type': 'Person',
          name: config.author,
        },
        publisher: {
          '@type': 'Organization',
          name: config.author,
          logo: {
            '@type': 'ImageObject',
            url: config.siteUrl + realPrefix + config.siteLogo,
          },
        },
        isPartOf: blogURL,
        mainEntityOfPage: {
          '@type': 'WebSite',
          '@id': blogURL,
        },
      },
    ];
  }
  return (
    <Helmet>
      <html lang={config.siteLanguage} />
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      <script type="application/ld+json">{JSON.stringify(schemaOrgJSONLD)}</script>
      <meta property="og:locale" content={config.ogLanguage} />
      <meta property="og:site_name" content={config.ogSiteName ? config.ogSiteName : ''} />
      <meta property="og:url" content={postSEO ? postURL : blogURL} />
      {postSEO ? <meta property="og:type" content="article" /> : null}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="fb:app_id" content={config.siteFBAppID ? config.siteFBAppID : ''} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={config.userTwitter ? config.userTwitter : ''} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:url" content={config.siteUrl} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};
