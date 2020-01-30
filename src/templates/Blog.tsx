import React from 'react';
import { Link, graphql } from 'gatsby';
import { Layout, Article, Wrapper, SectionTitle, Header, Content, Pagination } from '../components';
import Helmet from 'react-helmet';
import config from '../../config/SiteConfig';
import Data from '../models/Data';
import { MainNavigation } from '../components/MainNavigation';
import { formatDistance } from 'date-fns';
import moment from 'moment';
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
                excerpt={post.node.excerpt}
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
            category
            tags
            slug
          }
          excerpt(pruneLength: 200)
          timeToRead
        }
      }
    }
  }
`;
