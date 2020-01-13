import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

export const Nav = styled.nav`
  background-color: #000000b3;
  display: flex;
  color: white !important;
  justify-content: space-evenly;
`;

export const NavItem = styled.span`
  a {
    color: white;
  }
`;

export class MainNavigation extends React.PureComponent {
  public render() {
    return (
      <Nav>
        <NavItem>
          <Link to={'/blog'}>All articles </Link>
        </NavItem>
        <NavItem>
          {' '}
          <Link to={'/contact'}>About me</Link>
        </NavItem>
        <NavItem>
          {' '}
          <Link to={'/my-speeches'}>My speeches</Link>{' '}
        </NavItem>
      </Nav>
    );
  }
}
