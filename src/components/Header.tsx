import React from 'react';
import styled from 'styled-components';
import { darken, lighten } from 'polished';
import rgba from 'polished/lib/color/rgba';
import { media } from '../utils/media';
import config from '../../config/SiteConfig';

const HeaderWrapper: any = styled.header`
  // position: relative;
  min-height:15rem;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
    url(${(props: any) => props.banner}) no-repeat;
    h1, p {
      color: white;
    }
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    background-position: center; /* Center the image */
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: cover;
    @media ${media.phone} {
      flex-wrap: wrap;
        }
  }
  @media ${media.tablet} {
    padding: 4rem 2rem 6rem;
  }
  @media ${media.phone} {
    padding: 1rem 0.5rem 2rem;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 999;
  a {
    color: white;
    &:hover {
      opacity: 0.85;
      color: white;
    }
  }
`;

interface Props {
  children: any;
  banner?: string;
}

export class Header extends React.PureComponent<Props> {
  public render() {
    return (
      <HeaderWrapper banner={this.props.banner || config.defaultBg}>
        <Content>{this.props.children}</Content>
      </HeaderWrapper>
    );
  }
}
