import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import { Layout, Wrapper, Button, Article, Header, Content, SectionTitle } from '../components';
import PageProps from '../models/PageProps';
import Helmet from 'react-helmet';
import config from '../../config/SiteConfig';
import { HomepageArticle } from '../components/HomepageArticle';
import { MainNavigation } from '../components/MainNavigation';

const Homepage = styled.main`
  display: flex;
  flex-direction: column;
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

const HomePageTitle = styled.h2`
  text-align: center;
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
              <SectionTitle>{config.siteTitle}</SectionTitle>
              <p>{config.siteDescription}</p>
            </Header>
            <MainNavigation />
            <Wrapper fullWidth="true">
              <Content>
                <HomePageTitle> Latest articles </HomePageTitle>
                <HomepageContent>
                  {edges.map(post => (
                    <HomepageArticle
                      title={post.node.frontmatter.title}
                      date={post.node.frontmatter.date}
                      excerpt={post.node.excerpt || ''}
                      timeToRead={post.node.timeToRead}
                      slug={post.node.fields.slug}
                      category={post.node.frontmatter.category}
                      key={post.node.fields.slug}
                      mainImage={post.node.frontmatter.banner || config.defaultArticleBanner}
                      tags={post.node.frontmatter.tags || []}
                    />
                  ))}
                </HomepageContent>
              </Content>
            </Wrapper>
          </Homepage>
        </Wrapper>
      </Layout>
    );
  }
}
export const IndexQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 5, filter: { fields: { draft: { eq: false } } }) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          excerpt
          frontmatter {
            title
            date(formatString: "YYYY-MMM-DD")
            category
            banner
            tags
          }
          timeToRead
        }
      }
    }
  }
`;
