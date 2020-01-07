import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import { Layout, Wrapper, Button, Article, Header } from '../components';
import PageProps from '../models/PageProps';
import Helmet from 'react-helmet';
import config from '../../config/SiteConfig';
import { media } from '../utils/media';
import rgba from 'polished/lib/color/rgba';
import darken from 'polished/lib/color/darken';
import lighten from 'polished/lib/color/lighten';
import { HomepageArticle } from '../components/HomepageArticle';
import { MainNavigation } from '../components/MainNavigation';

const Homepage = styled.main`
  display: flex;
  flex-direction: column;
`;

const HomePageHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

// const GridRow: any = styled.div`
//   flex: 1;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background: ${(props: any) =>
//     props.background
//       ? `linear-gradient(
//       -185deg,
//       ${rgba(darken(0.1, props.theme.colors.primary), 0.7)},
//       ${rgba(lighten(0.1, props.theme.colors.grey.dark), 0.9)}), url(/assets/bg.png) no-repeat`
//       : null};
//   background-size: cover;
//   padding: 2rem 4rem;
//   color: ${(props: any) => (props.background ? props.theme.colors.white : null)};
//   h1 {
//     color: ${(props: any) => (props.background ? props.theme.colors.white : null)};
//   }
//   @media ${media.tablet} {
//     padding: 3rem 3rem;
//   }
//   @media ${media.phone} {
//     padding: 2rem 1.5rem;
//   }
// `;

const HomepageHeader: any = styled.div`
    min-height:15rem;
    background-image:  linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${config.homepageBanner}');
    h1, p {
      color: white;
    }
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    background-position: center; /* Center the image */
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: cover;
    @media ${media.phone} {
      flex-wrap: wrap;
        }
    `;

const HomepageContent: any = styled.div`
  text-align: ${(props: any) => (props.center ? 'center' : 'left')};
  margin: 0 1em;
  display: flex;
  -webkit-flex-flow: row;
  flex-flow: row;
  flex-wrap: wrap;
  justify-content: center;
`;

export default class IndexPage extends React.Component<PageProps> {
  public render() {
    const { data } = this.props;
    const { edges, totalCount } = data.allMarkdownRemark;
    return (
      <Layout>
        <Wrapper fullWidth={true}>
          <Helmet title={`Homepage | ${config.siteTitle}`} />
          <Homepage>
            <Header banner={config.homepageBanner}>
              <h1>{config.siteTitle}</h1>
              <p>{config.siteDescription}</p>
            </Header>
            <MainNavigation></MainNavigation>

            <h1>Latest articles </h1>
            <p>
              <Link to={'/blog'}>All articles ({totalCount}) </Link>
            </p>
            <HomepageContent>
              {edges.map(post => (
                <HomepageArticle
                  title={post.node.frontmatter.title}
                  date={post.node.frontmatter.date}
                  excerpt={post.node.excerpt || 'default descr'}
                  timeToRead={post.node.timeToRead}
                  slug={post.node.fields.slug}
                  category={post.node.frontmatter.category}
                  key={post.node.fields.slug}
                  mainImage={post.node.frontmatter.banner || config.defaultArticleBanner}
                />
              ))}
            </HomepageContent>
          </Homepage>
        </Wrapper>
      </Layout>
    );
  }
}
export const IndexQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 5) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          excerpt
          frontmatter {
            title
            date(formatString: "DD.MM.YYYY")
            category
            banner
          }
          timeToRead
        }
      }
    }
  }
`;
