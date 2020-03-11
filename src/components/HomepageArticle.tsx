import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import { Subline } from './Subline';
import moment from 'moment';
import config from '../../config/SiteConfig';

const Title = styled.h2`
  position: relative;
  text-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  margin-bottom: 0.75rem;
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
  mainImage: string;
  tags: string[];
}

const MainImage = styled.div`
  height: 10rem;
  background-repeat: no-repeat;
  background-image: url(${(props: any) => props.src});
  background-size: cover;
  background-position: center;
`;

const TagsHolder = styled.div`
  margin: 0.5rem 0;
  text-align: right;
`;

export class HomepageArticle extends React.PureComponent<Props> {
  public render() {
    const { title, date, excerpt, slug, timeToRead, mainImage, tags } = this.props;
    const imageFormat = 't_code4it_homepage_article';

    const image = mainImage?.replace('{format}', imageFormat);
    return (
      <Card>
        <MainImage src={image} />
        <div>
          <TagsHolder>
            {(tags || []).map((tag, i) => (
              <Link to={`/tags/${kebabCase(tag)}`} key={`arthp-${slug}-${i}`} title={tag} className="article-tag">
                {tag}
              </Link>
            ))}
          </TagsHolder>
          <Title>
            <Link to={`/blog/${slug}`} title={title}>
              {title}
            </Link>
          </Title>
          <Subline>
            <Excerpt>{excerpt}</Excerpt>
            <div>
              <div>
                {date} &mdash; {timeToRead} Min Read
              </div>
            </div>
          </Subline>
        </div>
      </Card>
    );
  }
}
