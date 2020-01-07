import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import { Layout, Wrapper, Header, SectionTitle, Content, Title } from '../components';

import config from '../../config/SiteConfig';
import PageProps from '../models/PageProps';
import { MainNavigation } from '../components/MainNavigation';

export default class AllCategoryTemplate extends React.PureComponent<PageProps> {
  public render() {
    const { categories } = this.props.pathContext;
    if (categories) {
      return (
        <Layout>
          <Helmet title={`Categories | ${config.siteTitle}`} />
          <Header>
            <Link to="/">{config.siteTitle}</Link>
            <SectionTitle>Categories</SectionTitle>
          </Header>
          <MainNavigation></MainNavigation>
          <Wrapper>
            <Content>
              {categories.map((category, index: number) => (
                <Title key={index}>
                  <Link to={`/categories/${kebabCase(category)}`}>{category}</Link>
                </Title>
              ))}
            </Content>
          </Wrapper>
        </Layout>
      );
    }
  }
}
