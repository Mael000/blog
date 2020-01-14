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
  //border: solid 1px transparent;
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
          <Link to={'/blog'}>All articles </Link>
        </NavItem>
        <NavItem>
          <Link to={'/my-speeches'}>My speeches</Link>{' '}
        </NavItem>
        <NavItem>
          <Link to={'/contact'}>About me and this site</Link>
        </NavItem>
      </Nav>
    );
  }
}
