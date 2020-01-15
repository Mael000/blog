import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import { Layout, Wrapper, Header, Button, Content, SectionTitle } from '../components';

import config from '../../config/SiteConfig';
import PageProps from '../models/PageProps';
import { MainNavigation } from '../components/MainNavigation';

export default class MySpeechesPage extends React.Component<PageProps> {
  public render() {
    return (
      <Layout>
        <Helmet title={`My speeches | ${config.siteTitle}`} />
        <Header>
          <Link to="/">{config.siteTitle}</Link>
          <SectionTitle>My speeches</SectionTitle>
        </Header>
        <MainNavigation />

        <Wrapper>
          <Content>
            <p>Super cool intro text to get people contacting me!</p>
            All my speeches!
          </Content>
        </Wrapper>
      </Layout>
    );
  }
}
