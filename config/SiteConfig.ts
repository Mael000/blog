export default {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"
  blogPath: '/blog/',
  siteTitle: 'Code4IT', // Navigation and Site Title
  siteTitleAlt: 'Code4IT', // Alternative Site title for SEO
  siteUrl: 'https://jolly-roentgen-73c66f.netlify.com/', // Domain of your site. No trailing slash!
  siteLanguage: 'en', // Language Tag on <html> element
  siteBanner: '/assets/banner.jpg', // Your image for og:image tag. You can find it in the /static folder
  defaultBg: '/assets/bg.png', // default post background header
  favicon: 'src/favicon.png', // Your image for favicons. You can find it in the /src folder
  siteDescription: 'Italian way of code', // Your site description
  author: 'Davide Bellone', // Author for schemaORGJSONLD
  siteLogo: '/assets/logo.png', // Image for schemaORGJSONLD

  userTwitter: '@BelloneDavide', // Twitter Username - Optional

  // Manifest and Progress color
  // See: https://developers.google.com/web/fundamentals/web-app-manifest/
  themeColor: '#3498DB',
  backgroundColor: '#2b2e3c',

  // Settings for typography.ts
  headerFontFamily: 'Bitter',
  bodyFontFamily: 'Open Sans',
  baseFontSize: '18px',

  // Social media
  siteFBAppID: '',

  //
  Google_Tag_Manager_ID: 'GTM-W6KBN79',
  POST_PER_PAGE: 5,

  DateTimeFormat: 'MMMM DD, YYYY',

  //
  homepageBanner: 'https://res.cloudinary.com/bellons/image/upload/t_ww2/Code4IT/Performance%20optimization%20csharp/Cover_1_wdpnsq.jpg',
  defaultArticleBanner: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg',
};
