import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import { Subline } from './Subline';
import moment from 'moment';
import config from '../../config/SiteConfig';

const Post = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0.5rem 0.5rem 0.5rem;
  h2 {
    font-size: x-large;
  }
  box-shadow: 2px 4px 20px 1px rgba(0, 0, 0, 0.75);
  padding: 1rem;
`;

const Title = styled.strong`
  position: relative;
  text-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  margin-bottom: 0.75rem;
`;

interface Props {
  title: string;
  date: string;
  slug: string;
  tags: string[];
}

const TagsHolder = styled.div`
  //   a:after {
  //     content: ', ';
  //   }
  //   a:last-child:after {
  //     content: '';
  //   }
  display: flex;

  flex-wrap: wrap;
`;

export class SidebarArticle extends React.PureComponent<Props> {
  public render() {
    const { title, date, slug, tags } = this.props;

    return (
      <Post>
        <Title>
          <Link to={`/blog/${slug}`} title={title}>
            {title}
          </Link>
        </Title>
        <Subline>
          {moment(date).format(config.DateTimeFormat)}
          <TagsHolder>
            Tags:
            {(tags || []).map((tag, i) => (
              <Link to={`/tags/${kebabCase(tag)}`} key={`art-${slug}-${i}`} title={tag} className="tag">
                {tag}
              </Link>
            ))}
          </TagsHolder>
        </Subline>
      </Post>
    );
  }
}
