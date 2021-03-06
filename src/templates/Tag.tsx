import React from 'react';
import Link from 'gatsby-link';
import PageProps from '../models/PageProps';
import { Article, Content, Header, Layout, SectionTitle, Subline, Wrapper } from '../components';
import Helmet from 'react-helmet';
import config from '../../config/SiteConfig';
import kebabCase from 'lodash/kebabCase';
import { MainNavigation } from '../components/MainNavigation';
import moment from 'moment';

export default class TagTemplate extends React.PureComponent<PageProps> {
  public render() {
    const { posts, tagName } = this.props.pathContext;
    const totalCount = posts ? posts.length : 0;
    const subline = `${totalCount} post${totalCount === 1 ? '' : 's'} tagged with "${tagName}"`;
    const img = config.latestArticlePageBanner;

    return (
      <Layout>
        <Helmet title={`${'Tags'} | ${config.siteTitle}`} />
        <Header banner={img}>
          <Link to="/" title="homepage">
            {config.siteTitle}
          </Link>
          <SectionTitle>Tag &ndash; {tagName}</SectionTitle>
          <Subline sectionTitle light={true}>
            {subline} (See{' '}
            <Link to="/tags" title="all tags">
              all tags
            </Link>
            )
          </Subline>
        </Header>
        <MainNavigation />

        <Wrapper>
          <Content>
            {posts
              ? posts.map((post: any, index) => (
                  <Article
                    title={post.frontmatter.title}
                    date={moment(post.frontmatter.date).format(config.DateTimeFormat)}
                    excerpt={post.excerpt}
                    slug={post.frontmatter.slug || kebabCase(post.frontmatter.title)}
                    timeToRead={post.timeToRead}
                    key={index}
                    tags={post.frontmatter.tags}
                  />
                ))
              : null}
          </Content>
        </Wrapper>
      </Layout>
    );
  }
}
