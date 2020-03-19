import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';

import config from '../../config/SiteConfig';
import { MainNavigation } from '../components/MainNavigation';
import { Layout, Header, SectionTitle, Wrapper, Content, SEO } from '../components';
import { kebabCase } from 'lodash';

export default class PostSchedulePage extends React.PureComponent<any> {
  public render() {
    const post = this.props.data.allMarkdownRemark.nodes;
    const today = new Date();
    console.log(today);
    console.log(Date.parse(post[0].frontmatter.date));
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
                  <th>Tags</th>
                </tr>
              </thead>
              <tbody>
                {post.map((p, i) => (
                  <tr
                    key={i}
                    className={`post-schedule ${Date.parse(p.frontmatter?.date) < Date.parse(today) ? 'old' : 'new'} 
                  y-${p.frontmatter?.date}`}
                    data-year={p.frontmatter?.date}
                  >
                    <td>{p.frontmatter.date}</td>
                    <td>
                      <Link to={`../blog/${p.frontmatter.slug || p.slug}`} title={p.frontmatter.title}>
                        {p.frontmatter.title}
                      </Link>
                    </td>
                    <td>
                      {p.frontmatter?.tags?.map((tag, ti) => (
                        <Link to={`/tags/${kebabCase(tag)}`} key={`art-${ti}`} title={tag} className="article-tag">
                          {tag}
                        </Link>
                      ))}
                    </td>
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
        fields {
          slug
        }
        frontmatter {
          title
          date
          slug
          tags
        }
      }
    }
  }
`;
