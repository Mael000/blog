import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import kebabCase from 'lodash/kebabCase';
import { Layout, Wrapper, Header, Subline, SEO, PrevNext, SectionTitle, Content } from '../components';
import config from '../../config/SiteConfig';
import '../utils/prismjs-theme.css';
import PathContext from '../models/PathContext';
import Post from '../models/Post';
import { MainNavigation } from '../components/MainNavigation';
import { media } from '../utils/media';
import { isMobile } from 'react-device-detect';
import * as moment from 'moment';
import { ShareButton, ShareButtons } from '../components/ShareButtons';

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  @media ${media.tablet} {
    flex-direction: column;
  }
`;

const PostContent = styled.article`
  margin-top: 4rem;
  flex: 3;
  box-shadow: 2px 4px 20px 1px rgba(0, 0, 0, 0.75);
  margin: 1rem;
  padding: 0.5rem;
  max-width: 60vw;
  @media ${media.tablet} {
    box-shadow: 0;
    margin: 0 0 1rem 0;
    box-shadow: none;
    max-width: 98vw;
  }
`;

const PostSidebar = styled.div`
  margin-top: 2rem;
  flex: 1;
  padding: 0.5rem;
  @media ${media.tablet} {
    margin-top: 0;
  }
`;

interface Props {
  data: {
    markdownRemark: Post;
  };
  pathContext: PathContext;
}

export default class PostPage extends React.PureComponent<Props> {
  public render() {
    const { prev, next } = this.props.pathContext;
    const post = this.props.data.markdownRemark;

    const isFullWidth = isMobile;

    const imageFormat = 't_ww2';

    const image = (post?.frontmatter?.banner || config.defaultArticleBanner).replace('{format}', imageFormat);

    return (
      <Layout>
        {post ? (
          <>
            <SEO postPath={post.fields.slug} postNode={post} postSEO />
            <Helmet title={`${post.frontmatter.title} | ${config.siteTitle}`} />
            <Header banner={image}>
              <Link to="/" title="homepage">
                {config.siteTitle}
              </Link>
              <SectionTitle>{post.frontmatter.title}</SectionTitle>
              <Subline light={true}>
                {moment(post.frontmatter.date).format(config.DateTimeFormat)} &mdash; {post.timeToRead} Min Read
              </Subline>
            </Header>
            <MainNavigation />
            <Wrapper fullWidth={isFullWidth}>
              <Content>
                <ContentWrapper>
                  <PostContent dangerouslySetInnerHTML={{ __html: post.html }} />
                  <PostSidebar>
                    {post.frontmatter.tags ? (
                      <Subline>
                        Tags: &#160;
                        {post.frontmatter.tags.map((tag, i) => (
                          <Link key={i} to={`/tags/${kebabCase(tag)}`} title={tag}>
                            <strong>{tag}</strong> {i < post.frontmatter.tags.length - 1 ? `, ` : ``}
                          </Link>
                        ))}
                      </Subline>
                    ) : null}
                    <ShareButtons post={post} />

                    <PrevNext prev={prev} next={next} />
                  </PostSidebar>
                </ContentWrapper>
              </Content>
            </Wrapper>
          </>
        ) : null}
      </Layout>
    );
  }
}

export const postQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        slug
      }
      excerpt
      frontmatter {
        title
        date
        category
        tags
        banner
      }
      timeToRead
    }
  }
`;
