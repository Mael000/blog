import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';

import config from '../../config/SiteConfig';
import PageProps from '../models/PageProps';
import { MainNavigation } from '../components/MainNavigation';
import styled from 'styled-components';
import { Layout, Header, SectionTitle, Wrapper, Content, Button, SEO } from '../components';
import { TwitterIcon, GitHubIcon, LinkedInIcon, ExternalLinkIcon } from '../components/Icons';
import { media } from '../utils/media';

export const Bio = styled.section`
  display: flex;
  flex-direction: row;

  @media ${media.tablet} {
    flex-direction: column;
  }

  div#description {
    flex: 1;
  }

  div#links {
    flex: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    @media ${media.tablet} {
      flex-direction: row;
    }
  }
`;

export default class ContactPage extends React.Component<PageProps> {
  public render() {
    const img = config.aboutMePageBanner;

    return (
      <Layout>
        <SEO
          pageTitle={`About me | ${config.siteTitle}`}
          pageDescription="Davide Bellone is a software developer based on Turin, Italy. He spent most of his work life working on Microsoft environment, beginning with the first job as a SharePoint developer, moving to MVC 5, Rest API + Angular and finally to a full backend role."
          pageImage={img}
        />

        <Header banner={img}>
          <Link to="/" title="homepage">
            {config.siteTitle}
          </Link>
          <SectionTitle>Contact</SectionTitle>
        </Header>
        <MainNavigation />

        <Wrapper>
          <Content>
            <h2>About me</h2>
            <Bio>
              <div id="description">
                <p>
                  Davide Bellone is a software developer based on Turin, Italy. He spent most of his work life working on Microsoft
                  environment, beginning with the first job as a SharePoint developer, moving to MVC 5, Rest API + Angular and finally to a
                  full backend role.
                </p>

                <p>His passion for sharing knowledge led him to be the host for a conference and to focus on content creation.</p>
              </div>
              <div id="links">
                <a href="https://www.twitter.com/bellonedavide" title="Twitter profile">
                  <Button>
                    <TwitterIcon />
                    <span>Twitter</span>
                  </Button>
                </a>
                <a href="https://www.linkedin.com/in/davide-bellone" title="LinkedIn profile">
                  <Button>
                    <LinkedInIcon />
                    <span>Linkedin</span>
                  </Button>
                </a>
              </div>
            </Bio>
          </Content>
        </Wrapper>
      </Layout>
    );
  }
}
