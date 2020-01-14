import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import { Layout, Wrapper, Header, Button, Content, SectionTitle } from '../components';

import config from '../../config/SiteConfig';
import PageProps from '../models/PageProps';
import { MainNavigation } from '../components/MainNavigation';

 interface Contributor {
  fullname?: string;
  nickname: string;
  githubUsername?: string;
  linkedinUsername?: string;
  personalWebsite?: string;
}


export default class ContactPage extends React.Component<PageProps> {
  public render() {
    return (
      <Layout>
        <Helmet title={`Contact | ${config.siteTitle}`} />
        <Header>
          <Link to="/">{config.siteTitle}</Link>
          <SectionTitle uppercase={true}>Contact</SectionTitle>
        </Header>
        <MainNavigation/>

        <Wrapper>
          <Content>
<h1>About me</h1>

            <p>I am a developer!</p>
            <a href="https://www.twitter.com/bellonedavide">
              <Button >
                <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1764 11q33 24 27 64l-256 1536q-5 29-32 45-14 8-31 8-11 0-24-5l-453-185-242 295q-18 23-49 23-13 0-22-4-19-7-30.5-23.5t-11.5-36.5v-349l864-1059-1069 925-395-162q-37-14-40-55-2-40 32-59l1664-960q15-9 32-9 20 0 36 11z" />
                </svg>
                Twitter
              </Button>
            </a>
            <a href="https://www.linkedin.com/in/davide.bellone">
              <Button >
                <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1764 11q33 24 27 64l-256 1536q-5 29-32 45-14 8-31 8-11 0-24-5l-453-185-242 295q-18 23-49 23-13 0-22-4-19-7-30.5-23.5t-11.5-36.5v-349l864-1059-1069 925-395-162q-37-14-40-55-2-40 32-59l1664-960q15-9 32-9 20 0 36 11z" />
                </svg>
                Linkedin
              </Button>
            </a>

<h1>About this site</h1>

<p>Gatsby, Netlify, GitHub</p>


<h1>All the contributors</h1>
<p>Here's the list of people who helped me in crafting this website with their knowledge of frontend</p>
<ul>
  {contributors.map( (c,i)=>(
<li key={`contributor-${i}`}>
  <ul  >
    {c.fullname || c.nickname}
    {c.githubUsername && (<li>GitHub: https://github.com/{c.githubUsername} </li>)}
    {c.linkedinUsername && (<li>LinkedIn: https://www.linkedin.com/in/{c.linkedinUsername} </li>)}
    {c.personalWebsite && (<li>Personal website: {c.personalWebsite} </li>)}


  </ul>
</li>

  ) )}
</ul>

          </Content>
        </Wrapper>
      </Layout>
    );
  }
}

export const contributors: Contributor[] = [
{
  fullname: "Davide Bellone",
  nickname:"bellons",
  githubUsername: "bellons91",
  linkedinUsername:"davide-bellone",
  personalWebsite:"https://code4it.wordpress.com/"
},
{
  nickname:"fake user",
  githubUsername: "lupin-the-third",
  linkedinUsername:"sandokan",
}
];