import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';

import config from '../../config/SiteConfig';
import { MainNavigation } from '../components/MainNavigation';
import { Layout, Header, SectionTitle, Wrapper, Content, SEO } from '../components';

export default class PostSchedulePage extends React.PureComponent<any> {
  public render() {
    const post = this.props.data.allMarkdownRemark.nodes;
    return (
      <Layout>
        <Helmet title={`Contact | ${config.siteTitle}`} />
        <SEO />
        <Header>
          <Link to="/" title="homepage">
            {config.siteTitle}
          </Link>
          <SectionTitle>Post Shedule</SectionTitle>
        </Header>
        <MainNavigation />

        <Wrapper>
          <Content>
            <h2>All posts</h2>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Title</th>
                </tr>
              </thead>
              <tbody>
                {post.map((p, i) => (
                  <tr key={i}>
                    <td>{p.frontmatter.date}</td>
                    <td>{p.frontmatter.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Content>
        </Wrapper>
      </Layout>
    );
  }
}

export const postSchedule = graphql`
  {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      nodes {
        frontmatter {
          title
          date
        }
      }
    }
  }
`;
