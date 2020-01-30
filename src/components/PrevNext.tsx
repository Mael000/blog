import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import Post from '../models/Post';
import { HomepageArticle } from './HomepageArticle';
import config from '../../config/SiteConfig';
import { Article } from '.';
import { SidebarArticle } from './SidebarArticle';
import { media } from '../utils/media';
import moment from 'moment';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem auto 0 auto;
  a {
    color: ${props => props.theme.colors.primary};
    display: flex;
    align-items: center;
  }
  justify-items: center;

  @media ${media.desktop} {
    position: sticky;
    top: 0;
  }
`;

interface Props {
  next: Post;
  prev: Post;
}

export class PrevNext extends React.PureComponent<Props> {
  public render() {
    const { prev, next } = this.props;
    return (
      <Wrapper>
        <h2>Other articles</h2>
        {prev && (
          <SidebarArticle
            title={prev.frontmatter.title}
            date={moment(prev.frontmatter.date).format(config.DateTimeFormat)}
            slug={prev.frontmatter.slug || prev.fields.slug}
            key={prev.frontmatter.slug || prev.fields.slug}
            tags={prev.frontmatter.tags || []}
          />
        )}
        {next && (
          <SidebarArticle
            title={next.frontmatter.title}
            date={moment(next.frontmatter.date).format(config.DateTimeFormat)}
            slug={next.frontmatter.slug || next.fields.slug}
            key={next.frontmatter.slug || next.fields.slug}
            tags={next.frontmatter.tags || []}
          />
        )}
      </Wrapper>
    );
  }
}
