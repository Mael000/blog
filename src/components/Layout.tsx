import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import theme from '../../config/Theme';
import { media } from '../utils/media';
import split from 'lodash/split';
import './layout.scss';
import { Button } from '.';
import { TwitterIcon, LinkedInIcon } from './Icons';

const GlobalStyle = createGlobalStyle`
  ::selection {
    color: ${theme.colors.white};
    background: ${theme.colors.primary};
  }
  body {
    background: ${theme.colors.bg};
    color: ${theme.colors.grey.default};
    @media ${media.phone} {
      font-size: 14px;
    }
  }
  a {
    color: ${theme.colors.grey.dark};
    text-decoration: none;
    transition: all ${theme.transitions.normal};
  }
  a:hover {
    color: ${theme.colors.primary};
  }
  h1, h2, h3, h4 {
    color: ${theme.colors.grey.dark};
  }
  blockquote {
    font-style: italic;
    position: relative;
  }

  blockquote:before {
    content: "";
    position: absolute;
    background: ${theme.colors.primary};
    height: 100%;
    width: 6px;
    margin-left: -1.6rem;
  }
  label {
    margin-bottom: .5rem;
    color: ${theme.colors.grey.dark};
  }
  input, textarea {
    border-radius: .5rem;
    border: none;
    background: rgba(0, 0, 0, 0.05);
    padding: .25rem 1rem;
    &:focus {
      outline: none;
    }
  }
  .textRight {
    text-align:right;
  }
`;

const Footer = styled.footer`
  text-align: center;
  padding: 1.5rem 0;
  background-color: #000000b3;
  color: white;

  span {
    font-size: 0.75rem;
  }
`;

const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-flow: row;
  flex-wrap: wrap;
  span {
    min-width: 10rem;
  }

  a {
    margin: 0 1rem;
  }

  svg {
    fill: white;
  }
`;

export class Layout extends React.PureComponent<{}> {
  public render() {
    const { children } = this.props;

    return (
      <StaticQuery
        query={graphql`
          query LayoutQuery {
            site {
              buildTime(formatString: "YYYY-MMM-DD")
            }
          }
        `}
        render={data => (
          <ThemeProvider theme={theme}>
            <React.Fragment>
              <GlobalStyle />
              {children}
              <Footer>
                <FooterWrapper>
                  <span>&copy; {split(data.site.buildTime, '-')[0]} by Davide Bellone</span>
                  <span>
                    <a href="https://www.twitter.com/bellonedavide" title="Davide Bellone on Twitter">
                      <TwitterIcon />
                    </a>
                    <a href="https://www.linkedin.com/in/davide-bellone" title="Davide Bellone on LinkedIn">
                      <LinkedInIcon />
                    </a>
                  </span>
                </FooterWrapper>
              </Footer>
            </React.Fragment>
          </ThemeProvider>
        )}
      />
    );
  }
}
