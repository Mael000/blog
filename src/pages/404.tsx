import * as React from 'react';
import { Content, Header, Layout, Wrapper, SectionTitle } from '../components';
import Helmet from 'react-helmet';
import config from '../../config/SiteConfig';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { MainNavigation } from '../components/MainNavigation';

export const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: 100px;
  }
`;

export default class NotFoundPage extends React.Component<any> {
  public render() {
    return (
      <Layout>
        <Helmet title={`404 not found | ${config.siteTitle}`} />
        <Header>
          <Link to="/" title="homepage">
            {config.siteTitle}
          </Link>
          <SectionTitle> PAGE NOT FOUND</SectionTitle>
        </Header>
        <MainNavigation />

        <Wrapper>
          <Content>
            <MessageWrapper>
              <h2>404</h2>
              <p>Oh... The content you are looking for is not here! </p>
              <img src="https://media.giphy.com/media/VfyC5j7sR4cso/source.gif" alt="not found" />
            </MessageWrapper>
          </Content>
        </Wrapper>
      </Layout>
    );
  }
}
