require('source-map-support').install();
require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'es2017',
  },
});

const config = require('./config/SiteConfig').default;
const pathPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix;

module.exports = {
  pathPrefix: config.pathPrefix,
  siteMetadata: {
    siteUrl: config.siteUrl + pathPrefix,
    mainImage: config.homepageBanner,
    description: config.siteDescription,
    blogPath: config.blogPath,

  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-offline',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sass',
    'gatsby-plugin-manifest',
    'gatsby-plugin-catch-links',
{
  resolve: `gatsby-plugin-disqus`,
  options: {
    shortname: `code4it`
  }
},
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        exclude: [ `/post-schedule`],

      }
    }, 'gatsby-plugin-lodash',
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl
                site_url: siteUrl
                image_url : mainImage
                description
                blogPath
              }
            }
          }
        `,
        feeds: [
          //https://www.npmjs.com/package/rss#itemoptions
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {

              const customEnt = function (node) {
                var arr = [];
                arr.push({ "content:encoded": node.html });
                arr.push({ "dc:creator": config.author });

                (node.frontmatter.tags || []).forEach(x => arr.push({ "category": x }));

                return arr;
              };

              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + site.siteMetadata.blogPath + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + site.siteMetadata.blogPath + edge.node.fields.slug,
                  custom_elements: customEnt(edge.node),
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date 
                        tags
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Code 4 IT blog",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: "^/blog/",

          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'post',
        path: `${__dirname}/blog`,
      },
    },
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: config.Google_Tag_Manager_ID,
        // Include GTM in development.
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow noopener noreferrer',
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-autolink-headers',
          'gatsby-remark-figure-caption'
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography.ts',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.siteTitle,
        short_name: config.siteTitleAlt,
        description: config.siteDescription,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'standalone',
        icon: config.favicon,
      },
    },
    {
      resolve: 'gatsby-plugin-draft',
      options: {
      },
    },


  ]
};
