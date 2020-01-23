import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';

import config from '../../config/SiteConfig';
import PageProps from '../models/PageProps';
import { MainNavigation } from '../components/MainNavigation';
import styled from 'styled-components';
import { Layout, Header, SectionTitle, Wrapper, Content, Button } from '../components';
import { TwitterIcon, GitHubIcon, LinkedInIcon, ExternalLinkIcon } from '../components/Icons';

interface Contributor {
  fullname?: string;
  nickname: string;
  githubUsername?: string;
  linkedinUsername?: string;
  twitterUsername?: string;
  personalWebsite?: string;
}

export const UserLinks = styled.ul`
  list-style: none;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
`;

export default class ContactPage extends React.Component<PageProps> {
  public render() {
    return (
      <Layout>
        <Helmet title={`Contact | ${config.siteTitle}`} />
        <Header>
          <Link to="/" title="homepage">
            {config.siteTitle}
          </Link>
          <SectionTitle>Contact</SectionTitle>
        </Header>
        <MainNavigation />

        <Wrapper>
          <Content>
            <h1>About me</h1>

            <p>I am a developer!</p>
            <a href="https://www.twitter.com/bellonedavide">
              <Button>
                <TwitterIcon />
                <span>Twitter</span>
              </Button>
            </a>
            <a href="https://www.linkedin.com/in/davide-bellone">
              <Button>
                <LinkedInIcon />
                <span>Linkedin</span>
              </Button>
            </a>

            <h1>About this site</h1>

            <p>Gatsby, Netlify, GitHub</p>

            <h1>All the contributors</h1>
            <p>Here's the list of people who helped me in crafting this website with their knowledge of frontend</p>
            <ul>
              {contributors.map((c, i) => (
                <li key={`contributor-${i}`}>
                  <UserLinks>
                    {c.fullname || c.nickname}

                    {c.twitterUsername && (
                      <li>
                        <a href={`https://twitter.com/${c.twitterUsername}`}>
                          <Button>
                            <TwitterIcon />
                          </Button>
                        </a>
                      </li>
                    )}
                    {c.githubUsername && (
                      <li>
                        <a href={`https://github.com/${c.githubUsername}`}>
                          <Button>
                            <GitHubIcon />
                          </Button>
                        </a>
                      </li>
                    )}
                    {c.linkedinUsername && (
                      <li>
                        <a href={`https://www.linkedin.com/in/${c.linkedinUsername}`}>
                          <Button>
                            <LinkedInIcon />
                          </Button>
                        </a>
                      </li>
                    )}
                    {c.personalWebsite && (
                      <li>
                        <a href={`${c.personalWebsite}`}>
                          <Button>
                            <ExternalLinkIcon />
                          </Button>
                        </a>
                      </li>
                    )}
                  </UserLinks>
                </li>
              ))}
            </ul>
          </Content>
        </Wrapper>
      </Layout>
    );
  }
}

export const contributors: Contributor[] = [
  {
    fullname: 'Davide Bellone',
    nickname: 'bellons',
    githubUsername: 'bellons91',
    linkedinUsername: 'davide-bellone',
    twitterUsername: 'BelloneDavide',
    personalWebsite: 'https://code4it.wordpress.com/',
  },
  {
    nickname: 'fake user',
    githubUsername: 'lupin-the-third',
    linkedinUsername: 'sandokan',
  },
];
