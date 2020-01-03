import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import { Subline } from './Subline';

const Post = styled.article`
  display: flex;
  flex-direction: column;
  margin-top: 3.5rem;
  margin-bottom: 3.5rem;
`;

const Title = styled.h2`
  position: relative;
  text-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  margin-bottom: 0.75rem;
`;

const Initiale = styled.span`
  position: absolute;
  font-size: 7rem;
  transform: translate(-50%, -50%);
  opacity: 0.08;
  user-select: none;
  z-index: -1;
`;

const Excerpt = styled.p`
  grid-column: -1 / 1;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const Card = styled.div`
  padding: 0.5rem;
  margin: 0.5rem;
  box-shadow: 2px 4px 9px 1px rgba(0, 0, 0, 0.75);
  width: 20rem;
  @media (max-width: 600px) {
    width: 100%;
    margin: 0.5rem 0;
  }
`;

interface Props {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  timeToRead: number;
  category: string;
  mainImage: string;
}

const MainImage = props => <img src={props.src} />;

export class HomepageArticle extends React.PureComponent<Props> {
  public render() {
    const { title, date, excerpt, slug, timeToRead, category, mainImage } = this.props;
    return (
      <Card>
        <MainImage src={mainImage} />
        <div>
          <Title>
            <Link to={`/blog/${slug}`}>{title}</Link>
          </Title>
          <Subline>
            <Excerpt>{excerpt}</Excerpt>
            {date} &mdash; {timeToRead} Min Read &mdash; In
            <Link to={`/categories/${kebabCase(category)}`}> {category}</Link>
          </Subline>
        </div>
      </Card>
    );
  }
}
