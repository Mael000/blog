import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import { Layout, Wrapper, Header, Button, Content, SectionTitle, SEO } from '../components';

import config from '../../config/SiteConfig';
import PageProps from '../models/PageProps';
import { MainNavigation } from '../components/MainNavigation';
import styled from 'styled-components';

export const SpeechSession = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap-reverse;
`;

export default class MySpeechesPage extends React.Component<PageProps> {
  public render() {
    const img = config.mySpeechPageBanner;
    return (
      <Layout>
        <SEO
          pageTitle={`My speeches | ${config.siteTitle} | ${config.siteDescription}`}
          pageDescription="Davide Bellone is a software developer based on Turin, Italy. He spent most of his work life working on Microsoft environment, beginning with the first job as a SharePoint developer, moving to MVC 5, Rest API + Angular and finally to a full backend role."
          pageImage={img}
        />

        <Header banner={img}>
          <Link to="/" title="homepage">
            {config.siteTitle}
          </Link>
          <SectionTitle>My speeches</SectionTitle>
        </Header>
        <MainNavigation />

        <Wrapper>
          <Content>
            <p>
              I love share knowledge with my peers. That's why I decided to give a try to conferences.
              <br /> Here's what I've done so far.
            </p>

            <hr />
            <SpeechSession>
              <header>
                <b>Topic:</b> Azure DevOps <br />
                <b>Date:</b> Oct 15, 2019 <br />
                <b>Duration:</b> 1 hour <br />
                <b>Level:</b> Beginner <br />
              </header>
              <div>
                <iframe
                  src="https://www.youtube.com/embed/hSCwzEm4M1A"
                  allow=" autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </SpeechSession>
          </Content>
        </Wrapper>
      </Layout>
    );
  }
}
