import '../utils/prismjs-theme.css';

import { graphql, Link } from 'gatsby';
import { Disqus } from 'gatsby-plugin-disqus';
import kebabCase from 'lodash/kebabCase';
import moment from 'moment';
import React from 'react';
import { isMobile } from 'react-device-detect';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import config from '../../config/SiteConfig';
import { Content, Header, Layout, PrevNext, SectionTitle, SEO, Subline, Wrapper } from '../components';
import { MainNavigation } from '../components/MainNavigation';
import { ShareButtons } from '../components/ShareButtons';
import PathContext from '../models/PathContext';
import Post from '../models/Post';
import { media } from '../utils/media';

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

const PostSidebar = styled.aside`
  margin-top: 2rem;
  flex: 1;
  padding: 0.5rem;
  @media ${media.tablet} {
    margin-top: 0;
  }

  section[class^="ShareButtons_"]{
    @media ${media.desktop} {
      position: sticky;
      top: 0;
    }
  }

 
}

`;

const TagsHolder = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

const PostDescription = styled.div`
  padding: 1rem 1rem 0 1rem;
  text-align: center;
`;

const PostArticle = styled.div``;

interface Props {
  data: {
    markdownRemark: Post;
  };
  pathContext: PathContext;
}

export default class PostPage extends React.PureComponent<Props> {
  public render() {
    const { prev, next } = this.props.pathContext;

    console.log(this.props);

    const post = this.props.data.markdownRemark;

    const isFullWidth = isMobile;

    const imageFormat = 't_ww2';

    const image = (post?.frontmatter?.banner || config.defaultArticleBanner).replace('{format}', imageFormat);

    const slug = post.frontmatter.slug || kebabCase(post.frontmatter.title);

    const fullUrl = this.componeUrl(config.siteUrl, config.blogPath, slug);

    const disqusConfig = {
      url: `${fullUrl}`,
      identifier: slug,
      title: post.frontmatter.title,
    };

    return (
      <Layout>
        {post ? (
          <>
            <SEO postPath={post.frontmatter.slug || post.fields.slug} postNode={post} postSEO />
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
                  <PostContent>
                    {post.frontmatter?.description ? (
                      <PostDescription>
                        <strong>{post.frontmatter.description}</strong>
                        <div className="separator" />
                      </PostDescription>
                    ) : null}

                    <PostArticle dangerouslySetInnerHTML={{ __html: post.html }} />
                  </PostContent>
                  <PostSidebar>
                    {post.frontmatter.tags ? (
                      <TagsHolder>
                        {post.frontmatter.tags.map((tag, i) => (
                          <Link key={i} to={`/tags/${kebabCase(tag)}`} title={tag} className="article-tag">
                            <strong>{tag}</strong>
                          </Link>
                        ))}
                      </TagsHolder>
                    ) : null}

                    {prev || next ? <PrevNext prev={prev} next={next} /> : null}

                    <ShareButtons post={post} />
                  </PostSidebar>
                </ContentWrapper>
                <Disqus config={disqusConfig} />
              </Content>
            </Wrapper>
          </>
        ) : null}
      </Layout>
    );
  }

  public componeUrl = function(...parts: string[]): string {
    const trimmed = parts.map(x => {
      let tmp = x;
      if (tmp.startsWith('/')) tmp = x.substring(1, tmp.length);
      if (tmp.endsWith('/')) tmp = tmp.substring(0, tmp.length - 1);
      return tmp;
    });
    return trimmed.join('/');
  };
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
        tags
        banner
        slug
        description
      }
      timeToRead
    }
  }
`;
