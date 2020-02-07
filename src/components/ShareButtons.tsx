import React from 'react';
import SiteConfig from '../../config/SiteConfig';
import { LinkedInIcon, TwitterIcon, PocketIcon } from './Icons';
import { LinkedinShareButton, PocketShareButton, TwitterShareButton } from 'react-share';
import Post from '../models/Post';
import kebabCase from 'lodash/kebabCase';
import styled from 'styled-components';
import theme from '../../config/Theme';

export const ShareButtonsList = styled.section`
  div#buttons {
    button {
      margin: 0 0.5rem;

      svg {
        fill: ${theme.colors.primary};
      }
    }
  }
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ShareButtonsSectionTitle = styled.p`
  text-align: center;
  font-weight: bolder;
  font-size: x-large;
`;

export interface Props {
  post: Post;
}

export class ShareButtons extends React.PureComponent<Props> {
  public render() {
    const { post } = this.props;
    const slug = post.frontmatter.slug || kebabCase(post.frontmatter.title);

    const fullUrl = this.componeUrl(SiteConfig.siteUrl, SiteConfig.blogPath, slug);
    // https://www.npmjs.com/package/react-share
    return (
      <ShareButtonsList>
        <ShareButtonsSectionTitle>Spread the word!</ShareButtonsSectionTitle>
        <div id="buttons">
          <TwitterShareButton
            size={32}
            url={fullUrl}
            title={post.frontmatter.title}
            hashtags={post.frontmatter.tags || []}
            via={SiteConfig.userTwitter.replace('@', '')}
          >
            <TwitterIcon />
          </TwitterShareButton>
          <LinkedinShareButton title={post.frontmatter.title} summary={post.excerpt} url={fullUrl}>
            <LinkedInIcon />
          </LinkedinShareButton>
          <PocketShareButton url={fullUrl}>
            <PocketIcon />
          </PocketShareButton>
        </div>
      </ShareButtonsList>
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
