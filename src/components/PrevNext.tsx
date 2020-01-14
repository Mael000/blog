import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import Post from '../models/Post';
import { HomepageArticle } from './HomepageArticle';
import config from '../../config/SiteConfig';
import { Article } from '.';
import { SidebarArticle } from './SidebarArticle';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 6rem auto 0 auto;
  a {
    color: ${props => props.theme.colors.primary};
    display: flex;
    align-items: center;
  }
  justify-items: center;
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
        {prev && (
          <SidebarArticle
            title={prev.frontmatter.title}
            date={prev.frontmatter.date}
            slug={prev.fields.slug}
            key={prev.fields.slug}
            tags={prev.frontmatter.tags || []}
          />
        )}
        {next && (
          <SidebarArticle
            title={next.frontmatter.title}
            date={next.frontmatter.date}
            slug={next.fields.slug}
            key={next.fields.slug}
            tags={next.frontmatter.tags || []}
          />
        )}
      </Wrapper>
    );
  }
}
