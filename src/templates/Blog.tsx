import { graphql, Link } from 'gatsby';
import moment from 'moment';
import React from 'react';
import Helmet from 'react-helmet';

import config from '../../config/SiteConfig';
import { Article, Content, Header, Layout, Pagination, SectionTitle, Wrapper } from '../components';
import { MainNavigation } from '../components/MainNavigation';
import Data from '../models/Data';

interface Props {
  data: Data;
  pageContext: {
    currentPage: number;
    totalPages: number;
  };
}

export default class BlogPage extends React.Component<Props> {
  public render() {
    const { currentPage, totalPages } = this.props.pageContext;

    const { data } = this.props;
    const { edges, totalCount } = data.allMarkdownRemark;
    const img = config.latestArticlePageBanner;

    return (
      <Layout>
        <Helmet title={`Blog | ${config.siteTitle}`} />
        <Header banner={img}>
          <Link to="/" title="homepage">
            {config.siteTitle}
          </Link>
          <SectionTitle>Latest articles ({totalCount})</SectionTitle>
        </Header>
        <MainNavigation />
        <Wrapper>
          <Content>
            {edges.map(post => (
              <Article
                title={post.node.frontmatter.title}
                date={moment(post.node.frontmatter.date).format(config.DateTimeFormat)}
                excerpt={post.node.frontmatter?.description || post.node.excerpt}
                timeToRead={post.node.timeToRead}
                slug={post.node.frontmatter.slug || post.node.fields.slug}
                key={post.node.frontmatter.slug || post.node.fields.slug}
                tags={post.node.frontmatter.tags || []}
              />
            ))}
            <Pagination currentPage={currentPage} totalPages={totalPages} url={'blog'} />
          </Content>
        </Wrapper>
      </Layout>
    );
  }
}
export const BlogQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
      filter: { fields: { draft: { eq: false } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date
            tags
            slug
            description
          }
          excerpt
          timeToRead
        }
      }
    }
  }
`;
