import React, { Props } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

export const Nav = styled.nav`
  background-color: #000000b3;
  display: flex;
  color: white !important;
  justify-content: space-evenly;
  margin: 1em 0;
  flex-wrap: wrap;
  align-items: center;
`;

export const NavItem = styled.div`
  flex: 1;
  text-align: center;

  min-width: 6rem;
  a {
    color: white;
  }
`;

export class MainNavigation extends React.PureComponent<Props> {
  public render() {
    return (
      <Nav>
        <NavItem>
          <Link to={'/blog'} title="blog">
            All articles{' '}
          </Link>
        </NavItem>
        <NavItem>
          <Link to={'/tags'} title="All tags">
            All tags{' '}
          </Link>
        </NavItem>
        <NavItem>
          <Link to={'/my-speeches'} title="my speeches">
            My speeches
          </Link>{' '}
        </NavItem>
        <NavItem>
          <Link to={'/contact'} title="about me">
            About me
          </Link>
        </NavItem>
      </Nav>
    );
  }
}
